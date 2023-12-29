import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import WatchNextPage from './pages/WatchNext';
import ReadNextPage from './pages/ReadNext';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="watchnext" element={<WatchNextPage />} />
            <Route path="readnext" element={<ReadNextPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
