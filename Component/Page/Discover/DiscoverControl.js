import React from "react";
import { useStoreActions } from "easy-peasy";
import { Pressable, StyleSheet, Text, View } from "react-native";


const DiscoverControl = ({ rootNavigation, sessionCount = 0, sessionIndex = 0, prevPage = () => {}, nextPage = () => {} }) => {

	const setNavigationMode = useStoreActions((actions) => actions.setNavigationMode)

	return (
		<View style={styles.main}>
			<View style={styles.group}>
				<Pressable onPress={prevPage} style={{...styles.container, backgroundColor: '#f7f7f7', opacity: (sessionIndex == 0) ? 0.5 : 1}}>
					<Text style={styles.text}>Précedant</Text>
				</Pressable>

				<Pressable onPress={nextPage} style={{...styles.container, backgroundColor: '#5547b6'}}>
					<Text style={{...styles.text, color: 'white'}}>{
						(sessionIndex == sessionCount - 1) ? "Terminer" : "Suivant"
					}</Text>
				</Pressable>
			</View>

			<Pressable onPress={() => {
				setNavigationMode('modal')
				rootNavigation.navigate('Home')
			}} style={styles.leave}>
				<Text style={{...styles.text, paddingVertical: 10, color: 'white'}}>Quitter</Text>
			</Pressable>
		</View>
	)
}


const styles = StyleSheet.create({
	main: {
		flexDirection: 'column',
		marginBottom: 10
	},
	group: {
		marginHorizontal: 10,
		flexDirection: 'row'
	},
	container: {
		borderRadius: 10,
		flex: 1,
		marginHorizontal: 10
	},
	leave: {
		marginHorizontal: 20,
		marginTop: 20,
		backgroundColor: 'black',
		borderRadius: 10
	},
	text: {
		textAlign: "center",
		borderRadius: 20,
		fontSize: 16,
		fontWeight: '700',
		paddingVertical: 20,
		paddingHorizontal: 20
	}
})

export default DiscoverControl;