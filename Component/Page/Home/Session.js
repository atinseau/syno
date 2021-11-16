
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgPlay } from '../../Svg'

const Session = ({ navigation, currentFeature }) => {

	return (
		<View style={{...styles.main, backgroundColor: currentFeature.color}}>
			<View>
				<View style={styles.header}>
					<Text style={styles.heading}>{currentFeature.title}</Text>
					<Text style={styles.leading}>{currentFeature.content}</Text>
				</View>

				<Pressable style={button.main}>
					<Pressable style={button.view} onPress={currentFeature.callback}>
						<Text style={button.text}>Commencez</Text>
						<SvgPlay style={button.svg}></SvgPlay>
					</Pressable>
				</Pressable>
			</View>

			<View style={styles.logo}>
				{currentFeature.svg ? <currentFeature.svg style={styles.svg}/> : null}
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	main: {
		borderRadius: 20,
		marginTop: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	header: {
		marginTop: 20,
		marginLeft: 20,
		paddingBottom: 26
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
	logo: {
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	svg: {
		width: 90,
		height: 90,
		color: 'white'
	}
})

const button = StyleSheet.create({
	main: {
		marginBottom: 20,
		marginLeft: 20,
		alignSelf: 'flex-start',
		backgroundColor: "white",
		flexDirection: 'row',
		borderRadius: 10
	},
	view: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		flexDirection: 'row'
	},
	svg: {
		color: 'black',
		width: 16,
		height: 16
	},
	text: {
		color: 'black',
		fontWeight: '500',
		fontSize: 12,
		marginRight: 10,
		alignSelf: 'flex-start'
	}
})

export default Session;