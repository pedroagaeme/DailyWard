import { TopicFeedItem } from '@/components/FeedArea/TopicFeedItem';
import { StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { useTopics } from '@/utils/topicsContext';
import { CustomImage, CustomProfileImage } from '@/components/Image/ImageComponent';
import { axiosPrivate } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function SeePostScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const { topicState } = useTopics();
    const topicTitle = topicState?.title;
    const postId = params.id as string;
    
    const [item, setItem] = useState<TopicFeedItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId || !topicState?.id) return;
            
            try {
                setLoading(true);
                const response = await axiosPrivate.get(`/users/me/topics/${topicState.id}/posts/${postId}/`);
                setItem(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Erro ao carregar post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, topicState?.id]);

    if (loading) {
        return (
            <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    if (error || !item) {
        return (
            <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>{error || 'Post não encontrado.'}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.fullScreenContainer, { paddingTop: insets.top}]}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
            </Pressable>
            <Text style={styles.sectionTitle}>{topicTitle}</Text>
            <View style={{ width: 24, height: 24 }} />
          </View>
          <View style={styles.postHeaderRow}>
              <View style={styles.profileSection}>
              <CustomProfileImage source={item.posterProfilePicUrl} fullName={item.posterName} style={{width:40, borderRadius: 20}}/>
              <Text style={styles.posterName}>{item.posterName}</Text>
              </View>
              <View >
                  <Text style={styles.hourText}>
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.dateText}>
                      {new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </Text>
              </View>
          </View>
        <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom }]} 
        showsVerticalScrollIndicator={false}
        >
        {item.contentText && <Text style={styles.contentText}>{item.contentText}</Text>}
        {item.contentPicUrl && <CustomImage source={item.contentPicUrl} style={styles.contentPic} />}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background[100],
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeaderRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.2,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.text[5],
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  contentArea: {
    gap: 16,
  },
  contentText: {
    textAlign: 'justify',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.text[5],
    lineHeight: 22,
  },
  contentPic: {
    width: '100%',
    height: undefined,
    aspectRatio: 16/9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.background[90],
    backgroundColor: Colors.light.background[90],
    resizeMode: 'cover',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hourText: {
    fontFamily:'Inter_500Medium',
    fontSize: 14,
    letterSpacing:0.5,
    color: Colors.light.text[30],
    textAlign: 'right',
  },
  dateText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    color: Colors.light.text[30],
    textAlign: 'right',
    marginTop: 2,
  },
});
