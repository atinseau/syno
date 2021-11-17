

import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, ScrollView} from 'react-native'
import { api } from "../../../store"
import Input from "../../Startup/Input"
import { SvgCheck, SvgStop } from "../../Svg"
import Loader from "../../Tool/Loader"
import DefinitionController from "../Definition/Controller"
import Word from "../Discover/Word"

import { GREEN, ERROR, RED } from "@env"

/**
 * 
 * @param {String} a 
 * @param {String} b 
 */
const likeCompare = (a, b) => {
	if(a.length > b.length - 2 && a.length < b.length + 2) {
		let sameLetter = 0
		for (let i = 0; i < b.length; i++) {
			if (b[i] == a[i])
				sameLetter++
		}

		if (sameLetter > b.length - 2 && sameLetter < b.length + 2) {
			return true
		}
	}
	return false
}

/**
 * 
 * @param {String} str 
 * @param {Number} start 
 * @returns 
 */
 const shuffle = (str, start) => {
	let before = str.substr(0, start)
	
	let a = str.split('')

	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const tmp = a[i]
		a[i] = a[j]
		a[j] = tmp
	}
	return before
}

const randomInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min}

const Training = ({ rootNavigation }) => {

	/**
	 * @type {[import("../../../store/api").Word]}
	 */
	const [word, setWord] = useState(null)

	/**
	 * @type {[import("../../../store/api").Word[]]}
	 */
	const [synonyms, setSynonyms] = useState([])
	const [loader, setLoader] = useState(false)
	const [guess, setGuess] = useState("")
	const [wrongWord, setWrongWord] = useState([])
	const [rightWord, setRightWord] = useState([])
	const [failCounter, setFailCounter] = useState(0)
	const [helpCount, setHelpCount] = useState(0)
	const [help, setHelp] = useState(null)


	useEffect(() => {
		(async () => {
			const word = await api.getWord()
			const synonyms = await api.getSynonyms(word.synonym_ids)

			setSynonyms(synonyms)
			setWord(word)
			setLoader(true)
		})()
	}, [])

	const submitWord = () => {
		try {
			synonyms.forEach(synonym => {
				if (likeCompare(guess, synonym.word)) {
					setRightWord([synonym.word, ...rightWord])
					setSynonyms(synonyms.filter(oldSynonym => oldSynonym.word != synonym.word))
					if (help.length == synonym.word.length) {
						setHelp("il n'y aucun aide pour le moment")
						setHelpCount(0)
					}
					throw true
				}
			})
			throw false
		} catch (found) {
			if (!found && guess.length > 0) {
				setWrongWord([guess, ...wrongWord, ])
			} else {
				setFailCounter(0)
			}
			setGuess("")
		}
	}

	useEffect(() => {
		if (rightWord.length > synonyms.length / 2) {
			
		}
	}, [rightWord])

	useEffect(() => {
		if (wrongWord.length > 0) {
			if (failCounter >= 5) {
				let rand = randomInt(0, synonyms.length - 1)
				let length = synonyms[rand].word.length 
				let difficulty = length
				setHelp(shuffle(synonyms[rand].word, difficulty))
				setHelpCount(helpCount + 1)
			}
		}
		setFailCounter(failCounter + 1)
	}, [wrongWord])

	return !loader ? <Loader/> : 
		<DefinitionController>
			<SafeAreaView style={{flex: 1}}>
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? 'padding' : null} style={{flex: 1}}>
					<View style={styles.view}>
						<View style={styles.header}>
							<Word data={word} canSave={true} canSynonym={false}/>
			
							<View>
								<Text style={styles.synoCount}>Il y a {synonyms.length} synonymes a trouvé</Text>
							</View>

							<View style={control.main}> 
								<View style={{flexDirection: 'row'}}>
									<SvgStop style={control.svg}/>
									<Text style={{marginLeft: 5, color: "black"}}>Stop</Text>
								</View>

								<View>
									<Text style={{color: "black"}}>{!help ? "il n'y aucun aide pour le moment": help}</Text>
								</View>
							</View>

							<View style={styles.submit}>
								<Input viewStyle={styles.inputView} value={guess} title="Proposition" placeholder="Entrez le mot ici" onChange={setGuess}/>
								<Pressable onPress={submitWord}>
									<View style={styles.svgContainer}>
										<SvgCheck style={styles.svgSubmit}/>
									</View>
								</Pressable>
							</View>

							<View style={result.container}>
								
								<View style={{...result.word, marginRight: 5}}>
									<Text style={result.header}>Mot trouvé</Text>
									<ScrollView style={result.scroll}>
										{rightWord.map((e, i) => <Text key={i} style={{...result.text, color: GREEN}}>{e}</Text>)}
									</ScrollView>
								</View>

								<View style={{...result.word, marginLeft: 5}}>
									<Text style={result.header}>Mot invalide</Text>
									<ScrollView style={result.scroll}>
										{wrongWord.map((e, i) => <Text key={i} style={{...result.text, color: ERROR}}>{e}</Text>)}
									</ScrollView>
								</View>

								
							</View>

							
						</View>
						
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</DefinitionController>
	}


const control = StyleSheet.create({
	main: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 10,
		marginTop: 10,
		padding: 20,
		backgroundColor: "#f6f6f6"
	},
	stop: {

	},
	svg: {
		width: 20,
		height: 20,
		color: "black"
	}
})

const result = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		marginBottom: 10,
		width: "100%",
		flexDirection: "row"
	},
	header: {
		marginTop: 6,
		marginBottom: 10,
		fontSize: 18,
		fontWeight: '800',
		color: "black"
	},
	scroll: {
		marginBottom: 20
	},
	word: {
		borderRadius: 10,
		flex: 1
	},
	text: {
		color: "black",
		fontWeight: '500'
	}
})

const styles = StyleSheet.create({
	view: {
		padding: 20,
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	inputView: {
		flex: 1
	},
	header: {
		flex: 1
	},
	synoCount: {
		color: "grey"
	},
	submit: {
		marginTop: 10,
		flexDirection: 'row'
	},
	svgContainer: {
		backgroundColor: GREEN,
		padding: 20,
		borderRadius: 10,
		marginLeft: 8,
		marginBottom: 15
	},
	svgSubmit: {
		color: "white",
		width: 30,
		height: 30
	}
})



export default Training;