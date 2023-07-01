import { useState } from 'react';
import './sass/App.scss';
import { usePalette } from 'react-palette';
import Media from './components/media/Media';

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
      <header>
        <h1 className="">Watch Next?</h1>
      </header>
      <Media imgUrlUtils={imgUrlUtils} />
    </>
  );
}

export default App;
