import React from 'react'
import { RingLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"
    }}>
        <RingLoader color="#3498db"/>
    </div>
  )
}

export default Loader