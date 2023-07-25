import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './modules/auth/login';
import Users from './modules/users';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/users" Component={Users} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </div>
  );
};

export default App;
