import { Link, Outlet } from 'react-router-dom';

/** Component representing the navigation bar for the application. */
export default function NavBar() {
  return (
    <>
      <nav className="sticky top-0 z-20 flex w-full bg-slate-800/90 p-2 px-2 text-white shadow-md backdrop-blur-lg">
        <div className="flex-1 ">
          <Link className="text-2xl" to="/">{`What's Next?`}</Link>
        </div>
        <ul className=" ml-auto flex gap-4 text-xl">
          <li className="">
            <Link to="/watchnext">Watch Next?</Link>
          </li>
          <li className="">
            <Link to="/readnext">Read Next?</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
