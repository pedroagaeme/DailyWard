import { View, Text, Pressable, StyleSheet } from 'react-native';
import { openFile } from '@/services/fileHandling';
import { Colors } from '@/constants/Colors';
import { ResourceFile } from '@/types';

export function FileCard({ 
    file, 
    onPress, 
    resourceId, 
    fileId, 
    topicId 
}: { 
    file: ResourceFile; 
    onPress?: () => void;
    resourceId?: string;
    fileId?: string;
    topicId?: string;
}) {

    const getFileTypeFromMime = (mimeType?: string) => {
        if (!mimeType) return 'Arquivo';
        
        if (mimeType.startsWith('image/')) return 'Imagem';
        if (mimeType.startsWith('video/')) return 'Vídeo';
        if (mimeType.startsWith('audio/')) return 'Áudio';
        if (mimeType.includes('pdf')) return 'PDF';
        if (mimeType.includes('word') || mimeType.includes('document')) return 'Documento';
        if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Planilha';
        if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'Apresentação';
        
        return 'Arquivo';
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            openFile(file.filename, resourceId!, fileId!, topicId!);
        }
    };

    return (
        <Pressable style={styles.fileCard} onPress={handlePress}>
            <View style={styles.fileDetail}>
                <Text style={styles.fileCardTitle}>{getFileTypeFromMime(file.mimeType)}</Text>
                <View style={styles.fileInfo}>
                    <View style={styles.fileDetails}>
                        <Text style={styles.fileName} numberOfLines={2}>{file.filename}</Text>
                        {file.fileSize && (
                            <Text style={styles.fileSize}>{formatFileSize(file.fileSize)}</Text>
                        )}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
      fileSize: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: Colors.light.text[30],
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
});