import Login from "../views/Login";
import Signup from "../views/Signup";

const publicRoutes = [
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
];

export default publicRoutes;
