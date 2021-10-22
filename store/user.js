import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, createStore } from "easy-peasy";
import { API } from '@env'



export const observable = createStore({
	update: false,
	setUpdate: action((state, playload = true) => {
		console.log("fire update")
		state.update = !state.update
	})
})

export const store = {

	isAuth: async () => {
		const token = await store.getItem('token')
		if (!token)
			return false;
		const { data } = await axios.post(API + "/auth/verify-token", { token })
		if (typeof data.status == 'undefined' && typeof data.token != 'undefined') {
			console.log("here")
			if (token == data.token)
				return true
		}
		store.removeItem('token')
		return false 
	},

	setToken: async (token) => {
		observable.getActions().setUpdate(null)
		await AsyncStorage.setItem('token', token)
	},


	getItem: async (key) => {
		return await AsyncStorage.getItem(key)
	},
	removeItem: async (key) => {
		observable.getActions().setUpdate(null)
		await AsyncStorage.removeItem(key)
	}
}