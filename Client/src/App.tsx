import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from '@/components/common/NavBar';
import ListPageSkeleton from './components/skeletons/ListPageSkeleton';
import WhatsNextPageSkeleton from './components/skeletons/WhatsNextPageSkeleton';

function App() {
  const ReadNextPage = lazy(() => import('@/pages/ReadNextPage'));
  const WatchNextPage = lazy(() => import('@/pages/WatchNextPage'));
  const WhatsNextPage = lazy(() => import('@/pages/WhatsNextPage'));
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
                <Suspense fallback={<WhatsNextPageSkeleton />}>
                  <WhatsNextPage />
                </Suspense>
              }
            />
            <Route
              path="watchnext"
              element={
                <Suspense fallback={<ListPageSkeleton />}>
                  <WatchNextPage />
                </Suspense>
              }
            />
            <Route
              path="readnext"
              element={
                <Suspense fallback={<ListPageSkeleton />}>
                  <ReadNextPage />
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
