import { useState } from 'react';
import {
  IdCard, BarChart3, BookOpen, CalendarOff, MessageCircle,
  Bell, Settings, LogOut, Menu, X, Send, Upload
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const MENU = [
  { id: 'id-card', label: 'ID Card', icon: IdCard },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'leave', label: 'Leave Request', icon: CalendarOff },
  { id: 'queries', label: 'Queries', icon: MessageCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function StudentDashboard() {
  const [tab, setTab] = useState('id-card');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-60 z-30 transform transition-transform duration-300 flex flex-col h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ backgroundColor: 'var(--sidebar-bg)', color: 'var(--sidebar-text)' }}
      >
        <div className="px-5 py-5 flex justify-between items-center border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <h2 className="text-base font-bold">Kerla High School</h2>
            <p className="text-xs opacity-50">Student Portal</p>
          </div>
          <button className="lg:hidden opacity-70" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          {MENU.map(m => (
            <button
              key={m.id}
              onClick={() => { setTab(m.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === m.id ? 'sidebar-item-active' : 'opacity-70 sidebar-item-hover hover:opacity-90'}`}
            >
              <m.icon style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{m.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm opacity-60 hover:opacity-90 sidebar-item-hover">
            <LogOut style={{ width: 18, height: 18 }} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="py-3 px-4 sm:px-6 flex justify-between items-center shrink-0 border-b" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: 'var(--text-secondary)' }}><Menu className="w-6 h-6" /></button>
            <h1 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{MENU.find(m => m.id === tab)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-bold hidden sm:block" style={{ color: 'var(--text-primary)' }}>Alice Smith</span>
              <div className="w-8 h-8 bg-[#2ECC71] rounded-full text-white flex items-center justify-center font-bold text-xs">AS</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar" style={{ backgroundColor: 'var(--bg-base)' }}>
          <div className="animate-fade-in">
            {tab === 'id-card' && <IDCard />}
            {tab === 'performance' && <Performance theme={theme} />}
            {tab === 'homework' && <Homework />}
            {tab === 'leave' && <LeaveRequest />}
            {tab === 'queries' && <Queries />}
            {tab === 'notifications' && <Notifications />}
            {tab === 'settings' && <StudentSettings />}
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- ID Card --- */
function IDCard() {
  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
        <div className="bg-[#0B3C5D] p-6 text-center text-white">
          <h2 className="text-lg font-bold">Kerla High School</h2>
          <p className="text-xs opacity-70">Student Identity Card</p>
        </div>
        <div className="p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#2ECC71] text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">AS</div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Alice Smith</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Grade 10 — Section A</p>
          <div className="w-full mt-6 space-y-3">
            {[
              ['Admission No.', 'KHS-2024-0101'],
              ['Roll No.', '101'],
              ['Father', 'Robert Smith'],
              ['Mother', 'Jane Smith'],
              ['Phone', '+91-98765-43210'],
              ['Blood Group', 'O+'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Performance --- */
function Performance({ theme }: { theme: string }) {
  const marksData = [
    { subject: 'Math', marks: 92 }, { subject: 'Science', marks: 88 },
    { subject: 'English', marks: 95 }, { subject: 'History', marks: 85 }, { subject: 'Hindi', marks: 78 },
  ];
  const attendanceData = [{ name: 'Present', value: 92 }, { name: 'Absent', value: 5 }, { name: 'Late', value: 3 }];
  const COLORS = ['#2ECC71', '#ef4444', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Avg Marks', val: '87.6%', color: '#0B3C5D' },
          { label: 'Attendance', val: '92%', color: '#2ECC71' },
          { label: 'Rank', val: '#2', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Subject-wise Marks</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 10, color: 'var(--text-primary)' }} />
                <Bar dataKey="marks" fill="#0B3C5D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Attendance Breakdown</h3>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={attendanceData} innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value">
                {attendanceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            {attendanceData.map((e, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span style={{ color: 'var(--text-secondary)' }}>{e.name} ({e.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Homework --- */
function Homework() {
  const items = [
    { subject: 'Mathematics', title: 'Quadratic Equations Practice', due: 'May 20, 2026', done: false },
    { subject: 'Science', title: 'Lab Report: Photosynthesis', due: 'May 22, 2026', done: true },
    { subject: 'English', title: 'Essay: My Favorite Book', due: 'May 25, 2026', done: false },
  ];
  return (
    <div className="space-y-4 max-w-2xl">
      {items.map((h, i) => (
        <div key={i} className="rounded-xl border p-5 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div>
            <span className="text-xs font-bold badge-blue px-2 py-0.5 rounded">{h.subject}</span>
            <h3 className="font-bold mt-2" style={{ color: 'var(--text-primary)' }}>{h.title}</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Due: {h.due}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${h.done ? 'badge-green' : 'badge-yellow'}`}>
            {h.done ? '✓ Done' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}

/* --- Leave Request --- */
function LeaveRequest() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="max-w-lg">
      <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Submit Leave Request</h2>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Leave Request Submitted</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Your principal will review and approve.</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-bold text-[#0B3C5D] hover:underline">Submit Another</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Reason</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm input-themed">
                <option>Medical Leave</option><option>Family Emergency</option><option>Personal</option><option>Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>From</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>To</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Upload Leave Letter (Image)</label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover-bg transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Click or drag image here</p>
              </div>
            </div>
            <button onClick={() => setSubmitted(true)} className="w-full bg-[#0B3C5D] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#072a42]">Submit Request</button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Previous Requests</h3>
        {[
          { reason: 'Medical', date: 'May 10–12', status: 'approved' },
          { reason: 'Family', date: 'Apr 20', status: 'rejected' },
        ].map((r, i) => (
          <div key={i} className="rounded-lg border p-3 mb-2 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.reason}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.date}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${r.status === 'approved' ? 'badge-green' : 'badge-red'}`}>
              {r.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Queries --- */
function Queries() {
  return (
    <div className="max-w-lg space-y-4">
      <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Submit a Query</h2>
        <div className="space-y-3">
          <select className="w-full border rounded-lg px-3 py-2 text-sm input-themed">
            <option>To: Class Teacher</option><option>To: Principal</option>
          </select>
          <textarea rows={3} placeholder="Type your query..." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#072a42]">
            <Send className="w-4 h-4" /> Submit Query
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Previous Queries</h3>
        <div className="rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between mb-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Science fair schedule query</p>
            <span className="badge-green text-xs font-bold px-2 py-0.5 rounded">Resolved</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sent to: Mr. Anderson — May 12, 2026</p>
        </div>
      </div>
    </div>
  );
}

/* --- Notifications --- */
function Notifications() {
  const items = [
    { icon: '📝', text: 'New homework posted: Math Quadratic Equations', time: '2 hours ago' },
    { icon: '✅', text: 'Your leave request (May 10–12) was approved', time: '1 day ago' },
    { icon: '📢', text: 'School holiday on May 30 — Republic Day', time: '3 days ago' },
    { icon: '💬', text: 'Mr. Anderson replied to your query', time: '5 days ago' },
  ];
  return (
    <div className="max-w-lg space-y-2">
      {items.map((n, i) => (
        <div key={i} className="rounded-lg border p-4 flex items-start gap-3 hover-bg transition-colors" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <span className="text-lg shrink-0 mt-0.5">{n.icon}</span>
          <div>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{n.text}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- Settings --- */
function StudentSettings() {
  return (
    <div className="max-w-lg rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
      <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>My Settings</h2>
      <div className="space-y-4">
        {[
          { label: 'Email', val: 'alice@student.kerla.edu', type: 'email' },
          { label: 'Phone', val: '+91-98765-43210', type: 'tel' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
            <input type={f.type} defaultValue={f.val} className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Change Password</label>
          <input type="password" placeholder="New password (requires principal approval)" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Password changes require principal approval</p>
        </div>
        <button className="bg-[#0B3C5D] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">Save Changes</button>
      </div>
    </div>
  );
}
