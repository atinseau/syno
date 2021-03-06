import React from "react"
import Svg, { Path } from "react-native-svg"

const SvgCheckBookMark = (props) => {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="bookmark"
      className="prefix__svg-inline--fa prefix__fa-bookmark prefix__fa-w-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
      />
    </Svg>
  )
}

export default SvgCheckBookMark;
