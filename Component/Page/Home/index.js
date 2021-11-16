import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useStoreActions } from 'easy-peasy'
import SearchOverlay from '../../Tool/SearchOverlay';
import Definition from '../Definition';

import Feature from './Feature';
import Header from './Header';
import Session from './Session';
import Suggestion from './Suggestion';

import { BLUE, PURPLE, YELLOW, RED } from '@env'
import { SvgBook, SvgMemory, SvgTicket, SvgTraning } from '../../Svg';

const DiscoverStack = createNativeStackNavigator()
const defaultView = {
	headerShown: false,
	contentStyle: {
		backgroundColor: 'white'
	}
}

const Root = ({ rootNavigation }) => {

	const [overlay, setOverlay] = useState(false)
	const setNavigationMode = useStoreActions((actions) => actions.setNavigationMode)

	const [features, setFeatures] = useState([
		{
			name: "Découvrir",
			title: "Nouveau synonyme",
			content: "Découvrir 5 nouveau mots",
			color: PURPLE,
			svg: SvgBook,
			active: true,
			callback: () => {
				setNavigationMode('push')
				rootNavigation.navigate('Discover')
			}
		},
		{
			name: "Entrainement",
			title: "Devenir meilleur",
			content: "Citez le plus de synonyme possible",
			svg: SvgTraning,
			color: YELLOW,
			active: false,
			callback: () => {
				setNavigationMode('push')
				rootNavigation.navigate('Training')
			}
		},
		{
			name: "Apprentissage",
			title: "Bonne mémoire",
			content: "Restituez une suite de synonyme",
			svg: SvgMemory,
			color: BLUE,
			active: false,
			callback: () => {
				setNavigationMode('push')
				rootNavigation.navigate('Learning')
			}
		},
		{
			name: "Révision",
			title: "Il faut revisé",
			content: "L'entrainement mais sans surprise",
			svg: SvgTicket,
			color: RED,
			active: false,
			callback: () => {
				setNavigationMode('push')
				rootNavigation.navigate('Review')
			}
		}
	]) 

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.home}>
				<Header toggle={setOverlay}></Header>
				<Feature features={features} setFeatures={setFeatures}></Feature>
				<Session currentFeature={features.find(e => e.active)}/>
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
		flex: 1,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20
	}
});

export default Home;