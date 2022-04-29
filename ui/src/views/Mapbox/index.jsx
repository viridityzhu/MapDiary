import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "../MapComponents/LocationMarker";
import "../../../node_modules/leaflet/dist/leaflet.css";
import './mapbox.css'
import styles from "./index.module.css";
// Solve the issue of broken marker image
import "./markerFix";
import graphQLFetch from "../../browser/graphQLFetch";


const dataArr = [
  {
    id:0,
    position:[1.353, 103.81]
  },
  {
    id:1,
    position:[1.362, 103.83]
  },
  {
    id:2,
    position:[1.373, 103.76]
  },
  {
    id:3,
    position:[1.333,103.75]
  },

]
export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarker:'',
      showOthersPins: false,
      markers:null
    };
    // this.showSideNav = this.showSideNav.bind(this);

    // this.setCurrentMarker = this.setCurrentMarker.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const query = `mutation getMarkerByUser( $username: String!) {
      getMarkerByUser(
        username: $username
      ) { id username created_time
        content position is_public }
    }`;
    const data =  await graphQLFetch(query, { username:this.props.username }, null);
    if (data) {
      this.setState({ markers: data.getMarkerByUser });
      console.log(this.state.markers);
    }
  }
  renderMarker = (data) => {
    const {position,id} = data
    return <Marker position={position} key = {id}>
      <Popup>Current position is ({position[0]},{position[1]})</Popup>
    </Marker>
  }
  getMarkers =  () => {
    const markers= this.state.markers 
    if (markers == null) {
      return null;
     }
    const items = markers.map((marker)=>{return {id:marker.id, position:marker.position}});
    return items.map((item,idx) => {
      return this.renderMarker(item)
    })
  }
  render() {
    const markers = this.getMarkers(this.state.showOthersPins);
    if (markers == null) {
     return null;
    }
    return (
      <div id="mapbox">
        <MapContainer className={styles['map-container']} center={[1.353, 103.81]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[1.353, 103.81]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          {markers}
          <LocationMarker showSideNav={this.props.showSideNav} setCurrentMarker={this.props.setCurrentMarker}/>
        </MapContainer>
      </div>
    );
  }
}
