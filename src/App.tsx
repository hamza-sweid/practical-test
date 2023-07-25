import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './modules/auth/login';
import Users from './modules/users';
import { getMessage } from './utils/message';
import { useEffect, useState } from 'react';
import Notification from './components/notification';

const App = () => {
  const [message, setMessage] = useState(getMessage());

  useEffect(() => {
    // Function to update the component state when the message variable changes
    const updateComponentState = () => {
      setMessage(getMessage());
    };

    // Add an event listener to call the updateComponentState function
    // whenever the message variable is updated
    window.addEventListener('messageUpdated', updateComponentState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('messageUpdated', updateComponentState);
    };
  }, []);

  return (
    <div className="App">
      <Notification message={message} />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/users" Component={Users} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </div>
  );
};

export default App;
