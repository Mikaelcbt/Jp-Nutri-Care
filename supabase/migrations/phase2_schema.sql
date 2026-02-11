-- Phase 2: Patient Experience Schema Updates

-- 1. Create water_logs for granular tracking
create table if not exists public.water_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount_ml int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for water_logs
alter table public.water_logs enable row level security;
create policy "Users manage own water logs" on public.water_logs
  for all using (auth.uid() = user_id or public.is_admin());

-- 2. Update meal_logs for explicit completion tracking
-- We keep 'status' but add 'completed' for redundancy as requested, or just rely on status.
-- User asked for 'completed' boolean and 'completed_at'.
alter table public.meal_logs 
add column if not exists completed boolean default false,
add column if not exists completed_at timestamp with time zone;

-- Index for performance
create index if not exists idx_water_logs_user_date on public.water_logs(user_id, created_at);
