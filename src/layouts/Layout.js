import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";

const Layout = () => {

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/edit", label: "Edit" },
    { to: "/login", label: "Login" },
    { to: "/*", label: "noPage" }
  ]

  return (
    <>
    <Header navigationLinks={ navigationLinks }></Header>
      <Outlet/>
      <Footer></Footer>
    </>
  )
};

export default Layout;