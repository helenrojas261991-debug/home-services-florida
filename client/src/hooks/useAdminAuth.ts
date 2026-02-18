import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSessionQuery = trpc.adminAuth.checkSession.useQuery();
  const logoutMutation = trpc.adminAuth.logout.useMutation();

  useEffect(() => {
    if (checkSessionQuery.data) {
      setIsAuthenticated(checkSessionQuery.data.authenticated);
      setIsLoading(false);
    }
  }, [checkSessionQuery.data]);

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsAuthenticated(false);
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
