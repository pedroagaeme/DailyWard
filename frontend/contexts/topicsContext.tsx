import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import { HomeFeedItem, TopicsContextType } from "@/types";
import { TopicService } from "@/services";

const TopicsContext = createContext<TopicsContextType>({});

export const useTopics = () => {return useContext(TopicsContext)};

export const TopicsProvider = ({ children }: { 
    children: React.ReactNode,
}) => {

    const [topics, setTopics] = useState<HomeFeedItem[]>([]);
    const [topicState, setTopicState] = useState<{ code:string, id: string; title: string; creationDate: string } | undefined>(undefined);
    
    const fetchUserTopics = async () => {
      const topics = await TopicService.fetchUserTopics();
      setTopics(topics);
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
