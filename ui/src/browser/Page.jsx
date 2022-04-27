import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import publicRoutes from "../routes/publicRoutes";
import privateRoutes from "../routes/priviteRoutes";
import AuthRoute from '../routes/authRoute'
import UserContext from './UserContext.js';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';



export default class Page extends React.Component {
  static async fetchData(cookie) {
    const query = `query { user {
      signedIn user_id user_name
    }}`;
    const data = await graphQLFetch(query, null, null, cookie);
    return data; // data = {user: [signedIn, user_id, user_name]}
  }

  constructor(props) {
    super(props);
    const user = store.userData ? store.userData.user : null;
    delete store.userData;
    this.state = { user };

    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData(); // data = {user: [signedIn, user_id, user_name]}
      console.log(data);
      this.setState({ user: data.user }); // user = {signedIn:False/True, user_id:xxx, user_name:xxx}
    }
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user == null) {
      alert('no user.');
      console.log('no user..');
     return null;
    }

    // user = {signedIn:False/True, user_id:xxx, user_name:xxx}
    return (
       <UserContext.Provider value={user}> 
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          
          {privateRoutes.map(
            (route) => <AuthRoute key={route.path} {...route}/>
          )}
          {publicRoutes.map(
            (route) => <AuthRoute key={route.path} {...route}/>
          )}
        </Routes>
      </UserContext.Provider>
      
    );
  }
}
/* {priviteRoutes.map(({ path, element, role, backUrl }) => {
            return role === 'users'
            ? <Route key={path} path={path} element={element} />
            : <Route key={path} path={path} element={<Navigate to={backUrl} />} />
          })}
          {publicRoutes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })} */