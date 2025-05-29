import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatService from '../services/ChatService';
import { useAuth } from './AuthContext';
import { Chat, Message, ChatParticipant } from '../types';

// Chat state interface
interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  participants: ChatParticipant[];
  loading: boolean;
  error: string | null;
}

// Chat context interface
interface ChatContextInterface {
  state: ChatState;
  socket: Socket | null;
  getChats: () => Promise<void>;
  getChat: (chatId: string) => Promise<void>;
  createChat: (name: string, description?: string) => Promise<Chat>;
  joinChat: (chatId: string) => Promise<void>;
  leaveChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string, fileUrl?: string, fileType?: string, fileName?: string) => Promise<void>;
  createPoll: (question: string, options: string[]) => Promise<void>;
  clearError: () => void;
}

// Initial chat state
const initialState: ChatState = {
  chats: [],
  currentChat: null,
  messages: [],
  participants: [],
  loading: false,
  error: null
};

// Create chat context
const ChatContext = createContext<ChatContextInterface | undefined>(undefined);

// Chat provider props
interface ChatProviderProps {
  children: ReactNode;
}

// Chat provider component
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, setState] = useState<ChatState>(initialState);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { state: authState } = useAuth();

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const newSocket = io(process.env.REACT_APP_API_URL || 'https://opinion-chat-api.azurewebsites.net', {
        auth: {
          token: localStorage.getItem('token' )
        }
      });

      setSocket(newSocket);

      // Socket event listeners
      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
        setState(prev => ({ ...prev, error: 'Connection error' }));
      });

      // Clean up on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [authState.isAuthenticated, authState.user]);

  // Add message listeners when current chat changes
  useEffect(() => {
    if (socket && state.currentChat) {
      // Join chat room
      socket.emit('joinRoom', state.currentChat.id);

      // Listen for new messages
      socket.on('newMessage', (message: Message) => {
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, message]
        }));
      });

      // Listen for participant updates
      socket.on('participantUpdate', (participants: ChatParticipant[]) => {
        setState(prev => ({
          ...prev,
          participants
        }));
      });

      // Clean up listeners when chat changes
      return () => {
        socket.off('newMessage');
        socket.off('participantUpdate');
        socket.emit('leaveRoom', state.currentChat.id);
      };
    }
  }, [socket, state.currentChat]);

  // Get all chats
  const getChats = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const chats = await ChatService.getChats();
      setState(prev => ({
        ...prev,
        chats,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch chats'
      }));
    }
  };

  // Get chat by ID
  const getChat = async (chatId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const chat = await ChatService.getChat(chatId);
      const messages = await ChatService.getChatMessages(chatId);
      const participants = await ChatService.getChatParticipants(chatId);
      
      setState(prev => ({
        ...prev,
        currentChat: chat,
        messages,
        participants,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch chat'
      }));
    }
  };

  // Create new chat
  const createChat = async (name: string, description?: string): Promise<Chat> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const chat = await ChatService.createChat(name, description);
      setState(prev => ({
        ...prev,
        chats: [...prev.chats, chat],
        loading: false
      }));
      return chat;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to create chat'
      }));
      throw error;
    }
  };

  // Join chat
  const joinChat = async (chatId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await ChatService.joinChat(chatId);
      getChats(); // Refresh chat list
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to join chat'
      }));
    }
  };

  // Leave chat
  const leaveChat = async (chatId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await ChatService.leaveChat(chatId);
      getChats(); // Refresh chat list
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to leave chat'
      }));
    }
  };

  // Send message
  const sendMessage = async (content: string, fileUrl?: string, fileType?: string, fileName?: string) => {
    if (!state.currentChat) {
      setState(prev => ({
        ...prev,
        error: 'No active chat'
      }));
      return;
    }

    try {
      const message = await ChatService.sendMessage(
        state.currentChat.id,
        content,
        fileUrl,
        fileType,
        fileName
      );

      // Optimistic update
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, message]
      }));

      // Socket will handle real-time update to all clients
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to send message'
      }));
    }
  };

  // Create poll
  const createPoll = async (question: string, options: string[]) => {
    if (!state.currentChat) {
      setState(prev => ({
        ...prev,
        error: 'No active chat'
      }));
      return;
    }

    try {
      await ChatService.createPoll(state.currentChat.id, question, options);
      // Poll will be added to messages via socket
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to create poll'
      }));
    }
  };

  // Clear error
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        socket,
        getChats,
        getChat,
        createChat,
        joinChat,
        leaveChat,
        sendMessage,
        createPoll,
        clearError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use chat context
export const useChat = (): ChatContextInterface => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
