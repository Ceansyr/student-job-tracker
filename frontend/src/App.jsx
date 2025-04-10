import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobTracker from './pages/JobTracker';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobTracker />} />
      </Routes>
    </Router>
  );
}

export default App;