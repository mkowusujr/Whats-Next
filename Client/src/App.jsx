import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import WatchNextPage from './pages/WatchNextPage';
import ReadNextPage from './pages/ReadNextPage';
import WhatsNextPage from './pages/WhatsNextPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<WhatsNextPage />} />
            <Route path="watchnext" element={<WatchNextPage />} />
            <Route path="readnext" element={<ReadNextPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
