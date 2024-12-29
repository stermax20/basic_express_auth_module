import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import MainForm from '../components/MainForm';
import NavBar from '../components/NavBar';

const MainPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <NavBar />
      <MainForm username={user.username} />
    </>
  );
};

export default MainPage;
