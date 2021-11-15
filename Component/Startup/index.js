
import React, { useRef, useState } from 'react';
import {  Pressable,  StyleSheet, Text, View } from 'react-native';
import { SvgBack, SvgBook } from '../Svg';
import Auth from './Auth';


const Startup = ({ navigation }) => {


	const [index, setIndex] = useState(0)
	const [header, setHeader] = useState(true)
	const [loginMode, setLoginMode] = useState(false)

	const authRef = useRef();

	const nextPage = () => {
		if (index + 1 < slider.length)
			setIndex(index + 1)
	}

	const slider = [
		{
			text: "Suivant",
			callback: nextPage,
			component: 
			<>
				<SvgBook style={container.svg}></SvgBook>
				<Text style={container.heading}>Enrichir son vocabulaire n'a jamais été aussi simple</Text>
				<Text style={container.leading}>Apprendre, Découvrir et s'entrainer sur plus 18000 mots de la langue francaise et tester ces connaissances</Text>
			</>
		}, 
		{
			text: "S'inscrire",
			callback: () => {
				authRef.current.submit()
			},
			component: <Auth ref={authRef} navigation={navigation} loginMode={loginMode} setHeader={setHeader}/>
		}
	]

	return (
		<View style={styles.main}>
			{header ? <View style={styles.header}>
				{ index == 1 && loginMode ? <Pressable style={styles.return} onPress={() => setLoginMode(false)}>
					<SvgBack style={styles.svg}/>
				</Pressable> : null }
				<Text style={styles.heading}>Meilleur mot</Text>
			</View> : null}
			
			<View style={{...container.main, flex: (header) ? 1 : 0}}>
				{slider[index].component}
			</View>

			<View style={button.main}>
				{!loginMode ? <Pressable style={button.container} onPress={slider[index].callback}>
					<Text style={button.text}>{slider[index].text}</Text>
				</Pressable>: null }

				{index == 1 ? <Pressable style={button.container} onPress={() => {
					(!loginMode) ? setLoginMode(true) : slider[index].callback()
				}}>
					<Text style={button.text}>Connexion</Text>
				</Pressable> : null}
			</View>
		</View>
	)
}


const button = StyleSheet.create({
	main: {
		width: '100%',
		justifyContent: 'center',
		alignSelf: 'center',
		position: 'absolute',
		flexDirection: 'row',
		bottom: 30
	},
	container: {
		marginHorizontal: 10,
		borderRadius: 500,
		marginBottom: 30,
		backgroundColor: '#5547b6',
		alignSelf: 'center'
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontWeight: '700',
		paddingVertical: 16,
		paddingHorizontal: 30
	}
})

const container = StyleSheet.create({
	main: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	svg: {
		width: 100,
		height: 100,
		color: '#5547b6',
		marginBottom: 26
	},
	heading: {
		textAlign: 'center',
		fontSize: 24,
		marginBottom: 10,
		fontWeight: '700'
	},
	leading: {
		paddingHorizontal: 20,
		fontSize: 12,
		color: 'grey',
		textAlign: 'center'
	}
})

const styles = StyleSheet.create({
	main: {
		padding: 20,
		flex: 1
	},
	header: {
		position: 'relative',
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row'
	},
	return: {
		zIndex: 1,
		position: 'absolute',
		top: 30,
		width: 34,
		height: 34
	},
	svg: {
		color: "#5547b6"
	},
	heading: {
		flex: 1,
		fontSize: 30,
		fontWeight: '700',
		textAlign: 'center',
		marginTop: 30
	}
})

export default Startup;

