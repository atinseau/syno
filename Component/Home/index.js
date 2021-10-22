import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStoreState } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { store } from '../../store/user';
import Startup from '../Startup';

import Feature from './Feature';
import Header from './Header';
import Session from './Session';
import Suggestion from './Suggestion';

const HomeStack = createNativeStackNavigator()

const Home = () => {

	const update = useStoreState((state) => state.update)
	const [loaded, setLoaded] = useState(false)
	const [isAuth, setAuth] = useState(false)

	useEffect(() => {
		console.log("Mounted")
		store.isAuth().then((auth) => {
			setAuth(auth)
			if (!loaded)
				setLoaded(true)
		})  
	}, [update])

	return (
		<NavigationContainer>
			<HomeStack.Navigator initialRouteName="home" screenOptions={{
				presentation: 'modal',
				headerBackVisible: false
			}}>
				{loaded ? 
					<>
						<HomeStack.Screen component={HomeComponent} name="home" options={{
							headerShown: false,
							contentStyle: {
								backgroundColor: 'white'
							}
						}}/>
						<HomeStack.Screen component={Startup} name="modal" options={{
							headerShown: false,
							gestureEnabled: isAuth,
							contentStyle: {
								backgroundColor: 'white'
							}
						}}/>
					</> :
					<HomeStack.Screen component={Loading} name="loading" options={{
						headerShown: false,
						contentStyle: {
							backgroundColor: 'white'
						}
					}}/>
				}
			</HomeStack.Navigator>
		</NavigationContainer>
	)
}

const HomeComponent = ({ navigation }) => {

	useEffect(() => {
		store.isAuth().then((auth) => {
			console.log(auth)
			if (!auth)
				navigation.navigate('modal')
		})
	}, [])

	return (
		<SafeAreaView>
			<View style={styles.home}>
				<Header></Header>
				<Feature></Feature>
				<Session></Session>
				<Suggestion></Suggestion>
			</View>
		</SafeAreaView>
	)
}

const Loading = () => {
	return (
		<SafeAreaView>
			<Text style={{marginLeft: 20, marginTop: 40}}>Loading</Text>
		</SafeAreaView>
	
	)
}

const styles = StyleSheet.create({
	home: {
		marginTop: 40,
		marginLeft: 20,
		marginRight: 20
	}
});

export default Home;