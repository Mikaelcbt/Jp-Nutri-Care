# JP NutriCare

Plataforma de membros para pacientes de nutrição. Estilo clube, premium, focado em retenção.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Database + Auth**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## 🚀 Como Rodar Localmente

1. **Clone o repositório** (ou use a pasta atual).

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração Supabase**:
   - Crie um projeto no [Supabase](https://supabase.com).
   - Vá em `SQL Editor` e cole o conteúdo de `supabase/schema.sql` para criar as tabelas e políticas.
   - Copie a `Project URL` e `anon public key` das configurações de API.

4. **Variáveis de Ambiente**:
   Crie um arquivo `.env.local` na raiz:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=Sua_URL_Supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=Sua_Anon_Key
   ```

5. **Rode o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

6. **Acesse**: `http://localhost:3000`

---

## 🎨 Design System (Vitality Club)

- **Cores principais**:
  - `bg-background`: Deep Petrol (#0f172a)
  - `text-primary`: Vitality Green (#10b981)
  - `text-accent`: Coral Energy (#f43f5e)
- **Componentes**: Glassmorphism (`.glass`), Gradientes suaves.
- **Fontes**: Inter (System default).

## 🔒 Regras de Negócio (MVP)

- Usuários podem se registrar e logar.
- O cadastro cria automaticamente um `profile`.
- Apenas usuários logados acessam `/app`.
- Dados são protegidos por RLS (Row Level Security): cada um vê apenas o seu.
