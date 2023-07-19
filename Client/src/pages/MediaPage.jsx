import { useEffect } from 'react';
import Media from '../components/media/Media';

export default function MediaPage(props) {
  useEffect(() => {
    document.title = 'Watch Next?';
  }, []);

  return <Media imgUrlUtils={props.imgUrlUtils} />;
}
