import React, { Component } from "react";
import L from "leaflet";
import "../node_modules/leaflet/dist/leaflet.css";
import "./App.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class App extends Component {
    componentDidMount() {
      var mymap = L.map("mapbox").setView([1.353, 103.81], 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: "pk.eyJ1IjoiMTMwNjU2MjkwMiIsImEiOiJja3pjMXNxZXIxdWV6MnBueHJleW05dWcxIn0.RqJpm-2ggMdK1lnVUPuEhw",
        }
      ).addTo(mymap);
    }
  render() {
    return (
      <div id="wrapper">
        <div id="mapbox"></div>
      </div>
    );
  }
}
