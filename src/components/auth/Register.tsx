import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { UserRole } from '../../types';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PARTICIPANT);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const { state, register, clearError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as UserRole);
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(t('auth.passwordMismatch'));
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError(t('auth.passwordTooShort'));
      return false;
    }
    
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validatePassword()) {
      return;
    }
    
    try {
      await register(email, password, firstName, lastName, role);
      navigate('/chat/list');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('app.name')}
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            {t('auth.register')}
          </Typography>
          
          {state.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {state.error}
            </Alert>
          )}
          
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={t('auth.firstName')}
              name="firstName"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={state.loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={t('auth.lastName')}
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={state.loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('auth.email')}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state.loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('auth.password')}
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={state.loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t('auth.confirmPassword')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={state.loading}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">{t('auth.role')}</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label={t('auth.role')}
                onChange={handleRoleChange}
                disabled={state.loading}
              >
                <MenuItem value={UserRole.PARTICIPANT}>{t('role.participant')}</MenuItem>
                <MenuItem value={UserRole.OBSERVER}>{t('role.observer')}</MenuItem>
                <MenuItem value={UserRole.MODERATOR}>{t('role.moderator')}</MenuItem>
                <MenuItem value={UserRole.ADMIN}>{t('role.admin')}</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={state.loading}
            >
              {state.loading ? <CircularProgress size={24} /> : t('auth.register')}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                {t('auth.hasAccount')}{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  {t('auth.login')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
