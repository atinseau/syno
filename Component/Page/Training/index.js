

import React from "react"
import { StyleSheet, Text, View } from 'react-native'
import Input from "../../Startup/Input"


const Training = () => {
	return (
		<View style={styles.view}>
			
			<Input viewStyle={styles.inputView}/>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'black',
		padding: 20,
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
	},
	intputView: {

	}
})



export default Training;