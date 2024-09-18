import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";
import TaskList from "../components/TaskList.js";

const Layout = () => {

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/edit", label: "Edit" },
    { to: "/login", label: "Login" }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header navigationLinks={ navigationLinks }></Header>
        <main className="flex-grow">
          <TaskList/>
          <Outlet/>
        </main>
      <Footer></Footer>
    </div>
  )
};

export default Layout;