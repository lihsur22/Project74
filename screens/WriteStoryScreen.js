import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from '../config';

export default class WriteScreen extends React.Component{
	constructor(){
		super();
		this.state = {bookAuthor : '', bookTitle : '', story : ''};
	}
	
	submitStory = () => {
		/*var title = this.state.bookTitle;
		var author = this.state.bookAuthor;
		var story = this.state.story;

		console.log(title + ', ' + author + ', ' + story);*/
		db.collection("books").add({
			'author' : this.state.bookAuthor,
			'title' : this.state.bookTitle,
			'story' : this.state.story
		});

		alert('Story Submitted');
		/*ToastAndroid.show("Story Submittet", ToastAndroid.SHORT);
			As seen before, toast doesn't work on my phone.
			Kindly uncomment to test if it works.
		*/

		this.setState({
			bookAuthor : '',
			bookTitle : '',
			story : ''
		});
	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
				<View>
					<SafeAreaProvider>
						<Header
							backgroundColor={'#ffadec'}
							centerComponent={{
								text: 'Story Hub',
								style: { color: 'fff', fontSize: 20, fontWeight:'bold' },
							}}
						/>
						<View style={styles.container}>
							<TextInput style={styles.titleBox} placeholder='Enter Title' multiline={true} value={this.state.bookTitle} onChangeText={(text)=>{this.setState({bookTitle : text})}}/>
							<TextInput style={styles.titleBox} placeholder='Enter Author' multiline={true} value={this.state.bookAuthor} onChangeText={(text)=>{this.setState({bookAuthor : text})}}/>
							<TextInput style={styles.storyBox} placeholder='Write the Story' multiline={true} value={this.state.story} onChangeText={(text)=>{this.setState({story : text})}}/>
							<TouchableOpacity style={styles.submitButton} onPress={()=>{this.submitStory()}}>
								<Text style={styles.text}>Submit</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaProvider>
				</View>
			</KeyboardAvoidingView>
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