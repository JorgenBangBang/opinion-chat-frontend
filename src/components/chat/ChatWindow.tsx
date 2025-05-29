import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useChat } from '../../contexts/ChatContext';
import { useTranslation } from 'react-i18next';

const ChatWindow: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { state, getChat } = useChat();
  const { t } = useTranslation();

  useEffect(() => {
    if (chatId && chatId !== 'list') {
      getChat(chatId);
    }
  }, [chatId, getChat]);

  if (state.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (chatId === 'list') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('chat.title')}
        </Typography>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography>
            {state.chats.length === 0 
              ? t('chat.noChats') 
              : `${state.chats.length} ${t('chat.title').toLowerCase()} ${t('app.loading')}`}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!state.currentChat) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('app.error')}
        </Typography>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography color="error">
            {state.error || 'Chat not found'}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {state.currentChat.name}
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1" gutterBottom>
          {state.currentChat.description || 'No description'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('chat.messages')}
        </Typography>
        {state.messages.length === 0 ? (
          <Typography>{t('chat.noMessages')}</Typography>
        ) : (
          state.messages.map((message) => (
            <Paper key={message.id} elevation={1} sx={{ p: 2, mb: 1 }}>
              <Typography variant="subtitle2">
                {message.userName} ({message.userRole})
              </Typography>
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(message.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default ChatWindow;
