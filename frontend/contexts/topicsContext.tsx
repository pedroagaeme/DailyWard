import { router } from 'expo-router';
import { createContext, useContext, useState } from "react";
import { TopicsContextType } from "@/types";

const TopicsContext = createContext<TopicsContextType>({});

export const useTopics = () => {return useContext(TopicsContext)};

export const TopicsProvider = ({ children }: { 
    children: React.ReactNode,
}) => {
    const [topicState, setTopicState] = useState<{ code:string, id: string; title: string; creationDate: string } | undefined>(undefined);
    

    const enterTopic = (code: string, id: string, title: string, creationDate: string) => {
        setTopicState({code, id, title, creationDate });
        router.push(`/topics/main/${id}`);
    };

    const exitTopic = () => {
        setTopicState(undefined);
        router.push('/topics/main');
    }

    return (
        <TopicsContext.Provider value={{ topicState, enterTopic, exitTopic}}>
            {children}
        </TopicsContext.Provider>
    );
};
