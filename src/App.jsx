import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import priviteRoutes from "./routes/priviteRoutes";
import styles from "./App.module.css";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class App extends Component {
  render() {
    return (
      <div className={styles["app-wrapper"]}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {priviteRoutes.map(({ path, element, role, backUrl }) => {
            return role === 'users'
            ? <Route key={path} path={path} element={element} />
            : <Route key={path} path={path} element={<Navigate to={backUrl} />} />
          })}
          {publicRoutes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>
      </div>
    );
  }
}
