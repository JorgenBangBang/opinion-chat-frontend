import axios from 'axios';
import { Chat, Message, ChatParticipant, Poll } from '../types';

// API base URL - will be updated to point to the Azure backend
const API_URL = 'https://opinion-chat-api.azurewebsites.net';

// Chat service
class ChatService {
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

  // Get all chats
  async getChats(): Promise<Chat[]> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats`,
        this.getHeaders()
      );
      return response.data.chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }

  // Get chat by ID
  async getChat(chatId: string): Promise<Chat> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats/${chatId}`,
        this.getHeaders()
      );
      return response.data.chat;
    } catch (error) {
      console.error(`Error fetching chat ${chatId}:`, error);
      throw error;
    }
  }

  // Create new chat
  async createChat(name: string, description?: string): Promise<Chat> {
    try {
      const response = await axios.post(
        `${API_URL}/api/chats`,
        { name, description },
        this.getHeaders()
      );
      return response.data.chat;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  // Join chat
  async joinChat(chatId: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/api/chats/${chatId}/join`,
        {},
        this.getHeaders()
      );
    } catch (error) {
      console.error(`Error joining chat ${chatId}:`, error);
      throw error;
    }
  }

  // Leave chat
  async leaveChat(chatId: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/api/chats/${chatId}/leave`,
        {},
        this.getHeaders()
      );
    } catch (error) {
      console.error(`Error leaving chat ${chatId}:`, error);
      throw error;
    }
  }

  // Get chat messages
  async getChatMessages(chatId: string): Promise<Message[]> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats/${chatId}/messages`,
        this.getHeaders()
      );
      return response.data.messages;
    } catch (error) {
      console.error(`Error fetching messages for chat ${chatId}:`, error);
      throw error;
    }
  }

  // Get chat participants
  async getChatParticipants(chatId: string): Promise<ChatParticipant[]> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats/${chatId}/participants`,
        this.getHeaders()
      );
      return response.data.participants;
    } catch (error) {
      console.error(`Error fetching participants for chat ${chatId}:`, error);
      throw error;
    }
  }

  // Send message
  async sendMessage(
    chatId: string,
    content: string,
    fileUrl?: string,
    fileType?: string,
    fileName?: string
  ): Promise<Message> {
    try {
      const response = await axios.post(
        `${API_URL}/api/chats/${chatId}/messages`,
        {
          content,
          fileUrl,
          fileType,
          fileName
        },
        this.getHeaders()
      );
      return response.data.message;
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}:`, error);
      throw error;
    }
  }

  // Create poll
  async createPoll(
    chatId: string,
    question: string,
    options: string[]
  ): Promise<Poll> {
    try {
      const response = await axios.post(
        `${API_URL}/api/chats/${chatId}/polls`,
        {
          question,
          options
        },
        this.getHeaders()
      );
      return response.data.poll;
    } catch (error) {
      console.error(`Error creating poll in chat ${chatId}:`, error);
      throw error;
    }
  }

  // Vote on poll
  async votePoll(pollId: string, optionId: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/api/polls/${pollId}/vote`,
        { optionId },
        this.getHeaders()
      );
    } catch (error) {
      console.error(`Error voting on poll ${pollId}:`, error);
      throw error;
    }
  }

  // Download chat log
  async downloadChatLog(chatId: string): Promise<Blob> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats/${chatId}/log`,
        {
          ...this.getHeaders(),
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error downloading chat log for ${chatId}:`, error);
      throw error;
    }
  }
}

export default new ChatService();
