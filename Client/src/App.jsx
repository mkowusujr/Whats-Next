import { useState } from 'react';
import { usePalette } from 'react-palette';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import WatchNextPage from './pages/WatchNext';
import ReadNextPage from './pages/ReadNext';
function App() {
  return <>
    {/* < WatchNextPage /> */}
    <ReadNextPage/>
    {/* <MediaList mediaTypes={bookTypes} /> */}
  </>
}

function AppOld() {
  const [imgUrl, setImgUrl] = useState(
    'https://m.media-amazon.com/images/M/MV5BNjFmNWYzZjMtYWIyZi00NDVmLWIxY2EtN2RiMjZiMDk4MzcyXkEyXkFqcGdeQXVyMTg2NjYzOA@@._V1_.jpg'
  );
  const imgUrlUtils = { imgUrl: imgUrl, setImgUrl: setImgUrl };
  const { data, loading, error } = usePalette(imgUrl);

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <div
        className="banner"
        style={{
          background: `linear-gradient(${data.vibrant}, rgb(255, 255, 255)`
        }}
      ></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar imgUrlUtils={imgUrlUtils} />}>
            <Route
              path="/"
              element={<SummaryPage imgUrlUtils={imgUrlUtils} />}
            />
            <Route
              path="watchnext"
              element={<MediaPage imgUrlUtils={imgUrlUtils} />}
            />
            <Route
              path="readnext"
              element={<BooksPage imgUrlUtils={imgUrlUtils} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
