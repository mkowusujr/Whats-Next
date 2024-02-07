import { Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/common/NavBar';
import './sass/reset.scss';

function App() {
  const ReadNextPage = lazy(() => import('./pages/ReadNextPage'));
  const WatchNextPage = lazy(() => import('./pages/WatchNextPage'));
  const WhatsNextPage = lazy(() => import('./pages/WhatsNextPage'));
  const MediaItemPage = lazy(() => import('./pages/MediaItemPage'));
  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route
              path="/"
              element={
                <Suspense>
                  <WhatsNextPage />
                </Suspense>
              }
            />
            <Route
              path="watchnext"
              element={
                <Suspense>
                  <WatchNextPage />
                </Suspense>
              }
            />
            <Route
              path="readnext"
              element={
                <Suspense>
                  <ReadNextPage />
                </Suspense>
              }
            />
            <Route
              path="media"
              element={
                <Suspense>
                  <MediaItemPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
