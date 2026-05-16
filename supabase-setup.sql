-- Tabel profiles (data member)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text,
  initials text,
  level text default 'Pemula',
  weight numeric,
  target_weight numeric,
  height integer,
  age integer,
  daily_cal integer,
  daily_protein integer,
  daily_fat integer,
  streak integer default 0,
  weight_history jsonb default '[]',
  saved_recipes jsonb default '[]',
  created_at timestamp with time zone default now()
);

-- Tabel food_log (catatan makanan harian)
create table food_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  date date not null,
  name text not null,
  amount numeric,
  unit text,
  meal_type text,
  cal integer,
  protein numeric,
  fat numeric,
  carb numeric default 0,
  created_at timestamp with time zone default now()
);

-- Aktifkan Row Level Security (RLS)
alter table profiles enable row level security;
alter table food_log enable row level security;

-- Policy: user hanya bisa akses data sendiri
create policy "User can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "User can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "User can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "User can view own food log"
  on food_log for select using (auth.uid() = user_id);

create policy "User can insert own food log"
  on food_log for insert with check (auth.uid() = user_id);

create policy "User can delete own food log"
  on food_log for delete using (auth.uid() = user_id);
