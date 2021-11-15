import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { api } from "../../../store";
import Loader from "../../Tool/Loader";
import Definition from "../Definition";
import DiscoverMain from "./DiscoverMain";

const WordStack = createNativeStackNavigator()
const defaultView = {
	headerShown: false,
	contentStyle: {
		backgroundColor: 'white'
	}
}

const Discover = ({ navigation }) => {

	const [loader, setLoader] = useState(false)
	const setNavigationMode = useStoreActions((actions) => actions.setNavigationMode)
	
	useEffect(() => {
		api.isAuth()
		.then(() => setLoader(true))
		.catch(() => {
			console.log("Unauth")
			navigation.navigate('Home')
			setNavigationMode('modal')
		})
	}, [])

	if (!loader)
		return (<Loader/>)
		
	return (
		<NavigationContainer independent={true}>
			<WordStack.Navigator
			initialRouteName="discover"
			screenOptions={{
				presentation: 'modal',
				headerBackVisible: false
			}}>
				<WordStack.Screen name="discover" options={defaultView}>
					{() => <DiscoverMain rootNavigation={navigation}/>}
				</WordStack.Screen>

				<WordStack.Screen component={Definition} name="definition" options={defaultView}>

				</WordStack.Screen>
			</WordStack.Navigator>
		</NavigationContainer>
	)
}

export default Discover;