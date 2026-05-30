import { useState } from 'react';
import { Search, Filter, Download, ArrowLeft, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function StudentsModule() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const studentsList = [
    { id: 1, name: 'Alice Smith', fatherName: 'Robert Smith', class: 'Grade 10 - A', phone: '+1234567890', attendance: 98, performance: 92, photoUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Johnson', fatherName: 'William Johnson', class: 'Grade 10 - A', phone: '+1234567891', attendance: 90, performance: 85, photoUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie Brown', fatherName: 'James Brown', class: 'Grade 9 - B', phone: '+1234567892', attendance: 85, performance: 78, photoUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Diana Prince', fatherName: 'John Prince', class: 'Grade 12 - A', phone: '+1234567893', attendance: 95, performance: 95, photoUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Evan Wright', fatherName: 'Paul Wright', class: 'Grade 8 - C', phone: '+1234567894', attendance: 70, performance: 60, photoUrl: 'https://i.pravatar.cc/150?img=5' },
  ];

  const pieData = [
    { name: 'Math', value: 95 },
    { name: 'Science', value: 88 },
    { name: 'English', value: 92 },
    { name: 'History', value: 85 }
  ];
  const COLORS = ['#0B3C5D', '#2ECC71', '#3498db', '#f1c40f'];

  if (isAdding) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <button onClick={() => setIsAdding(false)} className="flex items-center gap-2 hover:text-[#0B3C5D] mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" /> Back to Students List
        </button>
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Add New Student</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Student Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 text-sm input-themed" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Father's Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 text-sm input-themed" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Class</label>
                <select className="w-full border rounded-lg px-4 py-2 text-sm input-themed">
                  <option>Grade 8 - A</option>
                  <option>Grade 9 - B</option>
                  <option>Grade 10 - A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                <input type="tel" className="w-full border rounded-lg px-4 py-2 text-sm input-themed" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Upload Photo</label>
                <input type="file" className="w-full border rounded-lg px-4 py-2 text-sm input-themed" />
              </div>
            </div>
            <button type="button" onClick={() => setIsAdding(false)} className="w-full bg-[#0B3C5D] text-white py-3 rounded-lg font-bold hover:bg-[#072a42] mt-4">
              Save Student Record
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (selectedStudent) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 hover:text-[#0B3C5D] mb-6 font-medium" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" /> Back to Students
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border flex flex-col items-center text-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <img src={selectedStudent.photoUrl} alt="Student" className="w-32 h-32 rounded-full object-cover border-4 mb-4" style={{ borderColor: 'var(--border-color)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedStudent.name}</h2>
            <p className="text-blue-500 font-medium">{selectedStudent.class}</p>
            <div className="w-full mt-6 space-y-3 text-left">
              <p className="text-sm border-b pb-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><span className="font-bold w-24 inline-block" style={{ color: 'var(--text-muted)' }}>Father:</span> {selectedStudent.fatherName}</p>
              <p className="text-sm border-b pb-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><span className="font-bold w-24 inline-block" style={{ color: 'var(--text-muted)' }}>Phone:</span> {selectedStudent.phone}</p>
              <p className="text-sm border-b pb-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><span className="font-bold w-24 inline-block" style={{ color: 'var(--text-muted)' }}>Attendance:</span> <span className="font-bold text-[#2ECC71]">{selectedStudent.attendance}%</span></p>
            </div>
            <button className="mt-6 w-full border border-[#0B3C5D] text-[#0B3C5D] font-bold py-2 rounded-lg hover-bg">Edit Profile</button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl border flex flex-col sm:flex-row gap-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <div className="sm:w-1/2">
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><PieChartIcon className="w-5 h-5"/> Marks Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={40} outerRadius={60} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="sm:w-1/2">
                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Subject-wise Marks</h3>
                <ul className="space-y-3">
                  {pieData.map((sub, i) => (
                    <li key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></span>
                        <span style={{ color: 'var(--text-secondary)' }}>{sub.name}</span>
                      </div>
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{sub.value}/100</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Documents</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover-bg transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Upload Marksheet (PNG/Image)</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Click or drag image here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Students Directory</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => setIsAdding(true)} className="bg-[#0B3C5D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#072a42]">
            + Add Student
          </button>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="p-4 border-b flex gap-4" style={{ backgroundColor: 'var(--bg-surface-2)', borderColor: 'var(--border-color)' }}>
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search by name, roll no..." className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg input-themed" />
          </div>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <Filter className="w-4 h-4" /> Filter by Class
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface)' }}>
                {['Student Name', 'Father Name', 'Class', 'Attendance', 'Avg Marks', 'Action'].map(h => (
                  <th key={h} className={`px-6 py-4 font-semibold ${h === 'Action' ? 'text-right' : ''}`} style={{ color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentsList.map(student => (
                <tr key={student.id} className="border-t hover-bg cursor-pointer" style={{ borderColor: 'var(--border-color)' }} onClick={() => setSelectedStudent(student)}>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={student.photoUrl} alt="Photo" className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{student.name}</span>
                  </td>
                  <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{student.fatherName}</td>
                  <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{student.class}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${student.attendance >= 90 ? 'badge-green' : 'badge-red'}`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-primary)' }}>{student.performance}%</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[#0B3C5D] hover:underline font-medium text-sm">View</span>
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
