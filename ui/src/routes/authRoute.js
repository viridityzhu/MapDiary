import React,{ useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../browser/UserContext';
function AuthRoute(props) {
    const user = useContext(UserContext);
    console.log("user signedIn:");
    console.log(user.signedIn);
    // user = {signedIn:False/True, user_id:xxx, user_name:xxx}
    const { // path, element, role, backUrl

        role,
        backUrl} = props;
    // 如果用户有权限，就渲染对应的路由
    if (role && user.signedIn) {
        console.log('verified user.');
        return <Outlet/>
    } else {
        console.log('back to backurl.');
        console.log(backUrl);
        // 如果没有权限，返回配置的默认路由
        return <Navigate to={backUrl} />
    }
  }
  
  export default AuthRoute;
