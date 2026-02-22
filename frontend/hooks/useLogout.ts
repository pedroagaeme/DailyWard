import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";

export function useLogout() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Remove all queries for each service
      queryClient.removeQueries({ queryKey: ['userProfile'] });
      queryClient.removeQueries({ queryKey: ['topics'] });
      queryClient.removeQueries({ queryKey: ['topic'] });
      queryClient.removeQueries({ queryKey: ['posts'] });
      queryClient.removeQueries({ queryKey: ['post'] });
      queryClient.removeQueries({ queryKey: ['resources'] });
      queryClient.removeQueries({ queryKey: ['resource'] });
      queryClient.removeQueries({ queryKey: ['participants'] });
    },
  });

  return {
    logout: logoutMutation.mutate,
  };
}

