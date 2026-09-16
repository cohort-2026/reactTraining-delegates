-- The script the team ran in the Supabase SQL Editor for TaskBoard.
-- (The local app uses an offline stand-in, so this file is not run by npm.)

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

grant select, insert, update, delete
  on public.tasks to anon;

drop policy if exists "Users manage their own tasks" on public.tasks;
create policy "Users manage their own tasks"
  on public.tasks for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
