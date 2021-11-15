import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, Pressable } from "react-native";

import Loader from "../../Tool/Loader";
import Word from "../Discover/Word";
import Error from "../../Tool/Error";
import Menu from "./Menu";
import Def from "./Def";
import Syno from "./Syno";
import { SvgBack } from "../../Svg";
import { api } from "../../../store";

const Definition = ({ route }) => {

	const [word, setWord] = useState(null)
	const [historyWord, setHistoryWord] = useState(null)
	const [history, setHistory] = useState([])
	const [catgram, setCatgram] = useState(null)
	const [originDef, setOriginDef] = useState(null)
	const [definitions, setDefinitions] = useState([])
	const [err, setError] = useState(false)

	useEffect(() => {
		(async () => setWord(await api.getWordById(route.params.id)))()
	}, [])

	const clear = () => {
		setCatgram(null)
		setOriginDef(null)
		setDefinitions([])
	}

	const setDefs = (defs) => {
		setCatgram(defs.catgram)
		setOriginDef(defs.origin_def)
		setDefinitions(defs.defs)
	}
	
	const secureSetWord = (nextWord) => {
		clear()
		setHistory([...history, historyWord])
		setWord(nextWord)
	}

	const revertWord = () => {
		clear()
		setWord(history[history.length - 1])

		let tmp = history
		tmp.splice(tmp.length - 1, 1)
		setHistory(tmp)
	}

	useEffect(() => {
		let mounted = true
		
		;(async () => {
			if (!word)
				return;
			if (word.word.split(' ').length > 2) {
				setError(true)
				return;
			}
			let defs = null
			if (!word.definition) {
				const definition = await api.getDicoDefinition(word.word)
				if (!definition) {
					setError(true)
					return;
				}
				const data = await api.insertDefinition(word.id, definition)
				if (typeof data.status == 'undefined')
					defs = data
			}
			if (!defs)
				defs = await api.getDefinition(word.id)

			if (mounted) {
				setHistoryWord({...word, definition: defs})
				setDefs(defs)
			}
		})()

		return () => { mounted = false }
	}, [word])

	return (
		<SafeAreaView>
			{!catgram && !originDef ? <View style={{height: '100%'}}>
				{!err ? <Loader/> : <Error msg="Aucune définition n'a été trouvé"/> }
			</View> : <View style={styles.main}>
				<View style={styles.header}>
					{history.length ? <Pressable style={styles.control} onPress={() => revertWord()}>
						<SvgBack style={styles.back}/>
						<Text style={{
							marginLeft: 10,
							color: 'grey',
							fontSize: 10
						}}>Mot précedent</Text>
					</Pressable> : null}
					<Text style={{...styles.leading, marginTop: (!history.length) ? 40: 30}}>Mot:</Text>
					<Word data={word} canSave={true} fontSize={30}/>
				</View>

				<Menu>
					<Def definitions={definitions} catgram={catgram} originDef={originDef}/>
					<Syno word={word} setWord={secureSetWord}/>
				</Menu>
				
			</View>}
		</SafeAreaView>
	)
}



const styles = StyleSheet.create({
	main: {
		height: '100%'
	},
	back: {
		width: 20,
		height: 20,
		color: 'grey'
	},
	control: {
		marginTop: 30,
		alignItems: 'center',
		flexDirection: 'row'
	},
	header: {
		marginHorizontal: 20
	},
	leading: {
		marginTop: 20,
		fontWeight: '200',
		fontSize: 16,
		marginBottom: -8,
		color: 'grey'
	}
})

export default Definition;