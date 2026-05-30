import { Calendar, TrendingUp, Award, User, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function ParentDashboard() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';

  const performanceData = [
    { month: 'Jul', score: 75 },
    { month: 'Aug', score: 78 },
    { month: 'Sep', score: 82 },
    { month: 'Oct', score: 85 },
    { month: 'Nov', score: 88 },
  ];

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <header className="bg-[#0B3C5D] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg"><User className="w-6 h-6" /></div>
            <h1 className="text-2xl font-bold">Kerla High School Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative">
              <Bell className="w-6 h-6 text-blue-200 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#2ECC71] border-2 border-[#0B3C5D] rounded-full"></span>
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">John Smith</p>
              <p className="text-xs text-blue-200">Parent</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Child Selector */}
        <div className="rounded-xl border p-4 mb-8 flex items-center justify-between" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[#0B3C5D] text-lg">A</div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Alice Smith</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Grade 10 - Mathematics</p>
            </div>
          </div>
          <button className="text-[#0B3C5D] text-sm font-bold hover:underline">Switch Child</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Stats */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Academic Overview</h3>
              <div className="space-y-6">
                {[
                  { label: 'Attendance Rate', value: '95%', icon: Calendar, bg: 'rgba(46,204,113,0.1)', color: '#2ECC71' },
                  { label: 'Average Grade', value: 'A-', icon: TrendingUp, bg: 'rgba(11,60,93,0.1)', color: '#0B3C5D' },
                  { label: 'Class Rank', value: '4th', icon: Award, bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Attendance</h3>
              <ul className="space-y-3">
                {[
                  { date: 'Oct 24, 2026', status: 'Present', cls: 'badge-green' },
                  { date: 'Oct 23, 2026', status: 'Present', cls: 'badge-green' },
                  { date: 'Oct 22, 2026', status: 'Late', cls: 'badge-yellow' },
                  { date: 'Oct 21, 2026', status: 'Present', cls: 'badge-green' },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.date}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.cls}`}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Performance Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fill: tickColor, fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }} />
                    <Line type="monotone" dataKey="score" stroke="#0B3C5D" strokeWidth={3} dot={{ r: 4, fill: '#0B3C5D' }} activeDot={{ r: 8, fill: '#2ECC71' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Marks */}
            <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Recent Exam Results</h3>
                <button className="text-[#0B3C5D] text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                      {['Subject', 'Exam Type', 'Score', 'Grade'].map(h => (
                        <th key={h} className="px-6 py-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sub: 'Mathematics', type: 'Midterm', score: '88/100', grade: 'A' },
                      { sub: 'Science', type: 'Midterm', score: '92/100', grade: 'A+' },
                      { sub: 'English', type: 'Midterm', score: '78/100', grade: 'B+' },
                      { sub: 'History', type: 'Midterm', score: '85/100', grade: 'A-' },
                    ].map((item, i) => (
                      <tr key={i} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="px-6 py-4 font-medium" style={{ color: 'var(--text-primary)' }}>{item.sub}</td>
                        <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{item.type}</td>
                        <td className="px-6 py-4 font-bold text-[#0B3C5D]">{item.score}</td>
                        <td className="px-6 py-4"><span className="text-[#2ECC71] font-bold">{item.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
