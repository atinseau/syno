
import React from "react"
import { ActivityIndicator } from "react-native";

const Loader = ({style = {}}) => {
	return (
		<ActivityIndicator size="large" style={{...style, flex: 1}}/>
	)
}

export default Loader;