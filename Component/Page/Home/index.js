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
import DefinitionController from '../Definition/Controller';

const DiscoverStack = createNativeStackNavigator()
const defaultView = {
	headerShown: false,
	contentStyle: {
		backgroundColor: 'white'
	}
}

const Home = ({ navigation }) => {

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
				navigation.navigate('Discover')
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
				navigation.navigate('Training')
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
				navigation.navigate('Learning')
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
				navigation.navigate('Review')
			}
		}
	]) 

	return (
		<DefinitionController>
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.home}>
					<Header toggle={setOverlay}></Header>
					<Feature features={features} setFeatures={setFeatures}></Feature>
					<Session currentFeature={features.find(e => e.active)}/>
					<Suggestion rootNavigation={navigation}></Suggestion>
				</View>
				{overlay ? <SearchOverlay toggle={setOverlay} isOpen={overlay}/> : null}
			</SafeAreaView>
		</DefinitionController>
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