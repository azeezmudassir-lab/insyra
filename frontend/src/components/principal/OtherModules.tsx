import { useState, useEffect } from 'react';
import { Download, CreditCard, Send, CheckCircle, XCircle } from 'lucide-react';

export function TeachersModule() {
  const teachers = [
    { id: 1, name: 'Mr. Anderson', subject: 'Mathematics', class: 'Grade 10 - A', isClassTeacher: true },
    { id: 2, name: 'Mrs. Davis', subject: 'Science', class: 'Grade 9 - B', isClassTeacher: true },
    { id: 3, name: 'Ms. Taylor', subject: 'English', class: 'Grade 10 - B', isClassTeacher: true },
    { id: 4, name: 'Dr. Brown', subject: 'Physics', class: 'Grade 11 - Sci', isClassTeacher: true },
    { id: 5, name: 'Mr. Wilson', subject: 'History', class: 'Unassigned', isClassTeacher: false },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Teachers Management</h1>
        <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">
          + Add Teacher
        </button>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
              <th className="px-6 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
              <th className="px-6 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Subject</th>
              <th className="px-6 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Assigned Class</th>
              <th className="px-6 py-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>Class Teacher</th>
              <th className="px-6 py-4 font-semibold text-right" style={{ color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</td>
                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{t.subject}</td>
                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{t.class}</td>
                <td className="px-6 py-4">{t.isClassTeacher ? <span className="badge-green px-2 py-1 rounded text-xs font-bold">Yes</span> : <span className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-muted)' }}>No</span>}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button className="text-blue-500 hover:underline text-sm">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TimetableModule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['P1', 'P2', 'P3', 'Break', 'P4', 'P5', 'P6'];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Timetable Manager</h1>
        <select className="border rounded-lg px-4 py-2 text-sm input-themed">
          <option>Grade 10 - A</option>
          <option>Grade 9 - B</option>
        </select>
      </div>
      <div className="rounded-xl border overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <table className="w-full text-center text-sm">
          <thead className="bg-[#0B3C5D] text-white">
            <tr>
              <th className="px-4 py-3 border-r border-blue-800">Day</th>
              {periods.map(p => <th key={p} className="px-4 py-3 border-r border-blue-800">{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-4 py-4 font-bold border-r" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>{day}</td>
                {periods.map(p => (
                  <td key={p} className="px-2 py-2 border-r" style={{ borderColor: 'var(--border-color)', ...(p === 'Break' ? { backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-muted)' } : {}) }}>
                    {p === 'Break' ? <span className="font-bold">LUNCH</span> : <input type="text" className="w-full text-center rounded p-1 text-sm input-themed border-transparent hover:border-current" defaultValue={Math.random() > 0.5 ? 'Math' : 'Science'} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MessagingModule() {
  return (
    <div className="animate-fade-in max-w-3xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Messaging System</h1>
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Broadcast to All Parents</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Send an instant WhatsApp or SMS broadcast to all registered parents.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Message Type</label>
            <select className="w-full border rounded-lg px-4 py-2 text-sm input-themed">
              <option>Holiday Notice</option>
              <option>Emergency Update</option>
              <option>General Announcement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Message Content</label>
            <textarea rows={5} className="w-full border rounded-lg px-4 py-2 text-sm input-themed" placeholder="Type your message here..."></textarea>
          </div>
          <button className="bg-[#2ECC71] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#27ae60] flex items-center gap-2">
            <Send className="w-5 h-5" /> Send to All Parents
          </button>
        </div>
      </div>
    </div>
  );
}

export function LeaveQueriesModule({ activeTab }: { activeTab?: string }) {
  const [tab, setTab] = useState(activeTab || 'leave');
  useEffect(() => {
    if (activeTab) setTab(activeTab);
  }, [activeTab]);
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Leave & Queries</h1>
      <div className="flex gap-4 mb-6">
        {[{ id: 'leave', label: 'Leave Requests' }, { id: 'queries', label: 'Parent Queries' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-6 py-2 rounded-lg font-bold text-sm ${tab === t.id ? 'bg-[#0B3C5D] text-white' : ''}`}
            style={tab !== t.id ? { backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
          >{t.label}</button>
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        {tab === 'leave' ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                {['Name', 'Role', 'Reason', 'Letter', 'Action'].map(h => (
                  <th key={h} className={`px-6 py-4 font-semibold ${h === 'Action' ? 'text-right' : ''}`} style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-primary)' }}>Alice Smith</td>
                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>Student</td>
                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>Sick Leave</td>
                <td className="px-6 py-4"><span className="text-blue-500 underline cursor-pointer text-sm">View Image</span></td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button className="text-green-500 hover:bg-green-500/10 p-1 rounded"><CheckCircle className="w-5 h-5" /></button>
                  <button className="text-red-500 hover:bg-red-500/10 p-1 rounded"><XCircle className="w-5 h-5" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="p-6">
            <div className="border rounded-lg p-4 mb-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Robert Smith (Parent of Alice)</h3>
                <span className="badge-yellow text-xs px-2 py-1 rounded font-bold">Pending</span>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Query regarding the upcoming science fair timing.</p>
              <div className="flex gap-2">
                <input type="text" className="flex-1 border rounded-lg px-3 py-1.5 text-sm input-themed" placeholder="Type reply..." />
                <button className="bg-[#0B3C5D] text-white px-4 rounded-lg font-bold text-sm">Reply & Resolve</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ReportsBillingModule({ activeTab }: { activeTab?: string }) {
  const [tab, setTab] = useState(activeTab || 'reports');
  useEffect(() => {
    if (activeTab) setTab(activeTab);
  }, [activeTab]);
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Reports & Billing</h1>
      <div className="flex gap-4 mb-6">
        {[{ id: 'reports', label: 'Reports' }, { id: 'billing', label: 'Billing & Subscription' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-6 py-2 rounded-lg font-bold text-sm ${tab === t.id ? 'bg-[#0B3C5D] text-white' : ''}`}
            style={tab !== t.id ? { backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
          >{t.label}</button>
        ))}
      </div>

      {tab === 'reports' ? (
        <div className="grid md:grid-cols-3 gap-6">
          {['Export Student Data', 'Export Attendance Reports', 'Export Marks'].map(title => (
            <div key={title} className="p-6 rounded-xl border text-center hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <Download className="w-8 h-8 mx-auto text-[#0B3C5D] mb-4" />
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Download CSV format</p>
              <button className="w-full py-2 rounded font-bold text-sm" style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}>Download</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden max-w-3xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border-b" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)' }}>
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Active Plan: Pro Plan</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Next billing date: Nov 24, 2026</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-3xl font-bold text-[#0B3C5D]">₹3000<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></p>
              <span className="badge-green text-xs px-2 py-1 rounded font-bold mt-1 inline-block">Active</span>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Actions</h3>
            <button className="w-full bg-[#0B3C5D] text-white py-3 rounded-lg font-bold hover:bg-[#072a42] transition-colors flex items-center justify-center gap-2 mb-4">
              <CreditCard className="w-5 h-5" /> Renew Subscription
            </button>
            <button className="w-full border py-3 rounded-lg font-bold transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              View Payment History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ATTENDANCE MODULE
   ============================================================ */
export function AttendanceModule() {
  const [selectedClass, setSelectedClass] = useState('Grade 10 - A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const students = [
    { id: 1, name: 'Alice Smith', roll: '101', status: 'present' },
    { id: 2, name: 'Bob Johnson', roll: '102', status: 'present' },
    { id: 3, name: 'Charlie Brown', roll: '103', status: 'absent' },
    { id: 4, name: 'Diana Prince', roll: '104', status: 'present' },
    { id: 5, name: 'Evan Wright', roll: '105', status: 'late' },
  ];

  const statusColors: Record<string, string> = {
    present: 'bg-green-100 text-green-700 border-green-200',
    absent: 'bg-red-100 text-red-700 border-red-200',
    late: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Attendance</h1>
        <div className="flex gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm input-themed"
          />
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm input-themed"
          >
            {['Grade 8 - A', 'Grade 9 - B', 'Grade 10 - A', 'Grade 11 - Sci', 'Grade 12 - A'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Present', count: 38, color: '#2ECC71' },
          { label: 'Absent', count: 5, color: '#ef4444' },
          { label: 'Late', count: 2, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            <p className="text-3xl font-bold mt-1" style={{ color: s.color }}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="px-5 py-3 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)' }}>
          <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{selectedClass} — {selectedDate}</h2>
          <button className="bg-[#2ECC71] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#27ae60]">Save</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
              <th className="px-5 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>Roll</th>
              <th className="px-5 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
              <th className="px-5 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                <td className="px-5 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.roll}</td>
                <td className="px-5 py-3" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    {['present', 'absent', 'late'].map(st => (
                      <button
                        key={st}
                        className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${s.status === st ? statusColors[st] : ''}`}
                        style={s.status !== st ? { backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' } : {}}
                      >
                        {st.charAt(0).toUpperCase()}
                      </button>
                    ))}
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

/* ============================================================
   MARKS / EXAMS MODULE
   ============================================================ */
export function MarksModule() {
  const [selectedClass, setSelectedClass] = useState('Grade 10 - A');
  const [examType, setExamType] = useState('Midterm');

  const students = [
    { id: 1, name: 'Alice Smith', roll: '101', math: 92, sci: 88, eng: 95, hist: 85 },
    { id: 2, name: 'Bob Johnson', roll: '102', math: 78, sci: 82, eng: 80, hist: 75 },
    { id: 3, name: 'Charlie Brown', roll: '103', math: 65, sci: 70, eng: 72, hist: 68 },
    { id: 4, name: 'Diana Prince', roll: '104', math: 97, sci: 95, eng: 98, hist: 93 },
    { id: 5, name: 'Evan Wright', roll: '105', math: 55, sci: 60, eng: 58, hist: 50 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Marks & Exams</h1>
        <div className="flex gap-3">
          <select value={examType} onChange={e => setExamType(e.target.value)} className="border rounded-lg px-3 py-2 text-sm input-themed">
            <option>Midterm</option><option>Final</option><option>Unit Test 1</option>
          </select>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="border rounded-lg px-3 py-2 text-sm input-themed">
            {['Grade 8 - A', 'Grade 9 - B', 'Grade 10 - A', 'Grade 11 - Sci', 'Grade 12 - A'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="px-5 py-3 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)' }}>
          <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{examType} — {selectedClass}</h2>
          <button className="bg-[#2ECC71] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#27ae60]">Save Marks</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Roll</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
                {['Math', 'Science', 'English', 'History'].map(sub => (
                  <th key={sub} className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-secondary)' }}>{sub}</th>
                ))}
                <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-secondary)' }}>Avg</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const avg = Math.round((s.math + s.sci + s.eng + s.hist) / 4);
                return (
                  <tr key={s.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.roll}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                    {[s.math, s.sci, s.eng, s.hist].map((score, i) => (
                      <td key={i} className="px-4 py-2 text-center">
                        <input
                          type="number"
                          defaultValue={score}
                          className="w-16 text-center border rounded-lg px-2 py-1 text-sm input-themed"
                          min={0} max={100}
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${avg >= 80 ? 'badge-green' : avg >= 60 ? 'badge-yellow' : 'badge-red'}`}>
                        {avg}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FEE MANAGEMENT MODULE
   ============================================================ */
export function FeeModule() {
  const feeData = [
    { id: 1, name: 'Alice Smith', class: 'Gr.10-A', parent: 'Robert Smith', phone: '+91-98765-43210', amount: 3000, status: 'paid' },
    { id: 2, name: 'Bob Johnson', class: 'Gr.10-A', parent: 'William Johnson', phone: '+91-98765-43211', amount: 3000, status: 'pending' },
    { id: 3, name: 'Charlie Brown', class: 'Gr.9-B', parent: 'James Brown', phone: '+91-98765-43212', amount: 2500, status: 'pending' },
    { id: 4, name: 'Diana Prince', class: 'Gr.12-A', parent: 'John Prince', phone: '+91-98765-43213', amount: 3500, status: 'paid' },
    { id: 5, name: 'Evan Wright', class: 'Gr.8-C', parent: 'Paul Wright', phone: '+91-98765-43214', amount: 2500, status: 'overdue' },
  ];

  const paid = feeData.filter(f => f.status === 'paid').length;
  const pending = feeData.filter(f => f.status !== 'paid').length;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Fee Management</h1>
        <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42] flex items-center gap-2">
          <Send className="w-4 h-4" /> Send Reminders
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Collected', val: '₹4,20,000', color: '#2ECC71' },
          { label: 'Pending', val: `${pending} students`, color: '#f59e0b' },
          { label: 'Overdue', val: '1 student', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                {['Student', 'Class', 'Parent', 'Phone', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeData.map(f => (
                <tr key={f.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{f.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.class}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.parent}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{f.phone}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-primary)' }}>₹{f.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${f.status === 'paid' ? 'badge-green' : f.status === 'overdue' ? 'badge-red' : 'badge-yellow'}`}>
                      {f.status === 'paid' ? '✓ Paid' : f.status === 'overdue' ? '⚠ Overdue' : '⏳ Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {f.status !== 'paid' && (
                      <button className="text-xs font-bold text-[#0B3C5D] hover:underline">Send Reminder</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SETTINGS MODULE (School Profile + Website Editor)
   ============================================================ */
export function SettingsModule({ activeTab }: { activeTab?: string }) {
  const [tab, setTab] = useState(activeTab === 'website' ? 'website' : 'profile');

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Settings</h1>
      <div className="flex gap-3 mb-6">
        {[
          { id: 'profile', label: 'School Profile' },
          { id: 'website', label: 'School Website' },
          { id: 'account', label: 'Admin Account' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${tab === t.id ? 'bg-[#0B3C5D] text-white' : ''}`}
            style={tab !== t.id ? { backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="rounded-xl border p-6 max-w-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>School Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'School Name', val: 'Kerla High School' },
              { label: 'Email', val: 'admin@kerla.edu' },
              { label: 'Phone', val: '+91-98765-43210' },
              { label: 'Address', val: '123 Main St, City' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                <input defaultValue={f.val} className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Logo Upload</label>
              <input type="file" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
          </div>
          <button className="mt-4 bg-[#0B3C5D] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">Save Changes</button>
        </div>
      )}

      {tab === 'website' && (
        <div className="rounded-xl border p-6 max-w-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>School Website Editor</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Edit the public-facing website for your school.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>About Us</label>
              <textarea rows={3} defaultValue="We are a premier educational institution committed to excellence." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Facilities</label>
              <textarea rows={3} defaultValue="Science labs, library, sports grounds, smart classrooms." className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Theme Color</label>
              <div className="flex gap-3">
                {['#0B3C5D', '#1a365d', '#065f46', '#7c2d12', '#581c87'].map(c => (
                  <button key={c} className="w-8 h-8 rounded-full border-2 border-white shadow hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
          <button className="mt-5 bg-[#2ECC71] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#27ae60]">Publish Changes</button>
        </div>
      )}

      {tab === 'account' && (
        <div className="rounded-xl border p-6 max-w-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Admin Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Admin Name</label>
              <input defaultValue="Dr. Sarah Miller" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Email</label>
              <input defaultValue="sarah@kerla.edu" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="w-full border rounded-lg px-3 py-2 text-sm input-themed" />
            </div>
          </div>
          <button className="mt-4 bg-[#0B3C5D] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">Update Account</button>
        </div>
      )}
    </div>
  );
}
