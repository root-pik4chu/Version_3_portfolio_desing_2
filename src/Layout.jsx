import { Outlet, Link, NavLink } from "react-router-dom";
import DataTime from "./Components/DataTime";

function Layout() {
  return (
    <div className="flex flex-col bg-zinc-50">
      <header className=" text-zinc-700 flex items-center justify-center w-full ">
        <nav className="fixed top-[2vh] flex justify-between items-center  w-[98%]">
          <div className="text-md  h-full w-full">
            <Link to="/" className="" >
            <div className="">SAHIL SAUNDALE’2025</div>
            <div className=""><DataTime /></div>
            </Link>
          </div>
          <div className=" h-full w-full"></div>
          <ul className="flex justify-end ">
            <li>
              <NavLink
                to="/"
                className=""
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className=""
              >
                About
              </NavLink>
            </li>
            
          </ul>
        </nav>
      </header>

      <main className="">
        <Outlet />
      </main>

      
    </div>
  );
}

export default Layout;
