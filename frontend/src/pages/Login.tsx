import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, User, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

const DEMO_CREDENTIALS = [
  { role: 'Principal', email: 'principal@demo.school', password: 'demo123', path: '/dashboard/principal', label: '🏫 Principal (Admin)' },
  { role: 'Teacher', email: 'teacher@demo.school', password: 'demo123', path: '/dashboard/teacher', label: '👩‍🏫 Teacher' },
  { role: 'Student', email: 'student@demo.school', password: 'demo123', path: '/dashboard/student', label: '🎒 Student' },
  { role: 'Parent', email: 'parent@demo.school', password: 'demo123', path: '/dashboard/parent', label: '👨‍👩‍👦 Parent' },
  { role: 'SuperAdmin', email: 'superadmin@insyra.com', password: 'super123', path: '/dashboard/super-admin', label: '⚡ Super Admin' },
];

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate authentication with role detection
    await new Promise(r => setTimeout(r, 800));
    
    const match = DEMO_CREDENTIALS.find(
      c => c.email === formData.email && c.password === formData.password
    );
    
    if (match) {
      navigate(match.path);
    } else {
      setError('Invalid credentials. Use a demo account below.');
    }
    setLoading(false);
  };

  const handleDemoLogin = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setFormData({ email: cred.email, password: cred.password });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Theme toggle top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="bg-[#0B3C5D] p-2.5 rounded-xl shadow-lg">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <span className="text-3xl font-bold text-[#0B3C5D]">Insyra</span>
        </Link>
        <h2 className="text-center text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Or{' '}
          <Link to="/register" className="font-semibold text-[#2ECC71] hover:text-[#27ae60]">
            register your school
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all input-themed"
                  placeholder="admin@school.edu"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-[#2ECC71] hover:text-[#27ae60]">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all input-themed"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-[#0B3C5D] hover:bg-[#072a42] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Demo Login Shortcuts */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDENTIALS.map(cred => (
                <button
                  key={cred.role}
                  type="button"
                  id={`demo-${cred.role.toLowerCase()}`}
                  onClick={() => handleDemoLogin(cred)}
                  className="text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:border-[#0B3C5D]"
                  style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {cred.label}
                </button>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Click any role above to auto-fill credentials, then sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
