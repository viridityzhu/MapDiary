import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../browser/UserContext';

class AuthRoute extends React.Component {

  render() {
    const user = this.context; 
    // user = {signedIn:False/True, user_id:xxx, user_name:xxx}
    const { // path, element, role, backUrl
      role: routeRole,
      backUrl,
      ...otherProps
    } = this.props;
    // 如果用户有权限，就渲染对应的路由
    if (routeRole && user.signedIn) {
        return <Route {...otherProps} />
    } else {
        // 如果没有权限，返回配置的默认路由
        return <Navigate to={backUrl} />
    }
  }
}
AuthRoute.contextType = UserContext;
export default AuthRoute;