import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./Pages/About";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

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
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default appRouter;
