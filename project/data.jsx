// Mock data for Employee Attendance & Performance system
// 30-100 person company, friendly tone, realistic Azerbaijani names

const TEAMS = [
  { id: 'eng',     name: 'Mühəndislik',  accent: 'dusk',  lead: 'Aysu Məmmədova' },
  { id: 'design',  name: 'Dizayn',       accent: 'plum',  lead: 'Rəşad Quliyev' },
  { id: 'product', name: 'Məhsul',       accent: 'coral', lead: 'Leyla Hüseynova' },
  { id: 'ops',     name: 'Əməliyyat',    accent: 'sage',  lead: 'Toğrul Əliyev' },
  { id: 'sales',   name: 'Satış',        accent: 'amber', lead: 'Səbinə Quliyeva' },
];

// Office locations with geofence
const LOCATIONS = [
  { id: 'hq',     name: 'Mərkəzi ofis',   address: '28 May küç. 14, Bakı',          radius: 80 },
  { id: 'bayil',  name: 'Bayıl filialı',  address: 'Neftçilər pr. 22, Bakı',         radius: 60 },
];

// Employees — 18 sample, mix of teams, statuses, streaks
const EMPLOYEES = [
  // Engineering
  { id: 'e01', name: 'Aysu Məmmədova',   role: 'Eng Lead',          team: 'eng',     status: 'office',  arrived: '09:02', streak: 47, hoursWeek: 38.5, focusToday: 180, isLead: true },
  { id: 'e02', name: 'Cavid Hüseynov',   role: 'Senior Backend',    team: 'eng',     status: 'remote',  arrived: '08:48', streak: 23, hoursWeek: 36,   focusToday: 220 },
  { id: 'e03', name: 'Nigar Quliyeva',   role: 'Frontend',          team: 'eng',     status: 'office',  arrived: '09:14', streak: 8,  hoursWeek: 32,   focusToday: 140 },
  { id: 'e04', name: 'Tural Əhmədli',    role: 'iOS Developer',     team: 'eng',     status: 'meeting', arrived: '08:55', streak: 61, hoursWeek: 40,   focusToday: 95 },
  { id: 'e05', name: 'Səma Bayramova',   role: 'QA Engineer',       team: 'eng',     status: 'sick',    arrived: null,    streak: 0,  hoursWeek: 14,   focusToday: 0 },

  // Design
  { id: 'd01', name: 'Rəşad Quliyev',    role: 'Design Lead',       team: 'design',  status: 'office',  arrived: '09:30', streak: 12, hoursWeek: 35,   focusToday: 110, isLead: true },
  { id: 'd02', name: 'Mələk Tağıyeva',   role: 'Product Designer',  team: 'design',  status: 'remote',  arrived: '09:05', streak: 19, hoursWeek: 38,   focusToday: 200 },
  { id: 'd03', name: 'Kamran İsmayılov', role: 'UI Designer',       team: 'design',  status: 'office',  arrived: '09:45', streak: 4,  hoursWeek: 30,   focusToday: 75 },

  // Product
  { id: 'p01', name: 'Leyla Hüseynova',  role: 'Head of Product',   team: 'product', status: 'meeting', arrived: '08:40', streak: 32, hoursWeek: 42,   focusToday: 60, isLead: true },
  { id: 'p02', name: 'Elnur Babayev',    role: 'Product Manager',   team: 'product', status: 'office',  arrived: '09:08', streak: 15, hoursWeek: 37,   focusToday: 130 },

  // Ops
  { id: 'o01', name: 'Toğrul Əliyev',    role: 'Head of Ops',       team: 'ops',     status: 'office',  arrived: '08:30', streak: 89, hoursWeek: 41,   focusToday: 165, isLead: true },
  { id: 'o02', name: 'Aydan Rəsulova',   role: 'HR Specialist',     team: 'ops',     status: 'office',  arrived: '08:55', streak: 41, hoursWeek: 40,   focusToday: 145 },
  { id: 'o03', name: 'Fərid Cəbiyev',    role: 'Office Manager',    team: 'ops',     status: 'field',   arrived: '09:00', streak: 22, hoursWeek: 38,   focusToday: 80 },

  // Sales
  { id: 's01', name: 'Səbinə Quliyeva',  role: 'Sales Lead',        team: 'sales',   status: 'field',   arrived: '08:45', streak: 28, hoursWeek: 42,   focusToday: 90, isLead: true },
  { id: 's02', name: 'Ramil Əzizov',     role: 'Account Executive', team: 'sales',   status: 'remote',  arrived: '09:20', streak: 7,  hoursWeek: 35,   focusToday: 175 },
  { id: 's03', name: 'Günay Vəliyeva',   role: 'Account Manager',   team: 'sales',   status: 'off',     arrived: null,    streak: 14, hoursWeek: 0,    focusToday: 0 },
  { id: 's04', name: 'Vüsal Səfərov',    role: 'BDR',               team: 'sales',   status: 'break',   arrived: '09:12', streak: 11, hoursWeek: 36,   focusToday: 105 },
  { id: 's05', name: 'İlahə Mirzəyeva',  role: 'Account Executive', team: 'sales',   status: 'notyet',  arrived: null,    streak: 0,  hoursWeek: 32,   focusToday: 0 },
];

