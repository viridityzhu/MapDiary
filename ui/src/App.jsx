import React, { Component } from "react";
// import { Routes } from "react-router-dom";
import styles from "./App.module.css";
import store from './browser/store';
import Page from './browser/Page.jsx';
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
store.initialData = window.__INITIAL_DATA__;
store.userData = window.__USER_DATA__;
export default class App extends Component {

  render() {
    return (
      <div className={styles["app-wrapper"]}>
          <Page />
      </div>
    );
  }
}
