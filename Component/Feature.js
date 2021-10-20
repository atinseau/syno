

import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';


const Feature = () => {

	const features = [
		{
			name: "New words",
			active: true,
			callback: () => {

			}
		},
		{
			name: "Revision",
			active: false,
			callback: () => {
				
			}
		},
		{
			name: "Search",
			active: false,
			callback: () => {
				
			}
		}
	]

	return (
		<View style={styles.feature}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{features.map(feature =>
					<Pressable style={{...styles.cta, 
						backgroundColor: (feature.active) ? 'black' : '#f7f7f7'
					}}>
						<Text style={{...styles.ctaText, 
							color: (feature.active) ? 'white' : 'black'
						}}>{feature.name}</Text>
					</Pressable>
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	feature: {
		marginTop: 30,
		marginRight: -20
	},
	cta: {
		marginRight: 14,
		borderRadius: 500,
		alignSelf: 'flex-start'
	},
	ctaText: {
		paddingVertical: 16,
		paddingHorizontal: 30,
		color: 'white',
		fontWeight: 'bold'
	}
})



export default Feature;