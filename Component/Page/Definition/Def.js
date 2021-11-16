import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Error from "../../Tool/Error";

import { YELLOW } from "@env"

const Def = ({ definitions = [], catgram = "", originDef = "" }) => {
	return (
		<View style={styles.body}>
			<View style={styles.view}>
				<Text style={styles.heading}>Definition:</Text>
				<Text style={{...styles.leading, marginTop: 8}}>{catgram}</Text>
				<Text style={styles.leading}>{originDef}</Text>
			</View>

			<ScrollView style={styles.defs}>
				{!definitions.length ? <Error msg="aucune définition"/>: definitions.map((def, index) => <Text key={index} style={
					(def.type == "text" ? styles.def : styles.section)
				}>
					{def.content}
				</Text>)} 

			</ScrollView>
		</View>
	)
}


const styles = StyleSheet.create({
	body: {
		flex: 1,
		marginHorizontal: 20
	},
	view: {
		borderRadius: 20,
		backgroundColor: YELLOW,
		padding: 20
	},
	heading: {
		color: 'white',
		fontWeight: '800',
		fontSize: 24
	},
	leading: {
		color: 'white',
		fontWeight: '300',
		marginBottom: 0
	},
	section: {
		fontSize: 20,
		marginTop: 20,
		marginBottom: 10,
		fontWeight: '700',
		color: 'black'
	},
	defs: {
		flex: 1,
		marginTop: 20,
		marginBottom: 20
	},
	def: {
		fontWeight: '300', 
		marginBottom: 10
	}
})

export default Def;