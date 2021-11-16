

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgError } from "../Svg";

import { RED } from "@env"

const Error = ({msg = "Il y a une erreur..."}) => {
	return (
		<View style={styles.error}>
			<SvgError style={styles.svg}/>
			<Text style={styles.text}>{msg}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	error: {
		marginHorizontal: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	svg: {
		color: RED,
		width: 100,
		height: 100
	},
	text: {
		textAlign: 'center',
		marginTop: 15,
		fontSize: 25,
		fontWeight: '700'
	}
})

export default Error;