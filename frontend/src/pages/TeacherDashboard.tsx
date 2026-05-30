import { useState } from 'react';
import {
  Users, CheckSquare, FileText, Bell, BookOpen, MessageCircle,
  UserPlus, Settings, LogOut, Menu, X, Star, Send
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

const MENU = [
  { id: 'roster', label: 'Class Roster', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: CheckSquare },
  { id: 'grades', label: 'Enter Grades', icon: FileText },
  { id: 'behavior', label: 'Behavior', icon: Star },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'messaging', label: 'Messaging', icon: MessageCircle },
  { id: 'admission', label: 'Add Student', icon: UserPlus },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function TeacherDashboard() {
  const [tab, setTab] = useState('roster');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const students = [
    { id: 1, name: 'Alice Smith', roll: '101', attendance: 98, avg: 92, status: 'present' },
    { id: 2, name: 'Bob Johnson', roll: '102', attendance: 90, avg: 85, status: 'present' },
    { id: 3, name: 'Charlie Brown', roll: '103', attendance: 85, avg: 72, status: 'absent' },
    { id: 4, name: 'Diana Prince', roll: '104', attendance: 95, avg: 97, status: 'present' },
    { id: 5, name: 'Evan Wright', roll: '105', attendance: 70, avg: 55, status: 'late' },
  ];

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
            <p className="text-xs opacity-50">Teacher Portal</p>
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
              <m.icon style={{ width: 18, height: 18, flexShrink: 0 }} /><span>{m.label}</span>
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
            <div>
              <h1 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Grade 10 – Mathematics</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Mr. Anderson</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-secondary)' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#2ECC71] rounded-full" />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-xs">A</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar" style={{ backgroundColor: 'var(--bg-base)' }}>
          <div className="animate-fade-in">
            {tab === 'roster' && <Roster students={students} />}
            {tab === 'attendance' && <Attendance students={students} />}
            {tab === 'grades' && <Grades students={students} />}
            {tab === 'behavior' && <Behavior students={students} />}
            {tab === 'homework' && <HomeworkPost />}
            {tab === 'messaging' && <Messaging />}
            {tab === 'admission' && <AddAdmission />}
            {tab === 'settings' && <TeacherSettings />}
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Roster --- */
function Roster({ students }: { students: any[] }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Students', val: students.length, color: '#3b82f6' },
          { label: 'Class Avg', val: `${Math.round(students.reduce((a, s) => a + s.avg, 0) / students.length)}%`, color: '#0B3C5D' },
          { label: 'Attendance Avg', val: `${Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length)}%`, color: '#2ECC71' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
              {['Roll', 'Name', 'Attendance', 'Avg Marks'].map(h => (
                <th key={h} className="px-5 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t hover-bg cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-5 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.roll}</td>
                <td className="px-5 py-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{s.name[0]}</div>
                  <span style={{ color: 'var(--text-primary)' }}>{s.name}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.attendance >= 90 ? 'badge-green' : s.attendance >= 75 ? 'badge-yellow' : 'badge-red'}`}>{s.attendance}%</span>
                </td>
                <td className="px-5 py-3 font-bold" style={{ color: 'var(--text-primary)' }}>{s.avg}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- Attendance --- */
function Attendance({ students }: { students: any[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Today's Attendance — {new Date().toLocaleDateString()}</h2>
        <button className="bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#27ae60]">Save Attendance</button>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
              {['Roll', 'Name', 'Status'].map(h => <th key={h} className="px-5 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-5 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.roll}</td>
                <td className="px-5 py-3" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    {['P', 'A', 'L'].map((l, i) => {
                      const st = ['present', 'absent', 'late'][i];
                      const colors = ['bg-green-100 text-green-700 border-green-200', 'bg-red-100 text-red-700 border-red-200', 'bg-yellow-100 text-yellow-700 border-yellow-200'];
                      return (
                        <button key={l} className={`px-3 py-1 rounded-full text-xs font-bold border ${s.status === st ? colors[i] : ''}`}
                          style={s.status !== st ? { backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' } : {}}>
                          {l}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- Grades --- */
function Grades({ students }: { students: any[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Enter Marks — Midterm Exam</h2>
        <button className="bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#27ae60]">Save Marks</button>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
              {['Roll', 'Name', 'Score (out of 100)'].map(h => <th key={h} className="px-5 py-3 font-semibold text-left" style={{ color: 'var(--text-secondary)' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-5 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.roll}</td>
                <td className="px-5 py-3" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                <td className="px-5 py-3">
                  <input type="number" defaultValue={s.avg} min={0} max={100} className="w-20 border rounded-lg px-2 py-1 text-sm input-themed text-center" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- Behavior --- */
function Behavior({ students }: { students: any[] }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Student Behavior & Remarks</h2>
      <div className="space-y-4">
        {students.slice(0, 3).map(s => (
          <div key={s.id} className="rounded-xl border p-5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{s.name}</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {['Attentiveness', 'Discipline'].map(attr => (
                <div key={attr}>
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{attr}</label>
                  <select className="w-full border rounded-lg px-3 py-1.5 text-sm mt-1 input-themed">
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}/5</option>)}
                  </select>
                </div>
              ))}
            </div>
            <textarea rows={2} placeholder="Write remarks..." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
        ))}
        <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">Save All</button>
      </div>
    </div>
  );
}

/* --- Post Homework --- */
function HomeworkPost() {
  return (
    <div className="max-w-lg">
      <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Post Homework</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Title</label>
            <input type="text" placeholder="e.g. Chapter 5 Exercises" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Description</label>
            <textarea rows={3} placeholder="Assignment details..." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Due Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
          <button className="w-full bg-[#0B3C5D] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#072a42]">Post to Class</button>
        </div>
      </div>
    </div>
  );
}

/* --- Messaging --- */
function Messaging() {
  return (
    <div className="max-w-lg">
      <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Send Message</h2>
        <div className="space-y-3">
          <select className="w-full border rounded-lg px-3 py-2 text-sm input-themed">
            <option>To: Alice Smith's Parent</option><option>To: Bob Johnson's Parent</option><option>To: Principal</option>
          </select>
          <textarea rows={3} placeholder="Type your message..." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#072a42]">
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>Note: All messages are visible to the Principal.</p>
      </div>
    </div>
  );
}

/* --- Add Student (Admission) --- */
function AddAdmission() {
  return (
    <div className="max-w-lg">
      <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Add New Student</h2>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Requires Principal approval</p>
        <div className="space-y-3">
          {[
            { label: 'Student Name', type: 'text', ph: 'Full name' },
            { label: "Father's Name", type: 'text', ph: "Father's full name" },
            { label: 'Phone', type: 'tel', ph: '+91-XXXXX-XXXXX' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Class</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm input-themed">
              <option>Grade 10 - A</option><option>Grade 9 - B</option><option>Grade 8 - A</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Photo</label>
            <input type="file" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
          <button className="w-full bg-[#0B3C5D] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#072a42]">Submit for Approval</button>
        </div>
      </div>
    </div>
  );
}

/* --- Settings --- */
function TeacherSettings() {
  return (
    <div className="max-w-lg rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
      <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>My Settings</h2>
      <div className="space-y-4">
        {[
          { label: 'Name', val: 'Mr. Anderson' },
          { label: 'Email', val: 'anderson@kerla.edu' },
          { label: 'Subject', val: 'Mathematics' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
            <input defaultValue={f.val} className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>New Password</label>
          <input type="password" placeholder="Leave blank to keep current" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
        </div>
        <button className="bg-[#0B3C5D] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">Save Changes</button>
      </div>
    </div>
  );
}
