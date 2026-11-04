
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Log additional context for security monitoring
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    console.error("404 Context:", { userAgent, referrer, timestamp: new Date().toISOString() });
  }, [location.pathname]);

  const getErrorMessage = () => {
    const path = location.pathname;
    
    if (path.startsWith('/college/')) {
      return {
        title: "College Not Found",
        message: "The college you're looking for doesn't exist or may have been moved.",
        suggestion: "Try searching for colleges or browse our complete list."
      };
    }
    
    if (path.startsWith('/admin')) {
      return {
        title: "Access Denied",
        message: "You don't have permission to access this admin area.",
        suggestion: "Please contact an administrator if you need access."
      };
    }
    
    return {
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist.",
      suggestion: "Check the URL or return to the homepage."
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">404</CardTitle>
          <h2 className="text-xl text-gray-700">{errorInfo.title}</h2>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">{errorInfo.message}</p>
          <p className="text-sm text-gray-500">{errorInfo.suggestion}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/colleges">
                <Search className="w-4 h-4 mr-2" />
                Browse Colleges
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
