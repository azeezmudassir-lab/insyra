import { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';

export function ClassesModule() {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const classesList = [
    { id: 1, name: 'Grade 8 - A', students: 40, avgScore: 78, attendance: 95, teacher: 'Mr. Smith' },
    { id: 2, name: 'Grade 9 - B', students: 38, avgScore: 82, attendance: 92, teacher: 'Mrs. Davis' },
    { id: 3, name: 'Grade 10 - A', students: 42, avgScore: 88, attendance: 96, teacher: 'Mr. Anderson' },
    { id: 4, name: 'Grade 10 - B', students: 40, avgScore: 75, attendance: 88, teacher: 'Ms. Taylor' },
    { id: 5, name: 'Grade 11 - Sci', students: 35, avgScore: 85, attendance: 94, teacher: 'Dr. Brown' },
  ];

  const studentsList = [
    { id: 1, name: 'Alice Smith', fatherName: 'Robert Smith', class: 'Grade 10 - A', performance: 92, attendance: 98, photoUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Johnson', fatherName: 'William Johnson', class: 'Grade 10 - A', performance: 85, attendance: 90, photoUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie Brown', fatherName: 'James Brown', class: 'Grade 10 - A', performance: 78, attendance: 85, photoUrl: 'https://i.pravatar.cc/150?img=3' },
  ];

  if (selectedClass) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setSelectedClass(null)} className="flex items-center gap-2 hover:text-[#0B3C5D] mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" /> Back to Classes
        </button>
        <div className="p-6 rounded-xl border mb-8 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedClass.name}</h1>
            <p className="mt-1" style={{ color: 'var(--text-muted)' }}>Class Teacher: {selectedClass.teacher}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>Students</p>
              <p className="text-xl font-bold text-[#0B3C5D]">{selectedClass.students}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>Avg Marks</p>
              <p className="text-xl font-bold text-[#2ECC71]">{selectedClass.avgScore}%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>Attendance</p>
              <p className="text-xl font-bold text-blue-500">{selectedClass.attendance}%</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                {['Student', "Father's Name", 'Attendance', 'Avg Marks', 'Action'].map(h => (
                  <th key={h} className={`px-6 py-4 font-semibold ${h === 'Action' ? 'text-right' : ''}`} style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentsList.map(student => (
                <tr key={student.id} className="border-t hover-bg" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={student.photoUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover border" style={{ borderColor: 'var(--border-color)' }} />
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{student.name}</span>
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{student.fatherName}</td>
                  <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-primary)' }}>{student.attendance}%</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full rounded-full h-2 max-w-[80px]" style={{ backgroundColor: 'var(--bg-surface-2)' }}>
                        <div className={`h-2 rounded-full ${student.performance >= 80 ? 'bg-[#2ECC71]' : student.performance >= 60 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${student.performance}%` }}></div>
                      </div>
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{student.performance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#0B3C5D] hover:underline font-medium text-sm">Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Classes Management</h1>
        <button className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#072a42]">
          + Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesList.map(cls => (
          <div key={cls.id} className="p-6 rounded-xl border cursor-pointer transition-all hover:shadow-md border-l-4 border-l-[#0B3C5D]" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }} onClick={() => setSelectedClass(cls)}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{cls.name}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{cls.teacher}</p>
              </div>
              <div className="badge-blue px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Users className="w-3 h-3" /> {cls.students}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p style={{ color: 'var(--text-muted)' }}>Avg Marks</p>
                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{cls.avgScore}%</p>
              </div>
              <div className="text-right">
                <p style={{ color: 'var(--text-muted)' }}>Attendance</p>
                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{cls.attendance}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
