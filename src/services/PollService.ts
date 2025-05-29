import axios from 'axios';
import { Poll, PollOption, PollType } from '../types';

// API base URL - will be updated to point to the Azure backend
const API_URL = 'https://opinion-chat-api.azurewebsites.net';

// Poll service
class PollService {
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

  // Create new poll
  async createPoll(
    chatId: string, 
    question: string, 
    options: string[], 
    pollType: PollType = PollType.SINGLE_CHOICE,
    expiresAt?: string
  ): Promise<Poll> {
    try {
      const response = await axios.post(
        `${API_URL}/api/polls`,
        {
          chatId,
          question,
          options,
          pollType,
          expiresAt
        },
        this.getHeaders()
      );
      return response.data.poll;
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  }

  // Get poll by ID
  async getPoll(pollId: string): Promise<Poll> {
    try {
      const response = await axios.get(
        `${API_URL}/api/polls/${pollId}`,
        this.getHeaders()
      );
      return response.data.poll;
    } catch (error) {
      console.error(`Error fetching poll ${pollId}:`, error);
      throw error;
    }
  }

  // Get polls for a chat
  async getChatPolls(chatId: string): Promise<Poll[]> {
    try {
      const response = await axios.get(
        `${API_URL}/api/chats/${chatId}/polls`,
        this.getHeaders()
      );
      return response.data.polls;
    } catch (error) {
      console.error(`Error fetching polls for chat ${chatId}:`, error);
      throw error;
    }
  }

  // Vote on a poll
  async votePoll(pollId: string, optionId: string): Promise<Poll> {
    try {
      const response = await axios.post(
        `${API_URL}/api/polls/${pollId}/vote`,
        { optionId },
        this.getHeaders()
      );
      return response.data.poll;
    } catch (error) {
      console.error(`Error voting on poll ${pollId}:`, error);
      throw error;
    }
  }

  // Close poll
  async closePoll(pollId: string): Promise<Poll> {
    try {
      const response = await axios.put(
        `${API_URL}/api/polls/${pollId}/close`,
        {},
        this.getHeaders()
      );
      return response.data.poll;
    } catch (error) {
      console.error(`Error closing poll ${pollId}:`, error);
      throw error;
    }
  }

  // Delete poll
  async deletePoll(pollId: string): Promise<void> {
    try {
      await axios.delete(
        `${API_URL}/api/polls/${pollId}`,
        this.getHeaders()
      );
    } catch (error) {
      console.error(`Error deleting poll ${pollId}:`, error);
      throw error;
    }
  }
}

export default new PollService();
