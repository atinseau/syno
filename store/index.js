import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, createStore } from "easy-peasy";
import { Platform } from 'react-native';

export const observable = createStore({
	update: false,
	navigationMode: 'modal',
	setUpdate: action((state, playload = true) => {
		state.update = !state.update
	}),
	setNavigationMode: action((state, payload = 'modal') => {
		if (Platform.OS === "ios")
			state.navigationMode = payload
	})
})


export const store = {
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

export { api } from './api'