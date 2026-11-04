
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, BarChart3, GraduationCap, ImageIcon, TrendingUp, User, Shield, FileText, Upload, Home, Database, Users } from "lucide-react";
//import { useAdminAuth } from "@/hooks/useAdminAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
//import AdminErrorBoundary from "@/components/admin/AdminErrorBoundary";

// Lazy imports to prevent circular dependency issues
import { lazy, Suspense } from "react";

//const EnhancedCollegeManagement = lazy(() => import("@/components/admin/EnhancedCollegeManagement"));
//const AdManagement = lazy(() => import("@/components/admin/AdManagement"));
//const AnalyticsDashboard = lazy(() => import("@/components/admin/AnalyticsDashboard"));
//const SearchTrends = lazy(() => import("@/components/admin/SearchTrends"));
//const ArticleManagement = lazy(() => import("@/components/admin/ArticleManagement"));
//const DataImportWithSchema = lazy(() => import("@/components/admin/DataImportWithSchema"));
//const HomepageContentManagement = lazy(() => import("@/components/admin/HomepageContentManagement"));
//const CrmDashboard = lazy(() => import("@/components/admin/CrmDashboard"));

const AdminDashboard = () => {
  //onst { signOut, adminUser } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("colleges");

  const handleLogout = async () => {
    //await signOut();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'moderator':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="w-3 h-3" />;
      case 'admin':
        return <User className="w-3 h-3" />;
      case 'moderator':
        return <User className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  return (
    <ProtectedRoute>
      <AdminErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
                  {adminUser && (
                    <div className="flex items-center space-x-2">
                      <Badge className={`flex items-center space-x-1 ${getRoleColor(adminUser.role)}`}>
                        {getRoleIcon(adminUser.role)}
                        <span className="capitalize">{adminUser.role.replace('_', ' ')}</span>
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {adminUser.email}
                      </span>
                    </div>
                  )}
                </div>
                
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="colleges" className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Colleges</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Articles</span>
                </TabsTrigger>
                <TabsTrigger value="homepage" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Homepage</span>
                </TabsTrigger>
                <TabsTrigger value="ads" className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Ads</span>
                </TabsTrigger>
                <TabsTrigger value="crm" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>CRM</span>
                </TabsTrigger>
                <TabsTrigger value="data-import" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Data Import</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trends</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colleges">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <EnhancedCollegeManagement />
                </Suspense>
              </TabsContent>

              <TabsContent value="articles">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <ArticleManagement />
                </Suspense>
              </TabsContent>

              <TabsContent value="homepage">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <HomepageContentManagement />
                </Suspense>
              </TabsContent>

              <TabsContent value="ads">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <AdManagement />
                </Suspense>
              </TabsContent>

              <TabsContent value="crm">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <CrmDashboard />
                </Suspense>
              </TabsContent>

              <TabsContent value="data-import">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <DataImportWithSchema />
                </Suspense>
              </TabsContent>

              <TabsContent value="analytics">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <AnalyticsDashboard />
                </Suspense>
              </TabsContent>

              <TabsContent value="trends">
                <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                  <SearchTrends />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AdminErrorBoundary>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
