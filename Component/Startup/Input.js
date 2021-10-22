


import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";


const Input = ({ 
	value = "", 
	title = "Title", 
	placeholder = "Placeholder", 
	type= "email-address", 
	style = {}, 
	onChange = () => {},
	onFocus = () => {}, 
	onBlur = () => {}
}) => {
	return (
		<View style={{...styles.main, ...style}}>
			<Text style={styles.heading}>{title}</Text>
			<TextInput
			value={value}
			placeholder={placeholder}
			keyboardType={type}
			autoCapitalize={'none'}
			autoCorrect={false}
			returnKeyType="done"
			onFocus={onFocus}
			onBlur={onBlur}
			onChangeText={onChange} />
		</View>
	)
}


const styles = StyleSheet.create({
	main: {
		width: '100%',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#f6f6f6',
		marginBottom: 14
	},
	heading: {
		marginBottom: 6,
		fontSize: 12,
		color: 'grey'
	}
})

export default Input;