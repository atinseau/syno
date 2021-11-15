
import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, View, Animated, Pressable, Text } from "react-native";
import { api, store } from "../../store";
import Input from "../Startup/Input";

import { API } from '@env'
import Word from "../Page/Discover/Word";

const SearchOverlay = ({toggle = () => {}, isOpen = true}) => {

	const [search, setSearch] = useState("")
	const [results, setResults] = useState([])
	const opacity = useRef(new Animated.Value(0)).current

	useEffect(() => {
		let mounted = true
		api.isAuth().then(async (auth) => {
			if (auth) {
				const token = await store.getItem('token')
				const { data } = await axios.post(API + "/word/search", {
					query: search,
					token: token
				})
				if (mounted) {
					setResults(data)
				}
			}
		}).catch(() => console.log("Unauth"))
		return () => mounted = false
	}, [search])

	useEffect(() => {
		opacityTo(1)
	}, [])

	const opacityTo = (offset, callback = () => {}) => {
		Animated.timing(opacity, {
			toValue: offset,
			duration: 200,
			useNativeDriver: true
		}).start(callback)
	}

	const leave = (e) => {
		opacityTo(0, () => {
			toggle(false)
		})
	}

	return (
		<Animated.View style={[overlay.main, {
			opacity
		}]}>
			<Input
				viewStyle={overlay.inputView}
				inputStyle={overlay.input}
				textStyle={overlay.text}
				title="Entrer un mot à chercher"
				onChange={setSearch}
				value={search}
				onKeyPress={({nativeEvent: e}) => {
					if (e.key == "Backspace" && search.length == 0)
						leave()	
				}}
			/>
			{results.length ? 
			<View style={result.view} onPress={leave}>
				<ScrollView style={result.scroll}>
					{results.map((word, id) => <View key={id} style={{...result.card,
					... (id == results.length - 1) ? {
						borderBottomEndRadius: 10,
						borderBottomStartRadius: 10
					} : {}}}>
						<Word data={word} fontSize={18}/>
					</View>)}
				</ScrollView>
			</View> : null}

			<Pressable style={overlay.leave} onPress={leave}>
				<Text style={overlay.leaveText}>Quitter</Text>
			</Pressable>
		</Animated.View> 
	)
}

const result = StyleSheet.create({
	view: {
		marginBottom: 20,
		flex: 1,
		borderRadius: 10
	},
	scroll: {
		borderRadius: 10
	},
	card: {
		padding: 20,
		backgroundColor: 'white',
		borderBottomWidth: 0.2,
		borderColor: 'grey'
	},
	text: {
		padding: 20,
		fontWeight: '600',
		fontSize: 16
	}
})

const overlay = StyleSheet.create({
	main: {
		position: 'absolute',
		width: '100%',
		backgroundColor: '#0000008a',
		justifyContent: 'space-between',
		top: 0,
		left: 0,
		bottom: 0,
		flex: 1,
		paddingHorizontal: 20
	},
	inputView: {
		marginTop: 80,
		marginBottom: 20
	},
	input: {
		fontSize: 22
	}, 
	text: {
		fontSize: 10
	},
	leave: {
		marginBottom: 30,
		backgroundColor: 'black',
		borderRadius: 10
	},
	leaveText: {
		textAlign: "center",
		borderRadius: 20,
		fontSize: 16,
		fontWeight: '700',
		paddingVertical: 10,
		color: 'white'
	}
})

export default SearchOverlay;