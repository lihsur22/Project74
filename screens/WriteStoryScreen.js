import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class WriteScreen extends React.Component{
	render(){
		return(
			<View>
				<SafeAreaProvider>
					<Header
            backgroundColor={'#ffadec'}
            centerComponent={{
              text: 'Story Hub',
          	  style: { color: 'fff', fontSize: 20, fontWeight:'bold' },
          }}/>
					<View style={styles.container}>
						<TextInput style={styles.titleBox} placeholder='Enter Title' multiline={true} onChangeText={(text)=>{}}/>
						<TextInput style={styles.titleBox} placeholder='Enter Author' multiline={true} onChangeText={(text)=>{}}/>
						<TextInput style={styles.storyBox} placeholder='Write the Story' multiline={true} onChangeText={(text)=>{}}/>
						<TouchableOpacity style={styles.submitButton}>
							<Text style={styles.text}>Submit</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaProvider>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		marginTop : 30
	},
	titleBox : {
		borderWidth : 2,
    padding : 3,
		margin : 10,
	},
	storyBox : {
		borderWidth : 2,
    padding : 3,
		margin : 10,
		height:140,
	},
	submitButton : {
		marginTop : 20,
		padding : 10,
		alignSelf : 'center',
		alignItems : 'center',
		backgroundColor : '#ffadec',
		width : 100,
	},
	text : {
		fontWeight : 'bold',
		fontSize : 15
	}
});