import { useState } from 'react';
import './sass/App.scss';
import { usePalette } from 'react-palette';
import Media from './components/media/Media';

function App() {
  const [imgUrl, setImgUrl] = useState('');
  const imgUrlUtils = { imgUrl: imgUrl, setImgUrl: setImgUrl };
  const { data, loading, error } = usePalette(imgUrl);

  return (
    <>
      <div
        className="banner"
        style={{
          background: `linear-gradient(${data.vibrant}, rgb(255, 255, 255)`
        }}
      >
        <h1>Watch Next?</h1>
      </div>
      <Media imgUrlUtils={imgUrlUtils} />
    </>
  );
}

export default App;
