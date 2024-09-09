import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Edit from "./pages/edit/Edit";
import NoPage from "./pages/noPage/NoPage";
import Layout from "./layouts/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log("%c: env. from index ", "color: red;", process.env)


root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="edit" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);