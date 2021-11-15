import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { api, store } from "../../store";
import { SvgUser, SvgRegularUser } from "../Svg";
import Input from "./Input";

const msg  = {
	email: {
		title: "Email invalide",
		content: "merci d'entrer un email valide (invalide ou déjà utiliser)"
	},
	name: {
		title: "Nom d'utilisateur invalide",
		content: "merci d'entrer un nom d'utilisateur valide (invalide ou déjà utiliser)"
	},
	password: {
		title: "Mot de passe invalide",
		content: "merci d'entrer un mot de passe valide"
	},
	credential: {
		title: "Impossible de ce connecter",
		content: "Le mot de passe ou le nom d'utilisateur est invalide"
	}
}

const alert = (body) => {
	Alert.alert(body.title, body.content, [{
		style: 'destructive',
		text: "Ressayer"
	}])
	return 'Invalid parameter: ' + JSON.stringify(body);
}

const validator = async (email, name, password, forLogin = false) => {
	if (!forLogin && (email == "" || !email.includes('@')))
		throw alert(msg.email)
	if (name == "")
		throw alert(msg.name);
	if (password == "" || password.length < 8)
		throw alert(msg.password);

	if (!forLogin) {

		if (!await api.req("/auth/email-is-taken", { email }))
			throw alert(msg.email)

		if (!await api.req("/auth/username-is-taken", { username: name }))
			throw alert(msg.name)
	}
	return true
}


const Auth = forwardRef(({ navigation, loginMode, setHeader }, ref) => {

	const [email, setEmail] = useState("arthurtweak@gmail.com")
	const [name, setName] = useState("arthur")
	const [password, setPassword] = useState("06112001")

	useImperativeHandle(ref, () => ({
		async submit () {

				await validator(email, name, password, loginMode)
				.then(async () => {
					if (!loginMode) {
						const data = await api.req("/auth/register", { username: name, email, password })
						if (!data) {
							console.log("REGISTER ERROR")
							return;
						}
					}
					await api.req("/auth/login", { username: name, password }).then(async (data) => {
						if (data) {
							await store.setToken(data.token)
							navigation.navigate("Home")
						}
					})
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}))

	return (
		<>
			{!loginMode ? <SvgUser style={form.user}/> : <SvgRegularUser style={{...form.user, marginBottom: 20}}/>}
			<Text style={form.heading}>Bienvenue dans Meilleur mot</Text>
			<Text style={form.leading}>{!loginMode ? "Entrer vos données d'inscription" : "Entrer vos données de connexion"}</Text>

			{!loginMode ? <Input
				value={email}
				title="Email"
				placeholder="Entrer votre email"
				onChange={(value) => setEmail(value)}
				viewStyle={form.email}
				onBlur={() => setHeader(true)}
				onFocus={() => setHeader(false)}
			/>: null}

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
	);
})


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

export default Auth;