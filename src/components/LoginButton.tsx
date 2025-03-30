import React from 'react';
import { Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/slices/authSlice';

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const handleAuth = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(login({ id: '1', name: 'User' }));
    }
  };

  return (
    <Button 
      title={isAuthenticated ? 'Logout' : 'Login'} 
      onPress={handleAuth} 
    />
  );
};

export default LoginButton;