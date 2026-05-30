import { Users, TrendingUp, UserCheck, BookOpen, AlertCircle, DollarSign, Activity, CheckCircle2, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export function DashboardHome() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';

  const attendanceData = [
    { name: 'Present', value: 88 },
    { name: 'Absent', value: 8 },
    { name: 'Late', value: 4 },
  ];
  const ATTENDANCE_COLORS = ['#2ECC71', '#ef4444', '#f59e0b'];

  const marksData = [
    { name: 'Gr.8', avg: 72 },
    { name: 'Gr.9', avg: 82 },
    { name: 'Gr.10', avg: 88 },
    { name: 'Gr.11', avg: 79 },
    { name: 'Gr.12', avg: 85 },
  ];

  const KPI_CARDS = [
    { label: 'Total Students', value: '1,250', icon: Users, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', trend: '+12 this month' },
    { label: 'Total Teachers', value: '85', icon: GraduationCap, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', trend: '3 classes unassigned' },
    { label: 'Attendance', value: '92%', icon: UserCheck, color: '#10b981', bg: 'rgba(16,185,129,0.1)', trend: '↑ 2% vs last week' },
    { label: 'Avg Performance', value: '81%', icon: TrendingUp, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', trend: 'Midterm results' },
    { label: 'Active Classes', value: '32', icon: BookOpen, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', trend: '8 grade levels' },
    { label: 'Fees Collected', value: '₹4.2L', icon: DollarSign, color: '#2ECC71', bg: 'rgba(46,204,113,0.1)', trend: '78% collection rate' },
  ];

  const topStudents = [
    { name: 'Diana Prince', class: 'Gr.12 A', avg: 97 },
    { name: 'Alice Smith', class: 'Gr.10 A', avg: 95 },
    { name: 'Priya Sharma', class: 'Gr.11 A', avg: 93 },
    { name: 'Arjun Mehta', class: 'Gr.10 B', avg: 91 },
    { name: 'Sara Khan', class: 'Gr.12 B', avg: 90 },
  ];

  const weakStudents = [
    { name: 'John Doe', class: 'Gr.8 C', avg: 42 },
    { name: 'Mike Brown', class: 'Gr.9 B', avg: 45 },
    { name: 'Tom Wilson', class: 'Gr.8 A', avg: 48 },
    { name: 'Lucy Chen', class: 'Gr.9 C', avg: 51 },
    { name: 'Sam Patel', class: 'Gr.10 C', avg: 53 },
  ];

  const recentActivity = [
    { icon: '📝', text: 'Mr. Anderson entered marks for Grade 10 - A', time: '5 min ago', type: 'marks' },
    { icon: '✅', text: 'Attendance marked for Grade 9 - B', time: '15 min ago', type: 'attendance' },
    { icon: '🎒', text: 'New admission: Rohan Kumar (Grade 7)', time: '1 hour ago', type: 'admission' },
    { icon: '💰', text: 'Fee paid: Alice Smith - ₹3,000', time: '2 hours ago', type: 'fee' },
    { icon: '📩', text: 'Leave request: John Doe (Medical)', time: '3 hours ago', type: 'leave' },
  ];

  function GraduationCap(props: any) {
    return <Users {...props} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard Overview</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Kerla High School — Academic Year 2025–26</p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-muted)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-1.5 animate-pulse" />
          Live data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {KPI_CARDS.map((stat, i) => (
          <div 
            key={i} 
            className="p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: stat.bg }}
            >
              <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Bar Chart - wider */}
        <div 
          className="lg:col-span-3 p-6 rounded-2xl border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <h2 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Class-wise Performance</h2>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Average marks per grade</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                  cursor={{ fill: 'var(--bg-surface-2)' }}
                />
                <Bar dataKey="avg" fill="#0B3C5D" radius={[6, 6, 0, 0]} name="Avg %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div 
          className="lg:col-span-2 p-6 rounded-2xl border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
        >
          <h2 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Today's Attendance</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>School-wide distribution</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={attendanceData} 
                  innerRadius={48} 
                  outerRadius={72} 
                  paddingAngle={4} 
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {attendanceData.map((_, index) => (
                    <Cell key={index} fill={ATTENDANCE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-1">
            {attendanceData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ATTENDANCE_COLORS[index] }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{entry.name}</span>
                </div>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Students, Weak Students, Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Students */}
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-2)' }}>
            <span className="text-lg">🏆</span>
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Top Performers</h2>
          </div>
          <ul className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {topStudents.map((s, i) => (
              <li key={i} className="px-5 py-3 flex items-center justify-between hover-bg transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: i === 0 ? '#fef3c7' : 'var(--bg-surface-2)', color: i === 0 ? '#92400e' : 'var(--text-secondary)' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.class}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#2ECC71]">{s.avg}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weak Students */}
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.05)' }}>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-bold text-red-600">Needs Attention</h2>
          </div>
          <ul className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {weakStudents.map((s, i) => (
              <li key={i} className="px-5 py-3 flex items-center justify-between hover-bg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.class}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-red-500">{s.avg}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-2)' }}>
            <Activity className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
          </div>
          <ul className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {recentActivity.map((item, i) => (
              <li key={i} className="px-5 py-3 hover-bg transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
