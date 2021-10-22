
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Pressable,  StyleSheet, Text, View } from 'react-native';
import { store } from '../../store/user';
import SvgBook from '../Svg/SvgBook';
import SvgUser from '../Svg/SvgUser';
import Input from './Input';

import { API } from '@env'


const Startup = ({ navigation }) => {


	const [index, setIndex] = useState(0)
	const [header, setHeader] = useState(true)

	const [email, setEmail] = useState("arthurtweak@gmail.com")
	const [name, setName] = useState("arthur")
	const [password, setPassword] = useState("06112001")

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
			callback: async () => {

				const alertConf = [{
					style: 'destructive',
					text: "Ressayer"
				}]

				if (email == "" || !email.includes('@') || (await axios.post(API + "/auth/email-is-taken", { email })).data.status)
					return Alert.alert("Email invalide", "merci d'entrer un email valide (invalide ou déjà utiliser)", alertConf)
				if (name == "" || (await axios.post(API + "/auth/username-is-taken", { username: name })).data.status)
					return Alert.alert("Nom d'utilisateur invalide", "merci d'entrer un nom d'utilisateur valide (invalide ou déjà utiliser)", alertConf)
				if (password == "" || password.length < 8)
					return Alert.alert("Mot de passe invalide", "merci d'entrer un mot de passe valide", alertConf)

				const { data } = await axios.post(API + "/auth/register", {
					username: name,
					email,
					password
				})

				if (typeof data.status == "undefined" && data.email == email && data.username == name) {

					const { data } = await axios.post(API + "/auth/login", { username: name, password })

					if (typeof data.status == "undefined" && typeof data.token != 'undefined') {
						store.setToken(data.token).then(() => {
							navigation.navigate('home')
						})
					}

				}

			},
			component:
			<>
				<SvgUser style={form.user}/>
				<Text style={form.heading}>Bienvenue dans Meilleur mot</Text>
				<Text style={form.leading}>Entrer vos données de connexion</Text>

				<Input
					value={email}
					title="Email"
					placeholder="Entrer votre email"
					onChange={(value) => setEmail(value)}
					style={form.email}
					onBlur={() => setHeader(true)}
					onFocus={() => setHeader(false)}
				/>

				<Input
					value={name}
					title="Nom d'utilisateur"
					type="default"
					placeholder="Entrer votre pseudo"
					onChange={(value) => setName(value)}
					onBlur={() => setHeader(true)}
					onFocus={() => setHeader(false)}
				/>

				<Input
					value={password}
					title="Mot de passe"
					placeholder="Taper votre mot de passe"
					onChange={(value) => setPassword(value)}
					type="default"
					style={form.password}
					onBlur={() => setHeader(true)}
					onFocus={() => setHeader(false)}
				/>
			</>
		}
	]

	return (
		<View style={styles.main}>
			{header ? <Text style={styles.heading}>Meilleur mot</Text> : null}
			
			<View style={{...container.main, flex: (header) ? 1: 0}}>
				{slider[index].component}
			</View>

			<Pressable style={styles.button} onPress={slider[index].callback}>
				<Text style={styles.buttonText}>{slider[index].text}</Text>
			</Pressable>
		</View>
	)
}

const form = StyleSheet.create({
	user: {
		width: 100,
		height: 100,
		color: "#5547b6",
		marginBottom: 10
	},
	heading: {
		fontSize: 20,
		marginBottom: 6,
		fontWeight: '700'
	},
	leading: {
		color: 'grey',
		fontSize: 12,
		fontWeight: '400',
		marginBottom: 30
	},
	password: {
		marginBottom: 150
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
	heading: {
		fontSize: 30,
		fontWeight: '700',
		textAlign: 'center',
		marginTop: 30
	},
	button: {
		position: 'absolute',
		bottom: 30,
		borderRadius: 500,
		marginBottom: 30,
		backgroundColor: '#5547b6',
		alignSelf: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '700',
		paddingVertical: 16,
		paddingHorizontal: 30
	}
})

export default Startup;

