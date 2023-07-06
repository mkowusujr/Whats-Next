import { useState } from 'react';
import './sass/App.scss';
import { usePalette } from 'react-palette';
// import Media from './components/media/Media';
import MediaPage from './pages/MediaPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import Layout from './components/Nav';
function App() {
  const [imgUrl, setImgUrl] = useState(
    'https://m.media-amazon.com/images/M/MV5BNjFmNWYzZjMtYWIyZi00NDVmLWIxY2EtN2RiMjZiMDk4MzcyXkEyXkFqcGdeQXVyMTg2NjYzOA@@._V1_.jpg'
  );
  const imgUrlUtils = { imgUrl: imgUrl, setImgUrl: setImgUrl };
  const { data, loading, error } = usePalette(imgUrl);

  return (
    <>
      <div
        className="banner"
        style={{
          background: `linear-gradient(${data.vibrant}, rgb(255, 255, 255)`
        }}
      ></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route
            path="watchnext"
            element={<MediaPage imgUrlUtils={imgUrlUtils} />}
          />
          <Route
            path="readnext"
            element={<BooksPage imgUrlUtils={imgUrlUtils} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
