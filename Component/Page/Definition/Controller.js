
import { useStoreActions } from "easy-peasy"
import React, { Children, useEffect, useState } from "react"
import { api } from '../../../store'
import Definition from "."
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Loader from "../../Tool/Loader"
import { NavigationContainer } from "@react-navigation/native"

const Controller = createNativeStackNavigator()
const defaultView = {
	headerShown: false,
	contentStyle: {
		backgroundColor: 'white'
	}
}

const DefinitionController = ({ checkAuth = true, children }) => {

	const [loader, setLoader] = useState(false)
	const setNavigationMode = useStoreActions((actions) => actions.setNavigationMode)
	
	useEffect(() => {
		if (checkAuth) {
			api.isAuth()
			.then(() => setLoader(true))
			.catch(() => {
				console.log("Unauth")
				navigation.navigate('Home')
				setNavigationMode('modal')
			})
		}
	}, [])

	if (!loader)
		return (<Loader/>)
		
	return (
		<NavigationContainer independent={true}>
			<Controller.Navigator
			initialRouteName="Default"
			screenOptions={{
				presentation: 'modal',
				headerBackVisible: false
			}}>
				<Controller.Screen name="Default" options={defaultView}>{() => children}</Controller.Screen>
				<Controller.Screen component={Definition} name="definition" options={defaultView}/>
			</Controller.Navigator>
		</NavigationContainer>
	)
}

export default DefinitionController;