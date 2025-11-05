import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage } from '@/components/CustomImage';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

export default function TopicInfoScreen() {
  const insets = useSafeAreaInsets();
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string || '';
  
  const { data: topicData, isLoading: topicLoading, isError, error, refetch } = useTopicInfo(topicId);
  
  useRefreshOnFocus(refetch);

  if (topicLoading) {
    return (
      <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (isError || !topicData) {
    return (
      <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>{error ? 'Erro ao carregar informações' : 'Tópico não encontrado.'}</Text>
      </View>
    );
  }

  const topic = topicData.data;
  const creationDate = topic.createdAt ? new Date(topic.createdAt) : null;

  return (
    <View style={styles.fullScreenContainer}>
      <ScreenHeader title="Informações do Tópico" />
      
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom + 20 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Image */}
        {topic.topicImageUrl && (
          <CustomImage 
            source={topic.topicImageUrl} 
            style={styles.topicImage}
            fallbackSource={require('@/assets/images/default-topic-image.png')}
          />
        )}

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{topic.title || 'Sem título'}</Text>
        </View>

        {/* Creation Date */}
        {creationDate && (
          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Data de criação</Text>
            <Text style={styles.dateText}>
              {creationDate.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </Text>
            <Text style={styles.timeText}>
              {creationDate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        )}

        {/* Description */}
        {topic.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Descrição</Text>
            <Text style={styles.descriptionText}>{topic.description}</Text>
          </View>
        )}

        {!topic.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.noDescriptionText}>Sem descrição disponível.</Text>
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
  },
  contentArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 24,
  },
  topicImage: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 16,
    backgroundColor: Colors.light.background[90],
    resizeMode: 'cover',
  },
  titleSection: {
    gap: 8,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    lineHeight: 36,
    color: Colors.light.text[5],
  },
  dateSection: {
    gap: 8,
    paddingTop: 8,
  },
  dateLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[30],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: Colors.light.text[5],
    lineHeight: 24,
  },
  timeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.text[30],
  },
  descriptionSection: {
    gap: 12,
    paddingTop: 8,
  },
  descriptionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[30],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
    textAlign: 'justify',
  },
  noDescriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[30],
    fontStyle: 'italic',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.light.text[30],
  },
});

