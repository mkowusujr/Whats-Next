import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MediaPage from './pages/MediaPage';
import {} from 'use-query-params';
import Providers from './components/shared/Providers';

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          {/* <Route path="/" element={<NavBar />}> */}
          <Route path="/" element={<MediaPage />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
