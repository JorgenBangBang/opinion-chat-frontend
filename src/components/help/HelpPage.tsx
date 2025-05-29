import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HelpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('help.title')}
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('help.getStarted')}
        </Typography>
        <Typography paragraph>
          Dette er en midlertidig hjelpeside. Den fullstendige hjelpesiden vil bli implementert senere.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HelpPage;
