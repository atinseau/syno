

import { useNavigation } from "@react-navigation/core"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SvgBookMark, SvgCheckBookMark } from "../../Svg"


const Word = ({
		data,
		isSaved = false,
		fontSize = 30,
		canSave = false,
		viewStyle = {},
		textStyle = {},
		onPress = null
}) => {

	const [save, setSave] = useState(isSaved)
	const navigation = useNavigation()
	
	const goDefinition = () => {
		navigation.navigate('definition', {
			id: data.id
		})
	}

	return (
		<View style={{...styles.main, ...viewStyle}}>
			<Pressable onPress={() => !onPress ? goDefinition() : onPress() }>
				<Text style={{...styles.text, ...textStyle, fontSize: fontSize }}>{data.word}</Text>
			</Pressable>

			{canSave ? <Pressable onPress={() => setSave(!save)}>
				{!save ? <SvgBookMark style={styles.svg}/> : <SvgCheckBookMark style={styles.svg}/>}
			</Pressable> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		width: '100%'
	},
	text: {
		alignItems: 'center',
		fontWeight: '700',
		marginTop: 6
	},
	svg: {
		marginBottom: 2,
		color: 'black',
		width: 25,
		height: 25
	}
})

export default Word;