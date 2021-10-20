/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Feature from './Component/Feature';
import Header from './Component/Header';
import Session from './Component/Session';
import Suggestion from './Component/Suggestion';

const App = () => {

	return (<SafeAreaView>
		<View style={styles.home}>
			<Header></Header>
			<Feature></Feature>
			<Session></Session>
			<Suggestion></Suggestion>
		</View>
	</SafeAreaView>); 
};

const styles = StyleSheet.create({
  home: {
	  marginTop: 40,
	  marginLeft: 20,
	  marginRight: 20
  }
});

export default App;
