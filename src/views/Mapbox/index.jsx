import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "./index.css";
// Solve the issue of broken marker image
import "./markerFix";

export default class Mapbox extends Component {
  state = {
    currentMarker:''
  }

  render() {
    return (
      <div id="mapbox">
        <MapContainer className='map-container' center={[1.353, 103.81]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[1.353, 103.81]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}
