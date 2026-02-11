-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  role text default 'patient' check (role in ('patient', 'admin')),
  status text default 'active' check (status in ('active', 'banned')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;

-- Admin Helper: Check if user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    select (role = 'admin')
    from public.profiles
    where id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Policies for Profiles
create policy "Everyone can view profiles." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);
create policy "Admins can update all profiles." on public.profiles for update using (public.is_admin());

-- Audit Logs
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references public.profiles(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.audit_logs enable row level security;
create policy "Only admins view audit logs." on public.audit_logs for select using (public.is_admin());

-- Diet Templates (Reusable plans)
create table public.diet_templates (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  duration_days int default 14,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.diet_templates enable row level security;
create policy "Everyone view templates." on public.diet_templates for select using (true);
create policy "Admins manage templates." on public.diet_templates for all using (public.is_admin());

-- Diet Template Days & Meals (Nested structure)
create table public.diet_template_days (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references public.diet_templates(id) on delete cascade not null,
  day_number int not null,
  meals_json jsonb -- Storing meals as JSON in template for simplicity
);

-- User Diets (Instances of plans)
create table public.diet_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  template_id uuid references public.diet_templates(id),
  title text not null,
  start_date date not null,
  days int default 14,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.diet_plans enable row level security;
create policy "Users view own plans." on public.diet_plans for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins can manage user plans." on public.diet_plans for all using (public.is_admin());

-- Diet Days
create table public.diet_days (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.diet_plans(id) on delete cascade not null,
  day_number int not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.diet_days enable row level security;
create policy "Users view own days." on public.diet_days for select using (exists (select 1 from public.diet_plans where id = diet_days.plan_id and user_id = auth.uid()) or public.is_admin());

-- Meals
create table public.meals (
  id uuid default uuid_generate_v4() primary key,
  diet_day_id uuid references public.diet_days(id) on delete cascade not null,
  name text not null,
  time text,
  description text,
  target_calories int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.meals enable row level security;
create policy "Users view own meals." on public.meals for select using (exists (select 1 from public.diet_days join public.diet_plans on diet_plans.id = diet_days.plan_id where diet_days.id = meals.diet_day_id and (diet_plans.user_id = auth.uid() or public.is_admin())));

-- Logs & Progress
create table public.daily_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  log_date date not null,
  water_ml int default 0,
  workout_done boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, log_date)
);
alter table public.daily_logs enable row level security;
create policy "Users manage own logs." on public.daily_logs for all using (auth.uid() = user_id or public.is_admin());

create table public.meal_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  meal_id uuid references public.meals(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'done', 'skipped')),
  photo_url text,
  calories_estimate int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, meal_id)
);
alter table public.meal_logs enable row level security;
create policy "Users manage own meal logs." on public.meal_logs for all using (auth.uid() = user_id or public.is_admin());

-- Community
create table public.community_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  media_url text,
  pinned boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.community_posts enable row level security;
create policy "Community viewable." on public.community_posts for select using (true);
create policy "Users manage own posts." on public.community_posts for all using (auth.uid() = user_id or public.is_admin());

-- Notifications
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  target_type text default 'all' check (target_type in ('all', 'patient', 'individual')),
  target_id uuid, -- specific user id if individual
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.notifications enable row level security;

create table public.user_notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  notification_id uuid references public.notifications(id) on delete cascade not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_notifications enable row level security;
create policy "Users view own notifications." on public.user_notifications for select using (auth.uid() = user_id or public.is_admin());

-- Helper: Set User Role (Admin Only)
create or replace function public.set_user_role(target_user_id uuid, new_role text)
returns void as $$
begin
  -- Only allow if current user is admin OR if this is the first admin (bootstrap)
  if public.is_admin() or not exists (select 1 from public.profiles where role = 'admin') then
    update public.profiles set role = new_role where id = target_user_id;
  else
    raise exception 'Unauthorized: Only admins can change roles.';
  end if;
end;
$$ language plpgsql security definer;

-- Trigger: Handle New User (Auto Profile)
create or replace function public.handle_new_user()
returns trigger as $$
declare
    new_plan_id uuid;
    new_day_id uuid;
    i int;
begin
    insert into public.profiles (id, full_name, avatar_url, role)
    values (
      new.id, 
      new.raw_user_meta_data->>'full_name', 
      new.raw_user_meta_data->>'avatar_url',
      case 
        when new.email = 'seu-email-adm@exemplo.com' then 'admin' 
        else 'patient' 
      end
    );

    -- Default 14-day plan for patients
    if (new.email != 'seu-email-adm@exemplo.com') then
        insert into public.diet_plans (user_id, title, start_date, days)
        values (new.id, 'Plano de Boas-vindas', current_date, 14)
        returning id into new_plan_id;

        for i in 1..14 loop
            insert into public.diet_days (plan_id, day_number)
            values (new_plan_id, i)
            returning id into new_day_id;

            insert into public.meals (diet_day_id, name, time, description, target_calories) values
            (new_day_id, 'Café da Manhã', '08:00', '2 Ovos + 1 Fruta', 300),
            (new_day_id, 'Almoço', '13:00', 'Proteína + Arroz + Salada', 500),
            (new_day_id, 'Jantar', '20:00', 'Proteína + Salada', 400);
        end loop;
    end if;

    return new;
end;
$$ language plpgsql security definer;

-- Re-attach trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
