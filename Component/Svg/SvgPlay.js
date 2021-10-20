import React from "react";
import Svg, { Path } from "react-native-svg"

const SvgPlay = (props) => {
	return (
		<Svg
			aria-hidden="true"
			data-prefix="fas"
			data-icon="play-circle"
			className="prefix__svg-inline--fa prefix__fa-play-circle prefix__fa-w-16"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			{...props}
		>
			<Path
				fill="currentColor"
				d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
			/>
		</Svg>
	)
}

export default SvgPlay;