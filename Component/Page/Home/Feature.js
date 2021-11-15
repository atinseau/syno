import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const Feature = forwardRef(({ }, ref) => {

	const [features, setFeatures] = useState([
		{
			name: "Découvrir",
			active: true
		},
		{
			name: "Entrainement",
			active: false
		},
		{
			name: "Apprentissage",
			active: false
		},
		{
			name: "Révision",
			active: false
		}
	]) 

	useImperativeHandle(ref, () => ({
		features: features,
		setFeatures: setFeatures
	}))

	return (
		<View style={styles.feature}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{features.map((feature, index) =>
					<Pressable key={index} style={{...styles.cta, 
						backgroundColor: (feature.active) ? 'black' : '#f7f7f7'
					}} onPress={() => {
						setFeatures((state) => state.map((e, i) => {
							e.active = (index == i)
							return e
						}))
					}}>
						<Text style={{...styles.ctaText, 
							color: (feature.active) ? 'white' : 'black'
						}}>{feature.name}</Text>
					</Pressable>
				)}
			</ScrollView>
		</View>
	)
})

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