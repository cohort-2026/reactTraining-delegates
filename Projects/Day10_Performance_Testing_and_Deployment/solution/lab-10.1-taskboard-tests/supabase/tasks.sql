-- Run this in the Supabase SQL Editor for your project.
-- Safe to run more than once: `if not exists` and `drop policy if exists`
-- stop it failing on a second run.

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users on delete cascade,
  title text not null check (char_length(title) >= 3),
  status text not null default 'todo'
    check (status in ('todo', 'doing', 'done')),
  points int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

-- New tables are not reachable through the Data API without this: grants
-- decide whether a role can use the table at all, RLS decides which rows.
grant select, insert, update, delete
  on public.tasks to authenticated;

drop policy if exists "Users manage their own tasks" on public.tasks;
create policy "Users manage their own tasks"
  on public.tasks for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Verify: run this separately. Each row should say APPLIED.
select
  case when exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'tasks'
  ) then 'APPLIED' else 'NOT APPLIED' end as "tasks table",
  case when (
    select relrowsecurity from pg_class
    where oid = 'public.tasks'::regclass
  ) then 'APPLIED' else 'NOT APPLIED' end as "row level security",
  case when exists (
    select 1 from information_schema.role_table_grants
    where table_schema = 'public' and table_name = 'tasks'
      and grantee = 'authenticated' and privilege_type = 'SELECT'
  ) then 'APPLIED' else 'NOT APPLIED' end as "grants to authenticated",
  case when exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'tasks'
      and policyname = 'Users manage their own tasks'
  ) then 'APPLIED' else 'NOT APPLIED' end as "row policy";
