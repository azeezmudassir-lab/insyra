import { useState } from 'react';
import { Building, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export default function SuperAdminDashboard() {
  const [schools] = useState([
    { id: '1', name: 'Greenwood High', email: 'admin@greenwood.edu', students: 850, status: 'active', joinedAt: '2026-01-15' },
    { id: '2', name: 'Lincoln Middle School', email: 'contact@lincoln.edu', students: 420, status: 'active', joinedAt: '2026-02-20' },
    { id: '3', name: 'Springfield Elementary', email: 'info@springfield.edu', students: 600, status: 'inactive', joinedAt: '2026-05-10' }
  ]);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-base)' }}>
      <header className="border-b" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0B3C5D]">Super Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Admin User</span>
            <div className="w-10 h-10 bg-[#0B3C5D] text-white rounded-full flex items-center justify-center font-bold">SA</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Schools', value: schools.length, icon: Building, bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
            { label: 'Active Schools', value: schools.filter(s => s.status === 'active').length, icon: CheckCircle, bg: 'rgba(46,204,113,0.1)', color: '#2ECC71' },
            { label: 'Total Revenue', value: `₹${schools.filter(s => s.status === 'active').length * 2500}`, icon: Building, bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl border flex items-center gap-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Registered Schools</h2>
            <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#072a42]">Add School Manually</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                  {['School Name', 'Email', 'Students', 'Joined Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className={`px-6 py-3 font-semibold ${h === 'Actions' ? 'text-right' : ''}`} style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schools.map(school => (
                  <tr key={school.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                    <td className="px-6 py-4 font-medium" style={{ color: 'var(--text-primary)' }}>{school.name}</td>
                    <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{school.email}</td>
                    <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{school.students}</td>
                    <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{school.joinedAt}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${school.status === 'active' ? 'badge-green' : 'badge-yellow'}`}>
                        {school.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button style={{ color: 'var(--text-muted)' }}><MoreVertical className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
