import React from "react"
import Svg, { Path } from "react-native-svg"

const SvgStop = (props) =>  {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="stop"
      className="prefix__svg-inline--fa prefix__fa-stop prefix__fa-w-14"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
      />
    </Svg>
  )
}

export default SvgStop
