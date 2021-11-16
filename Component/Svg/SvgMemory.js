import React from "react"
import Svg, { Path } from "react-native-svg"

const SvgMemory = (props) => {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="sd-card"
      className="prefix__svg-inline--fa prefix__fa-sd-card prefix__fa-w-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M320 0H128L0 128v320c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM160 160h-48V64h48v96zm80 0h-48V64h48v96zm80 0h-48V64h48v96z"
      />
    </Svg>
  )
}

export default SvgMemory
