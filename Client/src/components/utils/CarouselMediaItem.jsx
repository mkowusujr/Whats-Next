import '../../sass/summary.scss';
import DialogComponent from './DialogComponent';

export default function CarouselMediaItem(props) {
  const media = props.item

  return (
    <div className="carousel-item">
      <img src={media.img}/>
      <div className='item-info'> 
        <h4>
          {media.title +
            (media.subTitle ? ' ' + media.subTitle : '') +
            ' | ' +
            media.mediaType}
        </h4>
        <>{props.showScore ? <p>Score: {media.score}</p> : <></>}</>
        <p>Storage: {media.storage}</p>
        <p>Status: {media.status}</p>
        <DialogComponent
          buttonText='View Summary'
          cmpnt={<div><p>{media.summary}</p></div>}
          onOpen={() => { }}
        />
      </div>
    </div>
  );
}
