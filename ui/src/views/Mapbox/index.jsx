import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import LocationMarker from "../MapComponents/LocationMarker";
import "../../../node_modules/leaflet/dist/leaflet.css";
import './mapbox.css'
import styles from "./index.module.css";
// Solve the issue of broken marker image
import "./markerFix";
import graphQLFetch from "../../browser/graphQLFetch";

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarker:this.props.currentMarker,
    };
    // this.showSideNav = this.showSideNav.bind(this);

    // this.setCurrentMarker = this.setCurrentMarker.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  // async fetchData() {
  //   const query = `mutation getMarkerByUser( $username: String!) {
  //     getMarkerByUser(
  //       username: $username
  //     ) { id username created_time
  //       content position is_public }
  //   }`;
  //   const data =  await graphQLFetch(query, { username:this.props.username }, null);
  //   if (data) {
  //     this.setState({ markers: data.getMarkerByUser });
  //     console.log(this.state.markers);
  //   }
  // }
  // async componentDidMount() {
  //  await this.fetchData();
  // }
  // componentWillReceiveProps(props) {
  //   const { addedMarker,delMarkerId } = this.props;
  //   // if (addedMarker) {
  //   //   const oldMarkers = this.state.markers;
  //   //   oldMarkers.push(addedMarker);
  //   //   this.setState({markers: oldMarkers});
  //   // }
  //   if (delMarkerId) {
  //     console.log("mapbox del marker", delMarkerId);
  //     const markers =[...this.props.markers];
  //     const newMarkers = markers.filter((e)=>{
  //       return e.id !== delMarkerId;
  //     });
  //     // this.setState({markers: newMarkers}); 
  //   }
  // }
  renderMarker = (data) => {
    const { position, id, username } = data
    return (username === this.props.username ?
      <Marker position={position} key={id} data={id}
            eventHandlers={{
              click: (e) => {
                const id = e.target.options.data;
                const marker = this.props.markers.find(marker => marker.id === id);
                console.log('marker clicked', marker);
                this.props.showMarkerContent(marker);
                this.props.setEditId(id)
              },
        }}><Popup>Current position is ({position[0]},{position[1]})</Popup>
      </Marker> :
      <Marker position={position} key={id} data={id} icon={greenIcon}
      eventHandlers={{
        click: (e) => {
          const id = e.target.options.data;
          const marker = this.props.markers.find(marker => marker.id === id);
          console.log('marker clicked', marker);
          this.props.showMarkerContent(marker);
        },
        }}>
        <Popup>Current position is ({position[0]},{position[1]}), visited by { username }</Popup>
      </Marker>)
  }
  getMarkers =  () => {
    const markers= this.props.markers 
    if (markers == null) {
      return null;
     }
    var items = markers.map((marker) => { return { id: marker.id, position: marker.position,username: marker.username } });
    if(!this.props.showOthers) {
      items = items.find(e => e.username === this.props.username);
      console.log("do not show others.")
    }
    console.log('items', items)
    return items.map((item,idx) => {
      return this.renderMarker(item)
    })
  }
  render() {
    const markers = this.getMarkers();
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
          <LocationMarker showSideNav={this.props.showSideNav} showNavOnly={this.props.showNavOnly} setEditFalse={this.props.setEditFalse}
            LMarker={this.props.LMarker} setLMarker={this.props.setLMarker}
            setCurrentMarker={this.props.setCurrentMarker} />
        </MapContainer>
      </div>
    );
  }
}
