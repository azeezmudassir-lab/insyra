import { Link } from 'react-router-dom';
import { CheckCircle, Users, Activity, Clock, Shield, MonitorSmartphone, ChevronRight, BarChart3, GraduationCap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#0B3C5D] p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#0B3C5D]">Insyra</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#0B3C5D] font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#0B3C5D] font-medium transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-[#0B3C5D] font-medium transition-colors">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-[#0B3C5D] font-semibold hover:text-[#2ECC71] transition-colors">Log In</Link>
              <Link to="/register" className="bg-[#0B3C5D] hover:bg-[#072a42] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-[#2ECC71]/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-full bg-gradient-to-tr from-[#0B3C5D]/5 to-transparent rounded-tr-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0B3C5D] tracking-tight mb-6">
            Control. Clarity. <span className="text-[#2ECC71]">Performance.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage your school digitally with complete control over student performance and attendance. The ultimate SaaS platform for modern education.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-[#2ECC71] hover:bg-[#27ae60] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Get Started <ChevronRight className="w-5 h-5" />
            </Link>
            <button className="bg-white border-2 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-sm">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B3C5D] mb-4">Everything you need to run a modern school</h2>
            <p className="text-gray-600 text-lg">Powerful features designed to save time and improve educational outcomes.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: 'Performance Tracking', desc: 'Monitor student marks and overall progress with intuitive visual charts.' },
              { icon: Clock, title: 'Attendance Management', desc: 'Real-time attendance tracking for teachers and principals.' },
              { icon: Users, title: 'Teacher Dashboard', desc: 'Empower teachers with a streamlined interface for daily tasks.' },
              { icon: Shield, title: 'Parent Portal', desc: 'Give parents secure, real-time access to their child\'s academic journey.' },
              { icon: Activity, title: 'Real-time Insights', desc: 'Actionable data and analytics for school administrators.' },
              { icon: MonitorSmartphone, title: 'No App Required', desc: 'Fully responsive web design works flawlessly on any device.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-[#0B3C5D]/10 rounded-xl flex items-center justify-center mb-6 text-[#0B3C5D]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B3C5D] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B3C5D] mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Get your school up and running in 4 simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register School', desc: 'Sign up and get your unique School ID in minutes.' },
              { step: '02', title: 'Setup Data', desc: 'Add students, teachers, and assign classes easily.' },
              { step: '03', title: 'Daily Updates', desc: 'Teachers log in to update attendance and marks.' },
              { step: '04', title: 'Track Progress', desc: 'Parents and principals monitor real-time performance.' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0B3C5D] to-[#2ECC71] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#0B3C5D] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-10 right-[-50%] w-full h-[2px] bg-gray-200 -z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B3C5D] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">Choose a plan that scales with your school.</p>
          </div>
          
          <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#0B3C5D] p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
              <p className="text-[#2ECC71] font-medium">For growing schools</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-gray-500 font-medium mb-1">Setup Fee</div>
                <div className="text-4xl font-bold text-[#0B3C5D]">₹999 <span className="text-lg text-gray-500 font-normal">one-time</span></div>
              </div>
              <div className="text-center mb-8">
                <div className="text-gray-500 font-medium mb-1">Monthly Subscription</div>
                <div className="text-3xl font-bold text-[#0B3C5D]">₹1500 - ₹3000 <span className="text-lg text-gray-500 font-normal">/mo</span></div>
                <p className="text-sm text-gray-500 mt-2">Based on student count</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {['Unlimited Students & Teachers', 'All Dashboard Features', 'Free Updates', 'Priority Support', 'Parent Portal Access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-[#2ECC71] w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full text-center bg-[#2ECC71] hover:bg-[#27ae60] text-white py-4 rounded-xl font-bold transition-colors">
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B3C5D] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-[#2ECC71] w-8 h-8" />
              <span className="text-3xl font-bold text-white">Insyra</span>
            </div>
            <p className="text-blue-200 max-w-sm mb-6">Control. Clarity. Performance. The ultimate digital solution for modern schools.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-blue-300">
          <p>© {new Date().getFullYear()} Insyra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
