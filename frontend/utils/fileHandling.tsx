import { axiosPrivate } from './api';
import { viewDocument } from '@react-native-documents/viewer';

export async function openFile(fileName: string, resourceId: string, fileId: string, topicId: string) {
    const response = await axiosPrivate.get(
        `/users/me/topics/${topicId}/resources/${resourceId}/files/${fileId}/download/`
    );
    const fileUrl = response.data.url;
    const fileUrl_base64 = btoa(fileUrl)
    const mimeType = response.data.mimeType;
    try {
        viewDocument({ uri: fileUrl_base64, mimeType: mimeType })
    } catch (error) {
        console.error('Error opening file:', error);
    }
}
