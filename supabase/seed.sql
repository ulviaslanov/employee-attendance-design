-- Seed data for local dev. Single tenant: Code Academy.
-- 1 HR, 5 managers, 30 employees across 5 teams.

insert into companies (id, name) values
  ('11111111-1111-1111-1111-111111111111', 'Code Academy');

insert into policies (company_id) values ('11111111-1111-1111-1111-111111111111');

insert into locations (id, company_id, name, wifi_ssid, geo_point, radius_m) values
  ('22222222-2222-2222-2222-222222222222',
   '11111111-1111-1111-1111-111111111111',
   'HQ Bakı',
   'Code-Academy-HQ',
   point(49.8671, 40.4093),
   80);

insert into teams (id, company_id, name, accent) values
  ('aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Engineering', 'coral'),
  ('aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Product',     'sage'),
  ('aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Design',      'plum'),
  ('aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Operations',  'amber'),
  ('aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'People & HR', 'dusk');

-- 1 HR
insert into employees (id, company_id, full_name, email, role, team_id) values
  ('eeeeeeee-0001-0001-0001-eeeeeeeeeeee',
   '11111111-1111-1111-1111-111111111111',
   'Səbinə Hüseynova', 'sabina@code.az', 'hr',
   'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa');

-- 5 managers, one per team
insert into employees (id, company_id, full_name, email, role, team_id) values
  ('eeeeeeee-1001-0001-0001-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Lalə Quliyeva',   'lale@code.az',   'manager', 'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa'),
  ('eeeeeeee-1002-0001-0001-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Tural Əliyev',    'tural@code.az',  'manager', 'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa'),
  ('eeeeeeee-1003-0001-0001-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Aytac Məmmədova', 'aytac@code.az',  'manager', 'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa'),
  ('eeeeeeee-1004-0001-0001-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Rəşad Hüseynli',  'rashad@code.az', 'manager', 'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa'),
  ('eeeeeeee-1005-0001-0001-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Nigar Babayeva',  'nigar@code.az',  'manager', 'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa');

update teams set lead_employee_id = 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee' where id = 'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa';
update teams set lead_employee_id = 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee' where id = 'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa';
update teams set lead_employee_id = 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee' where id = 'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa';
update teams set lead_employee_id = 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee' where id = 'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa';
update teams set lead_employee_id = 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee' where id = 'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa';

-- 30 employees, ~6 per team
insert into employees (company_id, full_name, email, role, team_id, manager_id)
select
  '11111111-1111-1111-1111-111111111111',
  fn,
  lower(replace(fn, ' ', '.')) || '@code.az',
  'employee',
  team_id,
  manager_id
from (values
  ('Aysel Quliyeva',   'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa'::uuid, 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'::uuid),
  ('Cavid Hüseynov',   'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'),
  ('Murad Əliyev',     'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'),
  ('Pərviz Babayev',   'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'),
  ('Səma Məmmədova',   'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'),
  ('Toğrul İsmayılov', 'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', 'eeeeeeee-1001-0001-0001-eeeeeeeeeeee'),

  ('Elvin Əhmədov',    'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),
  ('Günel Rzayeva',    'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),
  ('Hüseyn Sadıqov',   'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),
  ('İlhamə Quliyeva',  'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),
  ('Kənan Vəliyev',    'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),
  ('Leyla Hüseynova',  'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa', 'eeeeeeee-1002-0001-0001-eeeeeeeeeeee'),

  ('Mehri Əliyeva',    'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),
  ('Nazlı Quliyeva',   'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),
  ('Orxan Babayev',    'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),
  ('Pərvanə Səfərova', 'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),
  ('Qalib Rüstəmov',   'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),
  ('Rüfət Quliyev',    'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa', 'eeeeeeee-1003-0001-0001-eeeeeeeeeeee'),

  ('Səbuhi Əliyev',    'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),
  ('Tərlan Hüseynov',  'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),
  ('Ülviyyə Babayeva', 'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),
  ('Vüqar Məmmədov',   'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),
  ('Xəyalə Quliyeva',  'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),
  ('Yusif Rzayev',     'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa', 'eeeeeeee-1004-0001-0001-eeeeeeeeeeee'),

  ('Zərifə Əliyeva',   'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee'),
  ('Aslan Hüseynov',   'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee'),
  ('Bəyim Quliyeva',   'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee'),
  ('Cəmilə Məmmədova', 'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee'),
  ('Dilarə Səfərova',  'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee'),
  ('Elnur Babayev',    'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa', 'eeeeeeee-1005-0001-0001-eeeeeeeeeeee')
) as t(fn, team_id, manager_id);

-- rewards catalog
insert into rewards_catalog (company_id, key, label, value_azn) values
  ('11111111-1111-1111-1111-111111111111', 'coffee_voucher_15', 'Kofe Vauçeri', 15),
  ('11111111-1111-1111-1111-111111111111', 'book_choice_40',    'Kitab Seçimi', 40),
  ('11111111-1111-1111-1111-111111111111', 'lunch_voucher_25',  'Naharlıq',     25),
  ('11111111-1111-1111-1111-111111111111', 'online_course_200', 'Online Kurs',  200),
  ('11111111-1111-1111-1111-111111111111', 'extra_vacation_1d', 'Əlavə 1 gün məzuniyyət', 0);
