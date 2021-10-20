import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import SvgHistory from "./Svg/SvgHistory";
import SvgRandom from "./Svg/SvgRandom";
import SvgTest from "./Svg/SvgTest";


const Suggestion = () => {

	const suggestions = [
		{
			name: "Last session",
			time: "5 minutes",
			logo: SvgHistory,
			color: '#ef786b'
		},
		{
			name: "Discover random",
			time: "10 minutes",
			logo: SvgRandom,
			color: '#5447b6'
		},
		{
			name: "Start a exam",
			time: "15 minutes",
			logo: SvgTest,
			color: '#e8915c'
		}
	]

	return (
		<View style={styles.main}>
			<Text style={styles.heading}>Recommended</Text>
			<ScrollView style={styles.container}>
				{suggestions.map(suggestion => <Pressable style={card.button}>
					<View style={{...card.imageContainer, backgroundColor: suggestion.color}}>
						<suggestion.logo style={card.image}></suggestion.logo>
					</View>
					<View style={card.view}>
						<Text style={card.heading}>{suggestion.name}</Text>
						<Text style={card.leading}>{suggestion.time}</Text>
					</View>
				</Pressable>)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		marginTop: 30
	},
	heading: {
		fontSize: 15,
		fontWeight: '800'
	},
	container: {
		height: '100%',
		marginTop: 16
	}
})

const card = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
		backgroundColor: '#f7f7f7'
	},
	view: {
		padding: 12
	},
	heading: {
		fontSize: 14,
		fontWeight: '700'
	},
	leading: {
		fontSize: 13,
		color: 'grey',
		fontWeight: '400'
	},
	imageContainer: {
		borderRadius: 10,
		padding: 12,
		margin: 10
	},
	image: {
		color: 'white',
		width: 20,
		height: 20
	}
})

export default Suggestion;