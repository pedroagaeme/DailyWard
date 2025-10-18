import { ResourcesFeedItem } from '@/components/FeedArea/ResourcesFeedItem';
import { StyleSheet, View, Text, Pressable, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { useTopics } from '@/utils/topicsContext';
import { CustomProfileImage } from '@/components/Image/ImageComponent';
import { FileCard } from '@/components/FileCard';
import { axiosPrivate } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function SeeResourceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { topicState } = useTopics();
  const topicTitle = topicState?.title;
  const resourceId = params.id as string;
  
  const [item, setItem] = useState<ResourcesFeedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      if (!resourceId || !topicState?.id) return;
      
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/users/me/topics/${topicState.id}/resources/${resourceId}/`);
        setItem(response.data);
      } catch (err) {
        console.error('Error fetching resource:', err);
        setError('Erro ao carregar recurso');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId, topicState?.id]);

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
        <Text>{error || 'Recurso não encontrado.'}</Text>
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
        
        <View style={styles.resourceHeaderRow}>
            <View style={styles.profileSection}>
            <CustomProfileImage 
              source={item.posterProfilePicUrl}
              fullName={item.posterName || 'Usuário'}
              style={{width: 40, borderRadius: 20}}
            />
            <Text style={styles.posterName}>{item.posterName || 'Usuário'}</Text>
            </View>
            <View >
                <Text style={styles.hourText}>
                    {new Date(item.createdAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.dateText}>
                    {new Date(item.createdAt || '').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
            </View>
        </View>

      <ScrollView 
      style={{ flex: 1 }} 
      contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom + 20}]} 
      showsVerticalScrollIndicator={false}
      >
          <View style={styles.resourceHeader}>
              <Text style={styles.resourceTitle}>{item.title}</Text>
              {item.description && (
                  <Text style={styles.descriptionText}>{item.description}</Text>
              )}
          </View>

           {item.files && item.files.length > 0 && (
             <View style={styles.filesContainer}>
               {item.files.map((file, index) => (
                 <FileCard 
                   key={index} 
                   file={file} 
                   resourceId={item.id}
                   fileId={file.id.toString()}
                   topicId={topicState?.id}
                 />
               ))}
             </View>
           )}
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
  resourceHeaderRow: {
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
    gap: 20,
  },
  resourceHeader: {
    gap: 12,
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.light.text[5],
  },
  descriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.light.text[5],
    lineHeight: 24,
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
  filesContainer: {
    marginTop: 12,
    gap: 12,
  },
  filesTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    marginBottom: 8,
  },
});
