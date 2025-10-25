import { useQuery } from "@tanstack/react-query";
import { TopicService } from "@/services/topicService";

export function useTopicInfo(id: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => TopicService.getTopic(id),
  });

  return { data, isLoading, isError, error };
}