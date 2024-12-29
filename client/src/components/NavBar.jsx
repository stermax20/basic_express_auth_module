import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
  };

  return (
    <nav>
      <div>
        <h2>Auth</h2>
      </div>
      <div>
        {user && (
          <button onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
