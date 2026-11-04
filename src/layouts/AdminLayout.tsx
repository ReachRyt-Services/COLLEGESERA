
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
    LayoutDashboard,
    Users,
    School,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    GraduationCap,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const { isSignedIn, user, isLoaded } = useUser();
    const navigate = useNavigate();

    const ADMIN_EMAILS = ['hariraam117@gmail.com']; // Add more admin emails here

    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                navigate('/auth');
            } else if (user?.primaryEmailAddress?.emailAddress && !ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress)) {
                // Redirect non-admin users to home
                navigate('/');
            }
        }
    }, [isLoaded, isSignedIn, user, navigate]);

    if (!isLoaded) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    // Double check before rendering
    if (!isSignedIn || (user?.primaryEmailAddress?.emailAddress && !ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress))) {
        return null;
    }

    const navItems = [
        { name: 'Dashboard', path: '/secure-portal', icon: LayoutDashboard },
        { name: 'Leads (CRM)', path: '/secure-portal/leads', icon: Users },
        { name: 'Colleges', path: '/secure-portal/colleges', icon: School },
        { name: 'SEO & Landing Pages', path: '/secure-portal/seo', icon: Globe },
        { name: 'Analytics', path: '/secure-portal/analytics', icon: BarChart3 },
        { name: 'Articles', path: '/secure-portal/articles', icon: FileText },
        { name: 'Scholarships', path: '/secure-portal/scholarships', icon: GraduationCap },
        { name: 'Settings', path: '/secure-portal/settings', icon: Settings },
    ];

    const isActive = (path: string) => {
        if (path === '/secure-portal' && location.pathname === '/secure-portal') return true;
        if (path !== '/secure-portal' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span className="text-orange-500">College</span>Sera
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded ml-2">ADMIN</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.path)
                                    ? 'bg-orange-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        onClick={() => console.log("Logout clicked")}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden text-slate-500 hover:text-slate-700"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
