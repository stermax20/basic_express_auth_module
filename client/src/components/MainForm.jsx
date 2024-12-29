import React from 'react';

const MainForm = ({ username }) => {
  return (
    <div>
      <h1>환영합니다, {username}님!</h1>
      <p>메인 페이지에 오신 것을 환영합니다.</p>
    </div>
  );
};

export default MainForm;
