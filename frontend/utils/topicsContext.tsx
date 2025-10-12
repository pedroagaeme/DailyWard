import { HomeFeedItem } from "@/components/FeedArea/HomeFeedItem";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { axiosPrivate } from "./api";

interface TopicsContextType {
    topics?: HomeFeedItem[];
    topicState?: { id: string; title: string; creationDate: string };
    fetchUserTopics?: () => void;
    enterTopic?: (id: string, title: string, creationDate: string) => void;
    exitTopic?: () => void;
}

const TopicsContext = createContext<TopicsContextType>({});

export const useTopics = () => {return useContext(TopicsContext)};

export const TopicsProvider = ({ children }: { 
    children: React.ReactNode,
}) => {

    const [topics, setTopics] = useState<HomeFeedItem[]>([]);
    const [topicState, setTopicState] = useState<{ id: string; title: string; creationDate: string } | undefined>(undefined);
    
    const fetchUserTopics = async () => {
      try {
          const response = await axiosPrivate.get(`/users/me/topics/`);
          if (response.status === 200) {
            setTopics!(response.data.results);
          }
      } catch (error) {
          console.error('Error fetching user topics:', error);
      }
      };

    const router = useRouter();

    const enterTopic = (id: string, title: string, creationDate: string) => {
        setTopicState({ id, title, creationDate });
        router.push(`/topics/main/[id]`);
    };

    const exitTopic = () => {
        setTopicState(undefined);
        router.push('/topics/main');
    }

    return (
        <TopicsContext.Provider value={{ topics, topicState, enterTopic, exitTopic, fetchUserTopics}}>
            {children}
        </TopicsContext.Provider>
    );
};