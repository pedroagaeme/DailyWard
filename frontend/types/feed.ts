// Base feed item interface
export interface FeedItem {
  id: string;
}

// Home feed item for topic listings
export interface HomeFeedItem extends FeedItem {
  title: string;
  description?: string;
  topicImageUrl: string;
  createdAt: string;
  code: string;
}

// Topic feed item for posts
export interface TopicFeedItem extends FeedItem {
  posterName: string;
  contentText: string;
  createdAt: string;
  posterProfilePicUrl: string;
  contentPicUrl: string;
}

// Resource file interface
export interface ResourceFile {
  id: number;
  filename: string;
  fileSize?: number;
  mimeType?: string;
  created_at: string;
}

// Resources feed item
export interface ResourcesFeedItem extends FeedItem {
  title: string;
  resourceType?: string;
  description?: string;
  posterName?: string;
  posterProfilePicUrl?: string;
  createdAt?: string;
  files?: ResourceFile[];
}

// Participants feed item
export interface ParticipantsFeedItem extends FeedItem {
  userFullName: string;
  userProfilePic: string;
  role: string;
  joinedAt: string;
}
