
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgSearch } from "../../Svg";

const Header = ({toggle}) => {
	return (
		<View style={styles.main}>
			<View>
				<Text style={styles.heading}>Choisir quoi</Text>
				<Text style={styles.leading}>faire aujourd'hui ?</Text>
			</View>
			<Pressable onPress={() => toggle(true)}>
				<SvgSearch style={styles.search} />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	heading: {
		color: "black",
		fontSize: 26
	},
	leading: {
		color: "black",
		fontSize: 28,
		fontWeight: '900'
	},
	search: {
		width: 30,
		height: 30,
		color: "black"
	}
});

export default Header;