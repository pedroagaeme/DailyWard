import { ResourcesFeedItem } from '@/components/FeedArea/ResourcesFeedItem';
import { StyleSheet, View, Text, Pressable, ScrollView, Alert, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { useTopics } from '@/utils/topicsContext';
import { DefaultProfileIcon } from '@/components/DefaultProfileIcon';
import DownloadFileIcon from '@/assets/images/download-file-icon';
import * as FileSystem from 'expo-file-system';

export default function SeeResourceScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const { topicState } = useTopics();
    const topicTitle = topicState?.title;

    // Parse params to ResourcesFeedItem
    const item: ResourcesFeedItem | undefined = params && typeof params === 'object' ? {
        title: params.title as string,
        description: params.description as string,
        resourceType: params.resourceType as string,
        posterName: params.posterName as string,
        createdAt: params.createdAt as string,
        fileUrl: params.fileUrl as string,
        filename: params.filename as string,
        id: params.id as string,
    } : undefined;

    if (!item) {
        return (
        <View style={styles.centered}><Text>Recurso não encontrado.</Text></View>
        );
    }

    const handleDownload = async () => {
        if (!item.fileUrl) {
            Alert.alert('Erro', 'Nenhum arquivo disponível para download');
            return;
        }

        try {
            
            // Download the file to device storage
            const filename = item.filename || item.title;
            const fileExtension = getFileExtension(item.fileUrl);
            const fileUri = FileSystem.documentDirectory + filename + '.' + fileExtension;
            
            const downloadResult = await FileSystem.downloadAsync(item.fileUrl, fileUri);
            
            if (downloadResult.status === 200) {
                Alert.alert('Sucesso', 'Arquivo baixado com sucesso!');
            } else {
                Alert.alert('Erro', 'Falha ao baixar o arquivo');
            }
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Erro', 'Falha ao baixar o arquivo');
        }
    };

    const getFileExtension = (url: string) => {
        return url.split('.').pop() || 'file';
    };

    const getFileTypeText = (resourceType: string) => {
        switch (resourceType) {
            case 'file':
                return 'Arquivo';
            case 'image':
                return 'Imagem';
            case 'video':
                return 'Vídeo';
            case 'announcement':
                return 'Anúncio';
            default:
                return 'Arquivo';
        }
    };

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
              <DefaultProfileIcon fullName={item.posterName || 'Usuário'} viewStyleProps={{width:40}}/>
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
        contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom }]} 
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.resourceHeader}>
                <Text style={styles.resourceTitle}>{item.title}</Text>
                {item.description && (
                    <Text style={styles.descriptionText}>{item.description}</Text>
                )}
            </View>

            {item.fileUrl && (
                <View style={styles.fileCard}>
                    <View style={styles.fileDetail}>
                      <Text style={styles.fileCardTitle}>{getFileTypeText(item.resourceType || 'file')}</Text>
                      <View style={styles.fileInfo}>
                          <View style={styles.fileDetails}>
                              <Text style={styles.fileName} numberOfLines={2}>{item.filename || item.title}</Text>
                          </View>
                      </View>
                    </View>
                    <Pressable style={styles.downloadButton} onPress={handleDownload}>
                            <DownloadFileIcon width={28} height={28} />
                        </Pressable>
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
    paddingVertical: 12,
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
  fileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: Colors.light.background[100],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.background[80],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  fileDetail: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fileCardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[5],
    marginBottom: 12,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    gap: 20,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: Colors.light.text[30],
    marginBottom: 4,
  },
  fileType: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.text[30],
  },
  downloadButton: {
    padding: 8,
    borderRadius: 8,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
