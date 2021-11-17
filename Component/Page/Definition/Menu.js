import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Menu = ({ children }) => {

	const nth = React.Children.toArray(children)
	const [page, setPage] = useState(0)
	
	return (
		<View style={menu.view}>
			<View style={menu.onglet}>
				<Pressable style={menu.item} onPress={() => { setPage(0) }}>
					<Text style={{...menu.text, ...(page == 0) ? menu.active : {}}}>Definitions:</Text>
				</Pressable>

				{nth.length > 1 ? 	<Pressable style={menu.item} onPress={() => { setPage(1) }}>
					<Text style={{...menu.text, ...(page == 1) ? menu.active : {}}}>Synonymes:</Text>
				</Pressable>: null}
			</View>

			{nth[page]}
		
		</View>
	)
}


const menu = StyleSheet.create({
	active: {
		color: 'black',
		fontWeight: '600'
	},
	view: {
		flex: 1
	},
	onglet: {
		marginBottom: 20,
		marginTop: 30,
		marginHorizontal: 20,
		justifyContent: "space-around",
		flexDirection: 'row',
		paddingBottom: 10,
		borderBottomWidth: 0.2,
		borderColor: 'grey'
	},
	item: {
		borderColor: 'black',
		flex: 1
	},
	text: {
		color: 'grey',
		fontSize: 14,
		fontWeight: '300'
	}
})

export default Menu;