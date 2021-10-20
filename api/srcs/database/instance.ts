
import { request } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import '../config'

export const qfetch = async (req: RequestDocument, body: Object = {}) => {
	try {
		const data = await request (process.env.ENDPOINT, req, body)
		return data
	} catch (e) {
		return null
	}
}