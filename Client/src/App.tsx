// import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MediaPage from './pages/MediaPage';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Toaster } from 'react-hot-toast';
// import NavBar from '@/components/DEPRICATED/common/NavBar';
// import ListPageSkeleton from './components/DEPRICATED/common/skeletons/ListPageSkeleton';
// import WhatsNextPageSkeleton from './components/DEPRICATED/common/skeletons/WhatsNextPageSkeleton';
// import FindNextPage from './pages/FindNextPage';

function App() {
  // const ReadNextPage = lazy(() => import('@/pages/ReadNextPage'));
  // const WatchNextPage = lazy(() => import('@/pages/WatchNextPage'));
  // const WhatsNextPage = lazy(() => import('@/pages/WhatsNextPage'));
  return (
    <>
      {/* <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div> */}
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Routes>
              {/* <Route path="/" element={<NavBar />}> */}
              <Route
                path="/"
                element={
                  // <Suspense fallback={<WhatsNextPageSkeleton />}>
                  <MediaPage />
                }
              />
              {/* <Route
              path="/"
              element={
                <Suspense fallback={<WhatsNextPageSkeleton />}>
                  <WhatsNextPage />
                </Suspense>
              }
            /> */}
              {/* <Route
              path="watchnext"
              element={
                <Suspense fallback={<ListPageSkeleton />}>
                  <WatchNextPage />
                </Suspense>
              }
            /> */}
              {/* <Route
              path="readnext"
              element={
                <Suspense fallback={<ListPageSkeleton />}>
                  <ReadNextPage />
                </Suspense>
              }
            /> */}
              {/* <Route path="findnext" element={<FindNextPage />} /> */}
              {/* </Route> */}
            </Routes>
          </QueryParamProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
