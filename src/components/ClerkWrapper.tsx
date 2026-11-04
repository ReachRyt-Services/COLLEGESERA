
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { useClerkConfig } from "@/hooks/useClerkConfig";

interface ClerkWrapperProps {
  children: ReactNode;
}

const ClerkWrapper = ({ children }: ClerkWrapperProps) => {
  const { publishableKey, loading, error } = useClerkConfig();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (error || !publishableKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-2">Authentication configuration error</p>
          <p className="text-gray-600 text-sm">{error || 'Missing configuration'}</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;
