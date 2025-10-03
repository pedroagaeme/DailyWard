import { createContext, useContext, useState } from "react";


interface TopicProps {
    hasTopic?: boolean;
    topicId?: string | null;
    topicName?: string | null;
    topicCreationDate?: string | null;
    registerTopic?: ({id, title, creationDate}: {id: string, title: string, creationDate: string}) => void;
    clearTopic?: () => void;
}
const TopicContext = createContext<TopicProps>({});

export const useTopic = () => {return useContext(TopicContext)};

export const TopicProvider = ({ children }: { children: React.ReactNode }) => {
    const [topic, setTopic] = useState<{ 
        topicId: string | null; topicName: string | null; topicCreationDate: string | null;
        hasTopic: boolean;
    }>({
        topicId: null,
        topicName: null,
        topicCreationDate: null,
        hasTopic: false,
    });

    const registerTopic = ({id, title, creationDate}: {id: string, title: string, creationDate: string}) => {
        // Function to register topic details
        setTopic({ topicId: id, topicName: title, topicCreationDate: creationDate, hasTopic: true });
        console.log("Registered topic:", { id, title, creationDate});
    };

    const clearTopic = () => {
        // Function to clear topic details
        setTopic({ topicId: null, topicName: null, topicCreationDate: null, hasTopic: false });
        console.log("Cleared topic");
    };
    

    return (
        <TopicContext.Provider value={{ ...topic, registerTopic, clearTopic }}>
            {children}
        </TopicContext.Provider>
    );
};
