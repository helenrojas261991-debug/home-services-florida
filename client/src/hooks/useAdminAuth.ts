import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSessionQuery = trpc.adminAuth.checkSession.useQuery();
  const logoutMutation = trpc.adminAuth.logout.useMutation();

  useEffect(() => {
    // Update authentication state when query completes
    if (checkSessionQuery.data !== undefined) {
      setIsAuthenticated(checkSessionQuery.data.authenticated);
      setIsLoading(false);
    }
    // Also stop loading if there's an error
    if (checkSessionQuery.error) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [checkSessionQuery.data, checkSessionQuery.error]);

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsAuthenticated(false);
      // Refetch session to confirm logout
      await checkSessionQuery.refetch();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
  };
}
