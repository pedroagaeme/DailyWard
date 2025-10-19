import { HomeFeedItem } from './feed';

// Topics context interface
export interface TopicsContextType {
  topics?: HomeFeedItem[];
  topicState?: { code: string, id: string; title: string; creationDate: string };
  fetchUserTopics?: () => void;
  enterTopic?: (code: string, id: string, title: string, creationDate: string) => void;
  exitTopic?: () => void;
}
