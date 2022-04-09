import React, { useState } from 'react'
import {
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import { Button } from 'antd'

export default function LocationMarker() {
  const [position, setPosition] = useState(null)
  useMapEvents({
    click(e) {
        setPosition(e.latlng)
    },
  })
  const showEditArea = () => {
      console.log('111')
  }

  return position === null ? null : (
    <Marker position={position}>
      <Popup><Button type='primary' onClick={()=> {showEditArea()}}>Create a diary</Button></Popup>
    </Marker>
  )
}
