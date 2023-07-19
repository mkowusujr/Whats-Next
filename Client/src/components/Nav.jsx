import { Link, Outlet } from 'react-router-dom';
import '../sass/NavBar.scss';

export default function NavBar() {
  return (
    <>
      <header>
        <nav>
          <li>
            <Link to="/watchnext">
              <h1>Watch Next?</h1>
            </Link>
          </li>
          <li>
            <Link to="/readnext">
              <h1>Read Next?</h1>
            </Link>
          </li>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
