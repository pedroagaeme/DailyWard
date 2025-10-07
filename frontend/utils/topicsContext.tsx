import { HomeFeedItem } from "@/components/FeedArea/HomeFeedItem";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface TopicsContextType {
    topics?: HomeFeedItem[];
    topicState?: { id: string; title: string; creationDate: string };
    enterTopic?: (id: string, title: string, creationDate: string) => void;
    exitTopic?: () => void;
}

const TopicsContext = createContext<TopicsContextType>({});

export const useTopics = () => {return useContext(TopicsContext)};

export const TopicsProvider = ({ children, topics }: { 
    children: React.ReactNode,
    topics: HomeFeedItem[]
}) => {

    const [topicState, setTopicState] = useState<{ id: string; title: string; creationDate: string } | undefined>(undefined);
    
    const router = useRouter();
    const enterTopic = (id: string, title: string, creationDate: string) => {
        setTopicState({ id, title, creationDate });
        router.push(`/topics/[id]`);
    };
    const exitTopic = () => {
        setTopicState(undefined);
        router.push('/topics');
    }

    return (
        <TopicsContext.Provider value={{ topics, topicState, enterTopic, exitTopic }}>
            {children}
        </TopicsContext.Provider>
    );
};