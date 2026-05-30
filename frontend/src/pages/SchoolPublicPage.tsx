import { useState } from 'react';
import { BookOpen, MapPin, Phone, Mail, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SchoolPublicPage() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState<'none' | 'login' | 'admission'>('none');
  
  const schoolName = "Kerla High School";
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">{schoolName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveForm(activeForm === 'login' ? 'none' : 'login')}
              className="text-white hover:text-blue-200 font-bold"
            >
              Student/Parent Login
            </button>
            <button 
              onClick={() => setActiveForm(activeForm === 'admission' ? 'none' : 'admission')}
              className="bg-[#2ECC71] text-white px-6 py-2 rounded-full font-bold hover:bg-[#27ae60] transition-colors"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        
        {activeForm === 'none' && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row mb-16">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-[#0B3C5D] mb-4">Excellence in Education</h2>
                <p className="text-gray-600 mb-8 text-lg">Welcome to {schoolName}, where we nurture the minds of tomorrow. Our comprehensive curriculum and dedicated faculty ensure every student reaches their full potential.</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveForm('admission')}
                    className="bg-[#0B3C5D] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#072a42] transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-200 h-64 md:h-auto">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" alt="Students" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 text-[#0B3C5D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Top Academics</h3>
                <p className="text-gray-500">Consistently ranking in the top 5% of district performance metrics.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 text-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
                <p className="text-gray-500">Learn from experienced educators passionate about student success.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Facilities</h3>
                <p className="text-gray-500">State-of-the-art laboratories, libraries, and sports complexes.</p>
              </div>
            </div>
          </div>
        )}

        {activeForm === 'login' && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold text-center text-[#0B3C5D] mb-2">{schoolName}</h2>
            <p className="text-center text-gray-500 mb-8">Login to your portal</p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard/parent'); }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Username / Admission No.</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="Enter username" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <input type="password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="Enter password" />
              </div>
              <button type="submit" className="w-full bg-[#0B3C5D] text-white py-3 rounded-lg font-bold hover:bg-[#072a42] transition-colors mt-4">
                Login
              </button>
              <div className="text-center mt-4">
                <button type="button" onClick={() => setActiveForm('none')} className="text-sm text-gray-500 hover:text-gray-800">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {activeForm === 'admission' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-bold text-[#0B3C5D] mb-2">Apply for Admission</h2>
            <p className="text-gray-500 mb-8">Please fill out the details below to apply for the upcoming academic year.</p>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully! Our admissions team will contact you.'); setActiveForm('none'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student's Full Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="e.g., Alice Smith" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Father's Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="e.g., Robert Smith" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mother's Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="e.g., Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Contact Phone</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]" placeholder="you@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Applying for Class/Grade</label>
                  <select required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]">
                    <option value="">Select a Grade</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button type="submit" className="flex-1 bg-[#2ECC71] text-white py-3 rounded-lg font-bold hover:bg-[#27ae60] transition-colors">
                  Submit Application
                </button>
                <button type="button" onClick={() => setActiveForm('none')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{schoolName}</h3>
            <p className="text-gray-400">Shaping the future through quality education and dedicated mentorship.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Education Lane, City</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 234 567 8900</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@kerlahigh.edu</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Powered By</h4>
            <p className="text-gray-400 text-sm">This school portal is powered by <span className="font-bold text-white">Insyra</span>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
