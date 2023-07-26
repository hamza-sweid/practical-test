import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './modules/auth/login';
import Users from './modules/users';
import { getMessage } from './utils/message';
import Notification from './components/notification';

const App = () => {
  const [message, setMessage] = useState(getMessage());

  useEffect(() => {
    const updateComponentState = () => {
      setMessage(getMessage());
    };

    window.addEventListener('messageUpdated', updateComponentState);

    return () => {
      window.removeEventListener('messageUpdated', updateComponentState);
    };
  }, []);

  return (
    <div className="App">
      <Notification message={message} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </div>
  );
};

export default App;
