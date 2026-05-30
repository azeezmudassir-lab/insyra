import { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, GraduationCap, CalendarCheck, 
  FileText, CalendarDays, MessageSquare, Clock, HelpCircle, 
  BarChart, CreditCard, Settings, Search, Bell, Menu, X,
  Globe, DollarSign, LogOut
} from 'lucide-react';
import { DashboardHome } from '../components/principal/DashboardHome';
import { ClassesModule } from '../components/principal/ClassesModule';
import { StudentsModule } from '../components/principal/StudentsModule';
import { 
  TeachersModule, TimetableModule, MessagingModule, LeaveQueriesModule, 
  ReportsBillingModule, AttendanceModule, MarksModule, FeeModule, SettingsModule 
} from '../components/principal/OtherModules';
import { ThemeToggle } from '../components/ThemeToggle';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: null },
  { id: 'classes', label: 'Classes', icon: BookOpen, section: 'Academics' },
  { id: 'students', label: 'Students', icon: Users, section: 'Academics' },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap, section: 'Academics' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, section: 'Academics' },
  { id: 'marks', label: 'Marks & Exams', icon: FileText, section: 'Academics' },
  { id: 'timetable', label: 'Timetable', icon: CalendarDays, section: 'Academics' },
  { id: 'fees', label: 'Fee Management', icon: DollarSign, section: 'Finance' },
  { id: 'messaging', label: 'Messaging', icon: MessageSquare, section: 'Communication' },
  { id: 'leave', label: 'Leave Requests', icon: Clock, section: 'Communication' },
  { id: 'queries', label: 'Queries', icon: HelpCircle, section: 'Communication' },
  { id: 'reports', label: 'Reports', icon: BarChart, section: 'Reports' },
  { id: 'billing', label: 'Billing & Sub.', icon: CreditCard, section: 'Reports' },
  { id: 'website', label: 'School Website', icon: Globe, section: 'Settings' },
  { id: 'settings', label: 'Settings', icon: Settings, section: 'Settings' },
];

export default function PrincipalDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const schoolName = "Kerla High School";

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'classes': return <ClassesModule />;
      case 'students': return <StudentsModule />;
      case 'teachers': return <TeachersModule />;
      case 'attendance': return <AttendanceModule />;
      case 'marks': return <MarksModule />;
      case 'timetable': return <TimetableModule />;
      case 'fees': return <FeeModule />;
      case 'messaging': return <MessagingModule />;
      case 'leave':
      case 'queries':
        return <LeaveQueriesModule activeTab={activeTab} />;
      case 'reports':
      case 'billing':
        return <ReportsBillingModule activeTab={activeTab} />;
      case 'settings':
      case 'website':
        return <SettingsModule activeTab={activeTab} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              Module '{activeTab}' is under development.
            </p>
          </div>
        );
    }
  };

  // Group menu items by section
  const sections = Array.from(new Set(MENU_ITEMS.map(i => i.section)));

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 z-30 transform transition-transform duration-300 flex flex-col h-screen shadow-2xl`}
        style={{ 
          backgroundColor: 'var(--sidebar-bg)',
          color: 'var(--sidebar-text)',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
        }}
      >
        <div 
          className="px-6 py-5 flex justify-between items-center shrink-0 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div>
            <h2 className="text-lg font-bold truncate" style={{ color: 'var(--sidebar-text)' }}>
              {schoolName}
            </h2>
            <p className="text-xs font-medium opacity-60 mt-0.5">Principal Portal</p>
          </div>
          <button 
            className="lg:hidden opacity-70 hover:opacity-100 transition-opacity" 
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar space-y-1">
          {MENU_ITEMS.filter(i => i.section === null).map(item => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === item.id ? 'sidebar-item-active opacity-100' : 'opacity-70 sidebar-item-hover hover:opacity-90'
              }`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" style={{ width: '18px', height: '18px' }} />
              <span>{item.label}</span>
            </button>
          ))}

          {['Academics', 'Finance', 'Communication', 'Reports', 'Settings'].map(section => (
            <div key={section}>
              <p 
                className="text-[10px] font-bold uppercase tracking-widest px-3 pt-5 pb-1 opacity-40"
              >
                {section}
              </p>
              {MENU_ITEMS.filter(i => i.section === section).map(item => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeTab === item.id ? 'sidebar-item-active opacity-100' : 'opacity-70 sidebar-item-hover hover:opacity-90'
                  }`}
                >
                  <item.icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm opacity-60 hover:opacity-90 transition-opacity sidebar-item-hover">
            <LogOut style={{ width: '18px', height: '18px' }} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header 
          className="py-3 px-4 sm:px-6 flex justify-between items-center shrink-0 border-b"
          style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}
        >
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden transition-colors" 
              onClick={() => setSidebarOpen(true)}
              style={{ color: 'var(--text-secondary)' }}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
              <Search 
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" 
                style={{ color: 'var(--text-muted)' }}
              />
              <input 
                type="text" 
                placeholder="Search students, teachers..." 
                className="pl-9 pr-4 py-2 rounded-full text-sm w-64 border input-themed"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-xs font-medium hidden lg:block" style={{ color: 'var(--text-muted)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
            
            <ThemeToggle />

            <button 
              id="notifications-btn"
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-secondary)' }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2ECC71] border-2 rounded-full" style={{ borderColor: 'var(--header-bg)' }} />
            </button>

            <div 
              className="flex items-center gap-2.5 pl-3 border-l"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Dr. Sarah Miller</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Principal</p>
              </div>
              <div className="w-9 h-9 bg-[#0B3C5D] rounded-full text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:bg-[#072a42] transition-colors">
                SM
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar"
          style={{ backgroundColor: 'var(--bg-base)' }}
        >
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
