import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileService } from "@/services/profileService";
import { UserProfileUpdateData } from "@/types";

export function useUserProfile() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => ProfileService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UserProfileUpdateData) => ProfileService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      // Update the cache with the new profile data
      queryClient.setQueryData(['userProfile'], updatedProfile);
    },
  });

  return { 
    profile: data, 
    isLoading, 
    isError, 
    error,
    refetch,
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}

