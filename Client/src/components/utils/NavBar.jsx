import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <nav>
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
