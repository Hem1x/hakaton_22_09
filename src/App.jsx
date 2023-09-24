import RealTime from './pages/RealTime';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import File from './pages/File';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 px-2 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/realtime" element={<RealTime />} />
            <Route path="/file" element={<File />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
