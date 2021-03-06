import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { api } from "../../../store";
import Error from "../../Tool/Error";
import Loader from "../../Tool/Loader";
import Word from "../Discover/Word";

import { RED } from "@env"

/**
 * @typedef {Object} Word
 * @property {String} id - UUID of the word
 * @property {String} word - The word
 * @property {String[]} synonym_ids - All of the linked synonyms (UUID)
 */

/**
 * @param {Object} props
 * @param {Word} props.word 
 * @param {Function} props.setWord
 * @returns
 */
const Syno = ({ word = {}, setWord }) => {

	const [synos, setSynos] = useState([])
	const [err, setError] = useState(false)

	useEffect(() => {

		let mounted = true

		;(async () => {
			if (!word.synonym_ids || !word.synonym_ids.length) {
				if (mounted)
					return setError(true)
			}
			const result = await api.getSynonyms(word.synonym_ids)
			if (mounted)
				setSynos(result)
		})()

		return () => mounted = false
	}, [])

	return (!synos.length && !err) ? <Loader/> :  (!err ? <View style={styles.view}>
		<View style={{backgroundColor: RED, padding: 20, borderRadius: 20}}>
			<Text style={{fontSize: 20, fontWeight: '700', color: "white"}}>Il y a {synos.length} synonymes</Text>
			<Text style={{fontSize: 12, fontWeight: '300', color: "white", marginTop: 5}}>Cliquez sur un mot et signaler le si il n'est pas pertinant</Text>
		</View>
		<ScrollView style={{ marginTop: 20, marginBottom: 20, flex: 1 }}>
			{synos.map((syno, id) => <Word key={id} data={syno} fontSize={18} textStyle={styles.word} onPress={() => {
				setWord(syno)
			}}/> )}
		</ScrollView>
	</View> : <Error msg="Il n'y a aucun synonyme pour ce mot ! "/>)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		marginHorizontal: 20
	},
	word: {
		fontWeight: '400'
	}
})

export default Syno;