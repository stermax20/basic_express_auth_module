import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await signUp(username, password);
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/signin');
    } catch (err) {
      alert('회원가입 실패. 다시 시도하세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
      <h1 className={styles.h1}>회원가입</h1>
        <label className={styles.label}>아이디:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label className={styles.label}>비밀번호 확인:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        회원가입
      </button>
      <div>
        <Link to="/signin" className={styles.link}>
          이미 계정이 있으신가요?
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
