import React, { useState , useRef, useEffect} from 'react'
import {
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import * as L from "leaflet";
import { Button } from 'antd'
const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LocationMarker(props) {
  const newmarker = useRef();
  const [state, setState] = useState({position:null, popupText:"Create a diary"});
  // const [position, setPosition, popupbtn, setPopupbtn] = useState(null)
  
  // Reset LMarker when submit
  const { LMarker, setLMarker } = props
  useEffect(() => {
    if (!LMarker) {
      setState({position:null, popupText:"Create a diary"})
    }
  }, [LMarker])

  useMapEvents({
    click(e) {
        setState((prevState)=>{
          const newState = prevState;
          newState.position = e.latlng;
          return newState;
        })
        props.setCurrentMarker(e.latlng);
        setLMarker(true) // 开启LMarker
        // useEffect(() => {
          newmarker.current.openPopup();
        // },[]);
    },
  })
  
  const showEditArea = () => {
    if (state.popupText==="Create a diary"){
      props.showSideNav(true);
      props.setEditFalse();
      setState((prevState)=>{
        const newState = prevState;
        newState.popupText = "Cancel";
        return newState;
      })
    }else {
      props.showNavOnly(false);
      setLMarker(false)
      setState((prevState)=>{
        const newState = prevState;
        newState.popupText = "Create a diary";
        newState.position = null;
        return newState;
      })
    }
      
  }

  return !LMarker ? null : (
    <Marker position={state.position} ref={newmarker} icon={yellowIcon} >
      <Popup ><Button type='primary' onClick={()=> {showEditArea()}}>{state.popupText}</Button></Popup>
    </Marker>
  )
}
