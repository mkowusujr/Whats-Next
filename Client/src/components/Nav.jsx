import { Link, Outlet } from 'react-router-dom';
import '../sass/NavBar.scss';
import { usePalette } from 'react-palette';
export default function NavBar(props) {
  const { data, loading, error } = usePalette(props.imgUrlUtils.imgUrl);

  return (
    <>
      <nav
        style={{
          backgroundColor: data.darkMuted
        }}
      >
        <ul>
          <li>
            <h1>
              <Link to="/">What's Next?</Link>
            </h1>
          </li>
          <li>
            <Link to="/watchnext">Watch Next?</Link>
          </li>
          <li>
            <Link to="/readnext">Read Next?</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
