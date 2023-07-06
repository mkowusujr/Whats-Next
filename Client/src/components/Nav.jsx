import { Link, Outlet } from "react-router-dom";

export default function Layout() {
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
