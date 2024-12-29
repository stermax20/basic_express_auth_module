import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignInForm.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      alert('로그인 실패. 다시 시도하세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
      <h1 className={styles.h1}>로그인</h1>
        <label className={styles.label}>아이디:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        로그인
      </button>
      <div>
        <Link to="/signup" className={styles.link}>
          계정이 없으신가요?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
