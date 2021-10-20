
import { writeFile } from 'fs';
import { readFile } from 'fs/promises';
import { deleteWord, getAllWord, insertWord } from '../model/word';


const PATH = "/Users/arthurtinseau/Desktop/Dev/REACT_NATIVE/syno/api"

interface WordInstance {
	word: String,
	appear: number
}

const getWordJSON = async (): Promise<WordInstance[]> => {
	const SOURCE = "nietzche"

	// CHECK IF DB WORD EXIST
	try 
	{
		const json: Buffer = await readFile(PATH + '/output/' + SOURCE + '.json')
		return JSON.parse(json.toString())

	} catch (e) {
		console.log("file not found")
		const buf: Buffer = await readFile(PATH + '/source/' + SOURCE)
		const words: String[] = buf.toString().split(' ').filter((e) => e.length > 3 && !e.includes('://') && !e.includes('’') && !e.includes('\''))
		let db: WordInstance[] = []

		for (const word of words) {
			const entry = db.filter(e => e.word == word)
			if (entry.length == 0)
				db.push({word: word, appear: 1})
			else
				entry[0].appear ++
		}

		const output = db.sort((a, b) => (a.appear < b.appear) ? 1 : -1).filter((e) => e.appear > 6)

		writeFile(PATH + '/output/' + SOURCE + '.json', JSON.stringify(output) , (e) => {
			console.log(e)
		})

		return output
	}
}

export const seedWord = async () => {
	for (const entry of await getWordJSON()) {
		await insertWord(entry)
	}
}

export const removeWord = async () => {
	const words = await getAllWord()

	for (const word of words) {
		await deleteWord(word.id)
	}

	console.log("All word cleaned")
}