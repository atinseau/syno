import cheerio from 'cheerio';
import axios from "axios";

import { API } from '@env'
import { DEF } from '@env'
import { store } from '.';

/**
 * @typedef {Object} Definition
 * @property {String} catgram
 * @property {String} origin_def
 * @property {Object[]} defs
 */

/**
 * @typedef {Object} Word
 * @property {String} id - UUID of the word
 * @property {String} word - The word
 * @property {String[]} synonym_ids - All of the linked synonyms (UUID)
 * @property {Definition} definition - The definition of the word
 */

/**
 * @typedef {Object} User 
 * @property {String} username - The username
 * @property {String} email - The email
 * @property {String} token - The token
 * @property {String[]} saved_word - The saved words
 */


const req = async (endpoint = "", body = {}, method = "POST") => {

	console.log("Request: " + API)

	try {
		let data = null
		if (method == "GET")
			data = (await axios.get(API + endpoint, body)).data
		if (method == "POST")
			data = (await axios.post(API + endpoint, body)).data
		
		if (!data)
			throw "invalid post method"
		if (typeof data.status != 'undefined')
			throw data
		return data
	} catch (e) {
		console.log("API FETCH ERROR")
		console.log("DATA: " + JSON.stringify(e))
		return null
	}
}


/**
 * @returns {Word}
 */
const getWord = async () => {
	const token = await store.getItem('token')
	const data = await req("/word/random", { token })
	if (!data)
		return null;
	if (!data.synonym_ids)
		return await api.getWord()
	return data
	
}

/**
 * @param {String} wordId 
 * @returns {Word}
 */
const getWordById = async (wordId) => {
	const token = await store.getItem('token')
	const data = await req("/word/by-id", { token, id: wordId })
	return data
}


/**
 * @param {String[]} ids 
 * @returns {Word[]}
 */
const getSynonyms = async (ids = []) => {
	const token = await store.getItem('token')
	const synos = []
	for(const id of ids) {
		const data = await req("/word/by-id", { id, token })
		if (typeof data.status == "undefined")
			synos.push(data)
	}
	return synos
}


/**
 * @param {String} word 
 * @returns {Definition}
 */
const getDicoDefinition = async (word) => {
	try {
		const { data??} = await axios.get(DEF + word)
		const $ = cheerio.load(data)

		if ($('.icon-warning-sign').length != 0 ||??$('.icon-question-sign').length != 0)
			throw null
		$('.BlocDefinition .lienconj').remove()
		$('.BlocDefinition li.DivisionDefinition p.LibelleSynonyme').remove()
		$('.BlocDefinition li.DivisionDefinition p.Synonymes').remove()

		const catgram = $('.BlocDefinition .CatgramDefinition').first().text()
		const origin_def = $('.BlocDefinition .OrigineDefinition').text()
		const definitions = $('.BlocDefinition li.DivisionDefinition')

		let defs = []
		definitions.each((i, e) => {
			const el = cheerio.load(e)
			if (el('.RubriqueDefinition').length) {
				defs.push({
					type: "section",
					content: el('.RubriqueDefinition').text() 
				})
				el('.RubriqueDefinition').remove()
			}
			defs.push({
				type: "text",
				content: el.text().replace(/\n/g, '', '').replace(/\t/g, '')
			})
		})
		return {
			catgram,
			origin_def,
			defs
		}
	} catch (e) {
		console.log(e)
		return null
	}
}

/**
 * @param {String} wordId 
 * @returns {Definition}
 */
const getDefinition = async (wordId) => {
	const data = await req("/definition/by-word-id", {
		token: await store.getItem('token'),
		id: wordId
	})
	return data
}


/**
 * @param {String} wordId 
 * @param {Definition} definition 
 */
const insertDefinition = async (wordId, definition) => {
	const token = await store.getItem('token')
	const data = await req("/definition/insert", {
		word_id: wordId,
		catgram: definition.catgram,
		origin_def: !definition.origin_def.length ? "aucune" : definition.origin_def,
		defs: definition.defs,
		token
	})
	return data
}


// USER

/**
 * @returns {User}
 */
const isAuth  = () => {
	return new Promise(async (resolve, reject) => {
		const token = await store.getItem('token')
		if (!token ||??token == null)
			return reject(false);
		const data = await req("/auth/verify-token", { token })
		if (typeof data.status == 'undefined' && typeof data.token != 'undefined') {
			if (token == data.token) {
				return resolve(data)
			}
		} else
			console.log(data.msg)
		await store.removeItem('token')
		return reject(false) 
	})
}

const logout = () => {
	return new Promise (async (resolve, reject) => {
		return await isAuth().then(async (auth) => {
			const token = await store.getItem('token')
			const data = await req("/auth/logout", { token })
			await store.removeItem('token')
			resolve(data)
		})
	})
}

export const api = {
	getDefinition,
	getSynonyms,
	getDicoDefinition,
	getWord,
	getWordById,
	insertDefinition,
	isAuth,
	logout,
	req
}
