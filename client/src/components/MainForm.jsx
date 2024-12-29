import React from 'react';
import styles from './MainForm.module.css';

const MainForm = ({ username }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>환영합니다, {username}님!</h1>
      <p className={styles.paragraph}>메인 페이지에 오신 것을 환영합니다.</p>
    </div>
  );
};

export default MainForm;
