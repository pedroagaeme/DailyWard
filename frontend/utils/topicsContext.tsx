import { HomeFeedItem } from "@/components/FeedArea/HomeFeedItem";
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import { axiosPrivate } from "./api";

interface TopicsContextType {
    topics?: HomeFeedItem[];
    topicState?: { code: string, id: string; title: string; creationDate: string };
    fetchUserTopics?: () => void;
    enterTopic?: (code: string, id: string, title: string, creationDate: string) => void;
    exitTopic?: () => void;
}

const TopicsContext = createContext<TopicsContextType>({});

export const useTopics = () => {return useContext(TopicsContext)};

export const TopicsProvider = ({ children }: { 
    children: React.ReactNode,
}) => {

    const [topics, setTopics] = useState<HomeFeedItem[]>([]);
    const [topicState, setTopicState] = useState<{ code:string, id: string; title: string; creationDate: string } | undefined>(undefined);
    
    const fetchUserTopics = async () => {
      try {
          const response = await axiosPrivate.get(`/users/me/topics/`);
          console.log('Fetched user topics:', response.data);
          if (response.status === 200) {
            setTopics!(response.data.results);
          }
      } catch (error) {
          console.error('Error fetching user topics:', error);
      }
      };

    const enterTopic = (code: string, id: string, title: string, creationDate: string) => {
        setTopicState({code, id, title, creationDate });
        router.push(`/topics/main/${id}`);
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