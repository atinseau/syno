import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SearchOverlay from '../../Tool/SearchOverlay';
import Definition from '../Definition';

import Feature from './Feature';
import Header from './Header';
import Session from './Session';
import Suggestion from './Suggestion';

const DiscoverStack = createNativeStackNavigator()
const defaultView = {
	headerShown: false,
	contentStyle: {
		backgroundColor: 'white'
	}
}


const Root = ({rootNavigation}) => {

	const [overlay, setOverlay] = useState(false)
	const featureRef = useRef([])

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.home}>
				<Header toggle={setOverlay}></Header>
				<Feature ref={featureRef}></Feature>
				<Session featureRef={featureRef} navigation={rootNavigation}></Session>
				<Suggestion rootNavigation={rootNavigation}></Suggestion>
			</View>
			{overlay ? <SearchOverlay toggle={setOverlay} isOpen={overlay}/> : null}
		</SafeAreaView>
	)
}

const Home = ({ navigation }) => {

	// const update = useStoreState((state) => state.update)

	// useEffect(() => {
	// 	console.log("Home")
	// 	api.isAuth().catch(() => {
	// 		navigation.navigate('Startup')
	// 	})
	// }, [update])

	return (
		<NavigationContainer independent={true}>
			<DiscoverStack.Navigator
				initialRouteName="root"
				screenOptions={{
					presentation: 'modal',
					headerBackVisible: false
				}}>
				<DiscoverStack.Screen name="root" options={defaultView}>
					{() => <Root rootNavigation={navigation}/>}
				</DiscoverStack.Screen>
				<DiscoverStack.Screen name="definition" component={Definition} options={defaultView}/>
			</DiscoverStack.Navigator>
		</NavigationContainer>
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