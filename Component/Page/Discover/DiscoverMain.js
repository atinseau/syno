
import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { api } from '../../../store'
import Loader from "../../Tool/Loader";
import Word from "./Word";
import useStateWithPromise from "../../Tool/useStateWithPromise";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverControl from "./DiscoverControl";

const DiscoverMain = ({ rootNavigation }) => {

	const [session, setSession] = useStateWithPromise([])
	const [words, setWords] = useStateWithPromise([])
	const [index, setIndex] = useState(0)
	const [end, setEnd] = useState(false)

	const nextPage = () => {
		if (index + 1 < session.length) {
			setIndex(index + 1)
		} else {
			console.log("End")
			setEnd(true)
		}
	}

	const prevPage = () => {
		if (index - 1 >= 0) {
			setIndex(index - 1)
		}
	}

	useEffect(() => {
		setWords([])
	}, [index])

	useEffect(() => {
		let mounted = true
		if (words.length == 0 && session.length != 0) {
			(async () => {
				const synonyms = await api.getSynonyms(session[index].synonym_ids)
				if (mounted)
					setWords(synonyms)
			})()
		}
		return () => mounted = false
	}, [words])

	useEffect(() => {
		let mounted = true
		api.isAuth().then(async (user) => {
			const array = []
			for (let i = 0; i < 5; i++)
				array.push(await api.getWord())
			if (mounted) {
				await setSession(array)
				await setWords(await api.getSynonyms(array[index].synonym_ids))
			}
		})
		return () => mounted = false
	}, [])

	return (
		<>
			{ !session.length ? <Loader/> : <SafeAreaView style={styles.main}>
				<View style={content.main}>
					<DiscoverHeader sessionCount={session.length} sessionIndex={index}/>

					<View style={content.body}>
						<View style={content.word}>
							<Text style={content.suggest}>Le mot est:</Text>
							<Word data={session[index]}/>
						</View>

						<View style={{flex: 1}}>
							<Text style={{...content.suggest, marginBottom: 10}}>Les synonymes sont: </Text>
							{!words.length ? <Loader/> : <ScrollView style={content.scroll}>
								{words.map((word, index) => <Word key={index} data={word} fontSize={14}/>)}
							</ScrollView>}
						</View>
					</View>
				</View>

				<DiscoverControl 
					sessionCount={session.length}
					sessionIndex={index}
					rootNavigation={rootNavigation}
					nextPage={nextPage}
					prevPage={prevPage}/>
				
				<Modal animationType="slide" transparent={true} visible={end}>
					<View style={modal.main}>
						<Text>Salut</Text>
					</View>
				</Modal>

			</SafeAreaView>}
		</>
	)
}

const modal = StyleSheet.create({
	main: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		height: '90%',
		width: '100%',
		backgroundColor: 'black'
	}
})

const styles = StyleSheet.create({
	main: {
		flexDirection: 'column',
		flex: 1
	}
})


const content = StyleSheet.create({
	main: {
		flex: 1,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	body: {
		marginTop: 30,
		flex: 1
	},
	suggest: {
		fontSize: 16,
		fontWeight: '200'
	},
	word: {
		marginBottom: 20
	}
})


export default DiscoverMain;