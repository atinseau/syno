import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { api } from "../../../store";
import { SvgBack, SvgRegularUser } from "../../Svg";
import Loader from "../../Tool/Loader";

import { BLUE } from "@env"

const Settings = () => {

	const [user, setUser] = useState(null)
	const navigator = useNavigation()

	useEffect(() => {

		let mounted = true

		api.isAuth().then((auth) => {
			if (mounted)
				setUser(auth)
		}).catch(() => {
			navigator.navigate('Home')
			console.log("Unauth")
		})

		return () => mounted = false
	}, [])

	return (
		<>
			{!user ? <Loader/> : <View>
				<View style={header.view}>
					<View style={header.backContainer}>
						<Text style={header.text}>Réglage utilisateur</Text>
					</View>
					<View style={header.svgContainer}>
						<SvgRegularUser style={header.svg}/>
					</View>

					<View>
						<Pressable onPress={() => {
							api.logout().then(() => {
								navigator.navigate('Home')
							})
						}}>
							<Text style={{color: 'black', marginTop: 10}}>Déconnexion</Text>
						</Pressable>
					</View>
				</View>
			</View>}
		</>
	)
}


const header = StyleSheet.create({
	view: {
		marginTop: 40,
		alignItems: 'center'
	},
	text: {
		color: 'black',
		fontWeight: '700',
		fontSize: 16
	},
	backContainer: {
		width: '100%',
		position: 'relative',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	svgContainer: {
		padding: 20,
		borderRadius: 20,
		marginTop: 20,
		backgroundColor: '#f7f7f7'
	},
	svg: {
		color: BLUE,
		width: 50,
		height: 50
	}
})

export default Settings;