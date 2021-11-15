import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgBook } from "../../Svg";

const DiscoverHeader = ({ sessionCount = 0, sessionIndex = 0 }) => {
	return (
		<View style={styles.header}>
			<View style={{marginRight: 20}}>
				<Text style={styles.heading}>Session découverte</Text>
				<Text style={styles.leading}>{(sessionCount - (sessionIndex + 1) > 0) ? "Il vous reste " + (sessionCount - (sessionIndex + 1)) + " mots à découvrir": "Vous avez fini la session !" }</Text>
			</View>
			<SvgBook style={styles.svg}/>
		</View>
	)
}



const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 20,
		padding: 20,
		backgroundColor: '#5547b6',
	},
	heading: {
		color: "white",
		fontSize: 16,
		fontWeight: "800",
		marginBottom: 8
	},
	leading: {
		color: "white",
		fontSize: 13,
		fontWeight: "200"
	},
	svg: {
		
		width: 50,
		height: 50,
		color: 'white'
	}
})

export default DiscoverHeader;