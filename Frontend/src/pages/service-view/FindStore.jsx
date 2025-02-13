import React from 'react'
import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter())
  return null
}

function MyMapComponent() {
  return (
    <MapContainer center={[21.142872, 72.771702]} zoom={13}>
      <MyComponent />
    </MapContainer>
  )
}
const FindStore = () => {
  return (
    <div className='pt-20'>FindStore
    <MyMapComponent/>
    </div>
  )
}

export default FindStore