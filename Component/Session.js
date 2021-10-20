

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SvgBook from './Svg/SvgBook'
import SvgPlay from './Svg/SvgPlay'

const Session = () => {
	return (<View style={styles.main}>
		<View>
			<View style={styles.header}>
				<Text style={styles.heading}>Vocabulary</Text>
				<Text style={styles.leading}>Listen 20 new words</Text>
			</View>

			<Pressable style={button.main}>
				<View style={button.view}>
					<Text style={button.text}>Start</Text>
					<SvgPlay style={button.svg}></SvgPlay>
				</View>
			</Pressable>
		</View>

		<View style={styles.logo}>
			<SvgBook style={styles.svg}></SvgBook>
		</View>

	</View>)
}

const styles = StyleSheet.create({
	main: {
		borderRadius: 20,
		marginTop: 30,
		backgroundColor: "#5547b6",
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
		marginBottom: 10
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
		fontWeight: '500',
		fontSize: 12,
		marginRight: 10,
		alignSelf: 'flex-start'
	}
})

export default Session;