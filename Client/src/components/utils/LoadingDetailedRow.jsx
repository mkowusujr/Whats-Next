import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../sass/media/MediaRow.scss';

export default function LoadingDetailedRow() {
  const DefaultMediaRow = (
    <tr className="media-row-dafault">
      <td>
        <Skeleton variant="rectangular" width={130} height={192} />
      </td>
      <td className="media-info">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="rectangular" width={220} height={30} />
          <Skeleton variant="rectangular" width={141} height={25} />
        </div>
        <Skeleton variant="rectangular" width={202} height={35} />
        <Skeleton variant="rectangular" width={300} height={35} />
        <Skeleton variant="rectangular" width={400} height={35} />
        <Skeleton variant="rectangular" width={300} height={35} />
      </td>
      <td>
        <div className="media-options">
          <Skeleton variant="rectangular" width={121} height={24} />
          <Skeleton variant="rectangular" width={121} height={24} />
          <Skeleton variant="rectangular" width={121} height={24} />
        </div>
      </td>
    </tr>
  );

  const MobileMediaRow = (
    <tr className="media-row-mobile">
      <td className="col-1">
        <Skeleton variant="rectangular" width={145} height={24} />
      </td>
      <td colSpan={2}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton
            style={{ marginInline: '0.5em' }}
            variant="rectangular"
            width={110}
            height={24}
          />
          <Skeleton
            style={{ marginInline: '0.5em' }}
            variant="rectangular"
            width={110}
            height={24}
          />
          <Skeleton
            style={{ marginInline: '0.5em' }}
            variant="rectangular"
            width={110}
            height={24}
          />
          <Skeleton
            style={{ marginInline: '0.5em' }}
            variant="rectangular"
            width={110}
            height={24}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {DefaultMediaRow}
      {MobileMediaRow}
    </>
  );
}