// Active requests in the system
const REQUESTS = [
  { id: 'r01', from: 'd02', type: 'remote',  date: '2026-04-27', range: 'Sabah',         reason: 'Konsentrasiya tələb edən dizayn işi', status: 'pending', sent: '14:22', via: 'system' },
  { id: 'r02', from: 'e02', type: 'remote',  date: '2026-04-28', range: '2 gün',         reason: 'Uşağım xəstədir, evdən baxa bilərəm',  status: 'pending', sent: '11:05', via: 'system' },
  { id: 'r03', from: 's02', type: 'leave',   date: '2026-05-04', range: '1 həftə',       reason: 'Planlaşdırılmış məzuniyyət',           status: 'approved', sent: 'Dünən', via: 'system' },
  { id: 'r04', from: 'p02', type: 'short',   date: '2026-04-26', range: '14:00 — 16:00', reason: 'Həkim',                                status: 'approved', sent: 'Bu səhər', via: 'system' },
  { id: 'r05', from: 'e05', type: 'sick',    date: '2026-04-26', range: 'Bu gün',        reason: 'Soyuqdəyməyəm',                        status: 'approved', sent: '07:48', via: 'system' },
  { id: 'r06', from: 'e03', type: 'remote',  date: '2026-04-29', range: 'Cümə',          reason: 'Bayıl ofisində toplaşma var, evdən qoşulacam', status: 'pending', sent: 'İndi', via: 'system' },
];

// Past streaks / weekly highlights for "Weekly Wrap"
const WRAP = {
  earliestArrival: { day: 'Salı', time: '08:14' },
  longestFocus:    { day: 'Çərşənbə axşamı', minutes: 245 },
  daysOnTime:      4,
  daysWorked:      5,
  totalHours:      38.5,
  vsLastWeek:      +1.5,
  topMood:         'odaqlı', // focused
  teammatesShout:  ['Cavid', 'Mələk'], // who said thanks to me this week
};

// Badges — milestones, not punitive
const BADGES = [
  { id: 'b01', name: '7 gün ritm',       desc: 'Bir həftə ardıcıl vaxtında',     unlocked: true,  icon: '◇' },
  { id: 'b02', name: '30 gün davam',     desc: 'Bir ay ardıcıl ritm',            unlocked: true,  icon: '◆' },
  { id: 'b03', name: 'Erkən quş',        desc: '5 gün 09:00-dan əvvəl',          unlocked: true,  icon: '☀' },
  { id: 'b04', name: 'Dərin iş',         desc: '4 saat fasiləsiz fokus',         unlocked: true,  icon: '◉' },
  { id: 'b05', name: 'Komanda dayağı',   desc: 'Komandadan 5+ təşəkkür',         unlocked: false, icon: '♡' },
  { id: 'b06', name: '60 gün mayak',     desc: 'İki ay ardıcıl ritm',            unlocked: false, icon: '✦' },
];

// Activity / audit log entries
const AUDIT = [
  { time: '14:22', actor: 'Mələk T.',   action: 'Uzaqdan iş sorğusu göndərdi',         target: 'sabah · Rəşad Q.-yə',   tone: 'info' },
  { time: '13:45', actor: 'Sistem',     action: 'Wi-Fi ilə avtomatik check-in',        target: 'Cavid H. · Mərkəzi ofis', tone: 'muted' },
  { time: '11:05', actor: 'Cavid H.',   action: 'Uzaqdan iş sorğusu (2 gün)',          target: 'Aysu M.-ə',              tone: 'info' },
  { time: '09:48', actor: 'Aysu M.',    action: 'Sorğunu təsdiqlədi',                  target: 'Cavid H. · uzaqdan',     tone: 'success' },
  { time: '09:00', actor: 'Sistem',     action: 'Gün başladı — 14 nəfər ofisdə',       target: '4 uzaqdan, 1 məzuniyyət', tone: 'muted' },
  { time: '08:48', actor: 'Cavid H.',   action: 'Uzaqdan check-in',                    target: 'GPS · ev',               tone: 'success' },
  { time: '08:30', actor: 'Toğrul Ə.',  action: 'Ofisdə check-in',                     target: 'Wi-Fi · Mərkəzi',        tone: 'success' },
  { time: '07:48', actor: 'Səma B.',    action: 'Xəstəlik bildirdi',                   target: 'Bu gün',                 tone: 'warn' },
];

// Aggregated KPIs for HR dashboard
const COMPANY_KPIS = {
  total:       54,
  inOffice:    23,
  remote:      14,
  field:       3,
  meeting:     5,
  off:         4,
  sick:        2,
  notyet:      3,
  pendingReqs: 6,
  thisWeekHours: 1986, // total team-hours
  onTimeRate:    0.91,
};

window.TEAMS = TEAMS;
window.LOCATIONS = LOCATIONS;
window.EMPLOYEES = EMPLOYEES;
window.REQUESTS = REQUESTS;
window.WRAP = WRAP;
window.BADGES = BADGES;
window.AUDIT = AUDIT;
window.COMPANY_KPIS = COMPANY_KPIS;
window.byId = (id) => EMPLOYEES.find(e => e.id === id);
window.teamById = (id) => TEAMS.find(t => t.id === id);
