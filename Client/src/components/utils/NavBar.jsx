import { Link, Outlet } from 'react-router-dom';

import '../../sass/nav.scss';

/**
 * Component representing the navigation bar for the application.
 *
 * @returns {JSX.Element} - The rendered NavBar component.
 */
export default function NavBar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">{`What's Next?`}</Link>
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
