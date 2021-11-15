import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { api } from "../../../store";
import { SvgHistory, SvgRandom, SvgTest, SvgSetting } from "../../Svg";


const Suggestion = ({ rootNavigation }) => {

	const navigation = useNavigation()

	const suggestions = [
		{
			name: "La dernière session",
			time: "5 minutes",
			logo: SvgHistory,
			color: '#ef786b'
		},
		{
			name: "Mot aléatoire",
			callback: async () => {
				const word = await api.getWord()
				navigation.navigate("definition", { id: word.id })
			},
			time: "1 minutes",
			logo: SvgRandom,
			color: '#5447b6'
		},
		{
			name: "L'heure du test",
			time: "15 minutes",
			logo: SvgTest,
			color: '#e8915c'
		},
		{
			name: "Réglage utilisateur",
			callback: () => {
				rootNavigation.navigate('Settings')
			},
			time: "1 minutes",
			logo: SvgSetting,
			color: "#a1bce9"
		}
	]

	return (
		<View style={styles.main}>
			<Text style={styles.heading}>Recommendation</Text>
			<ScrollView style={styles.container}>
				{suggestions.map((suggestion, index) => <Pressable style={card.button} key={index} onPress={() => 
				(typeof suggestion.callback == 'function') ? suggestion.callback() : null }>
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
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
		backgroundColor: '#f7f7f7'
	},
	view: {
		padding: 12
	},
	heading: {
		color: 'black',
		fontSize: 14,
		fontWeight: '700'
	},
	leading: {
		color: 'black',
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