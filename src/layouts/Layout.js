import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";

const Layout = () => {

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/edit", label: "Edit" },
    { to: "/login", label: "Login" }
  ]

  return (
    <div class="flex flex-col min-h-screen">
      <Header navigationLinks={ navigationLinks }></Header>
        <main class="flex-grow">
          <Outlet/>
        </main>
      <Footer></Footer>
    </div>
  )
};

export default Layout;