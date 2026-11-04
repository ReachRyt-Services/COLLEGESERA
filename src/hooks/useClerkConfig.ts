
import { useState, useEffect } from 'react';

export const useClerkConfig = () => {
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClerkConfig = async () => {
      try {
        // This is a placeholder implementation.
        // You should replace this with your actual data fetching logic.
        console.log('Fetching Clerk configuration...');
        const pk = "pk_test_...;"
        setPublishableKey(pk);
      } catch (err: any) {
        console.error('Error fetching Clerk config:', err);
        setError(err.message || 'Failed to load authentication configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchClerkConfig();
  }, []);

  return { publishableKey, loading, error };
};
