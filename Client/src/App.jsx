import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import NavBar from './components/utils/NavBar';
import ReadNextPage from './pages/ReadNextPage';
import WatchNextPage from './pages/WatchNextPage';
import WhatsNextPage from './pages/WhatsNextPage';
import './sass/reset.scss';

function App() {
  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
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
