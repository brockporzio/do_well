import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
    <Header></Header>
      <nav>
        <ul> 
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      <Footer></Footer>
    </>
  )
};

export default Layout;