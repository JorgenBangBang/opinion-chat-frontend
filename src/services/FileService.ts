import axios from 'axios';

// API base URL - will be updated to point to the Azure backend
const API_URL = 'https://opinion-chat-api.azurewebsites.net';

// File service
class FileService {
  // Get auth token
  private getToken( ): string | null {
    return localStorage.getItem('token');
  }

  // Get headers with auth token
  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    };
  }

  // Upload file to chat
  async uploadFile(chatId: string, file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('chatId', chatId);

      const response = await axios.post(
        `${API_URL}/api/files/upload`,
        formData,
        {
          headers: {
            ...this.getHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Get file by ID
  async getFile(fileId: string): Promise<Blob> {
    try {
      const response = await axios.get(
        `${API_URL}/api/files/${fileId}`,
        {
          ...this.getHeaders(),
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching file ${fileId}:`, error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(fileId: string): Promise<void> {
    try {
      await axios.delete(
        `${API_URL}/api/files/${fileId}`,
        this.getHeaders()
      );
    } catch (error) {
      console.error(`Error deleting file ${fileId}:`, error);
      throw error;
    }
  }

  // Get file preview URL
  getFilePreviewUrl(fileId: string): string {
    return `${API_URL}/api/files/${fileId}/preview`;
  }

  // Get file download URL
  getFileDownloadUrl(fileId: string): string {
    return `${API_URL}/api/files/${fileId}/download`;
  }

  // Check if file is image
  isImage(fileType: string): boolean {
    return /^image\/(jpeg|jpg|png|gif|webp)$/i.test(fileType);
  }

  // Check if file is video
  isVideo(fileType: string): boolean {
    return /^video\/(mp4|mov|avi|wmv|flv|webm)$/i.test(fileType);
  }

  // Check if file is document
  isDocument(fileType: string): boolean {
    return /^application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)$/i.test(fileType);
  }

  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default new FileService();
