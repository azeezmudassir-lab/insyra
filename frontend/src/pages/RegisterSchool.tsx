import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Building, Mail, Phone, Lock, Users, ArrowRight, ArrowLeft, Palette, Check } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

const STEPS = ['School Info', 'Address & Details', 'Branding', 'Admin Account'];
const THEME_COLORS = ['#0B3C5D', '#1a365d', '#065f46', '#7c2d12', '#581c87', '#1e40af'];

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, name, type = 'text', placeholder, icon: Icon, value, onChange }: FieldProps) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-4 w-4" style={{ color: 'var(--text-muted)' }} /></div>}
      <input
        type={type} name={name} value={value} onChange={onChange}
        className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 border rounded-xl text-sm input-themed`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default function RegisterSchool() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', students: '',
    address: '', city: '', state: '', pincode: '',
    password: '', confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/login');
  };

  const canNext = () => {
    if (step === 0) return formData.name && formData.email && formData.phone;
    if (step === 1) return formData.address && formData.city;
    if (step === 3) return formData.password && formData.password === formData.confirmPassword;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8 font-sans" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="absolute top-4 right-4"><ThemeToggle /></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="bg-[#0B3C5D] p-2.5 rounded-xl shadow-lg"><GraduationCap className="text-white w-6 h-6" /></div>
          <span className="text-2xl font-bold text-[#0B3C5D]">Insyra</span>
        </Link>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'step-done' : i === step ? 'step-active' : 'step-inactive'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? '' : ''}`} style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div className="w-6 h-0.5 rounded" style={{ backgroundColor: i < step ? '#2ECC71' : 'var(--border-color)' }} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-6 sm:p-8 shadow-xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          
          {/* Step 0: School Info */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>School Information</h2>
              <Field label="School Name" name="name" value={formData.name} onChange={handleChange} placeholder="Greenwood High School" icon={Building} />
              <Field label="Email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="admin@school.edu" icon={Mail} />
              <Field label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91-98765-43210" icon={Phone} />
              <Field label="Approximate Students" name="students" value={formData.students} onChange={handleChange} type="number" placeholder="500" icon={Users} />
            </div>
          )}

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Address & Details</h2>
              <Field label="Street Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Road" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Bangalore" />
                <Field label="State" name="state" value={formData.state} onChange={handleChange} placeholder="Karnataka" />
              </div>
              <Field label="PIN Code" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="560001" />
            </div>
          )}

          {/* Step 2: Branding */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Branding & Theme</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Choose your school's accent color and upload a logo.</p>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Theme Color</label>
                <div className="flex gap-3">
                  {THEME_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setThemeColor(c)}
                      className={`w-10 h-10 rounded-full border-3 transition-transform hover:scale-110 ${themeColor === c ? 'ring-2 ring-offset-2 ring-[#2ECC71] scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Upload Logo</label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover-bg transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                  <Palette className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Click to upload logo</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG, SVG (max 2MB)</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Admin Account */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Create Admin Account</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>This will be the Principal login for your school.</p>
              <Field label="Admin Email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="principal@school.edu" icon={Mail} />
              <Field label="Password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Min 8 characters" icon={Lock} />
              <Field label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Re-enter password" icon={Lock} />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0B3C5D] hover:bg-[#072a42] transition-colors disabled:opacity-50"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !canNext()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2ECC71] hover:bg-[#27ae60] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : <>Complete Registration <ArrowRight className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" className="font-semibold text-[#2ECC71] hover:text-[#27ae60]">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
