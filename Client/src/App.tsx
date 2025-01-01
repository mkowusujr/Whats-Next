import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MediaPage from './pages/MediaPage';
import {} from 'use-query-params';
import Providers from './components/shared/Providers';
import NavBar from './components/DEPRICATED/common/NavBar';
import { READ_NEXT_FILTER, WATCH_NEXT_FILTER } from './lib/utils';

function App() {
  return (
    <div className="font-lato">
      <BrowserRouter>
        <Providers>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<MediaPage mediaTypes={WATCH_NEXT_FILTER} />}
            />
            <Route
              path="/watchnext"
              element={<MediaPage mediaTypes={WATCH_NEXT_FILTER} />}
            />
            <Route
              path="/readnext"
              element={<MediaPage mediaTypes={READ_NEXT_FILTER} />}
            />
          </Routes>
        </Providers>
      </BrowserRouter>
    </div>
  );
}

export default App;
