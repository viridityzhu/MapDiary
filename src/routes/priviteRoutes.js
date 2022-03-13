import React from "react";
import Homepage from "../views/Homepage";

const priviteRoutes = [
    {
      path: "/home",
      element: <Homepage/>,
      role: 'users',
      backUrl:'/login'
    },
  ];
  
  export default priviteRoutes;