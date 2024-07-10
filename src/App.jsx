import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./About";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Homer";

const App = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default appRouter;
