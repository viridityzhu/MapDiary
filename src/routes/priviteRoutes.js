import Homepage from "../views/Homepage";

const priviteRoutes = [
    {
      path: "/home",
      element: <Homepage/>,
      role: 'user',
      backUrl:'/login'
    },
  ];
  
  export default priviteRoutes;