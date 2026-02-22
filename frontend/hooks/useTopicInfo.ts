import { useQuery } from "@tanstack/react-query";
import { TopicService } from "@/services/topicService";

export function useTopicInfo(id: string, enabled: boolean = true) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => TopicService.getTopic(id),
    enabled: !!id && enabled,
  });

  return { data, isLoading, isError, error, refetch };
}