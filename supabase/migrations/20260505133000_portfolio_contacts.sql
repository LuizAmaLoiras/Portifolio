create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

grant usage on schema public to anon, authenticated;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;

drop function if exists public.is_admin(uuid);
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.portfolio_contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (
    char_length(email) <= 180
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  phone text not null check (
    char_length(phone) <= 32
    and regexp_replace(phone, '\D', '', 'g') ~ '^\d{10,15}$'
  ),
  project_interest text check (project_interest is null or char_length(project_interest) <= 160),
  message text not null check (char_length(message) between 5 and 1500),
  status text not null default 'Novo' check (status in ('Novo', 'Em analise', 'Respondido')),
  created_at timestamptz not null default now()
);

alter table public.portfolio_contacts enable row level security;

revoke all on public.portfolio_contacts from anon, authenticated;
grant insert (
  full_name,
  email,
  phone,
  project_interest,
  message
) on public.portfolio_contacts to anon, authenticated;
grant select, delete on public.portfolio_contacts to authenticated;
grant update (status) on public.portfolio_contacts to authenticated;

create index if not exists portfolio_contacts_created_at_idx on public.portfolio_contacts (created_at desc);
create index if not exists portfolio_contacts_status_idx on public.portfolio_contacts (status);
create index if not exists portfolio_contacts_email_recent_idx on public.portfolio_contacts (lower(email), created_at desc);

drop policy if exists "Visitors can create portfolio contacts" on public.portfolio_contacts;
create policy "Visitors can create portfolio contacts"
on public.portfolio_contacts
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read portfolio contacts" on public.portfolio_contacts;
create policy "Admins can read portfolio contacts"
on public.portfolio_contacts
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update portfolio contacts" on public.portfolio_contacts;
create policy "Admins can update portfolio contacts"
on public.portfolio_contacts
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete portfolio contacts" on public.portfolio_contacts;
create policy "Admins can delete portfolio contacts"
on public.portfolio_contacts
for delete
to authenticated
using (public.is_admin());

-- Depois de criar seu usuario em Authentication > Users, rode trocando o email:
-- insert into public.profiles (id, role)
-- select id, 'admin'
-- from auth.users
-- where email = 'seu-email-admin@email.com'
-- on conflict (id) do update set role = 'admin';
