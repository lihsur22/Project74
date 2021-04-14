import * as React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import db from '../config'

export default class ReadScreen extends React.Component{
    constructor(){
        super();
        this.state = {search : '', allStories : [], dataSource : []}
    }

    retrieveStrories = async () => {
        const stories = await db.collection("books").get();
        stories.docs.map((doc)=>{this.setState({allStories:[...this.state.allStories,doc.data()]})})
    }

    searchFilterFunction = async () => {
        this.setState({dataSource : []})
        var text = this.state.search
        const query = await db.collection("books").where('authorCheck','==',text).get();
        query.docs.map((doc)=>{this.setState({dataSource : [...this.state.dataSource,doc.data()]})})
    }

    componentDidMount = () => {
        this.retrieveStrories()
    }

    render(){
        if(this.state.dataSource.length == 0){
            return(
                <View style={styles.container}>
                    <View style={styles.searchBox}>
                        <TextInput placeholder="Search" style={styles.searchBar} onChangeText={(text)=>{this.setState({search : text.toUpperCase()})}}/>
                        <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchFilterFunction()}}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {this.state.allStories.map((item, index) => (
                            <View style = {styles.item}>
                                <Text>{'Book Title : ' + item.title}</Text>
                                <Text>{'Book Author : ' + item.author}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <View style={styles.searchBox}>
                        <TextInput placeholder="Search" style={styles.searchBar} onChangeText={(text)=>{console.log(text);this.setState({search : text.toUpperCase()});console.log(this.state.search)}}/>
                        <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchFilterFunction()}}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {this.state.dataSource.map((item, index) => (
                            <View style = {styles.item}>
                                <Text>{'Book Title : ' + item.title}</Text>
                                <Text>{'Book Author : ' + item.author}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container : {
        marginTop : 30
    },
    searchBox : {
        flexDirection : 'row',
        height : 30,
        width : 'auto',
        marginLeft : 50
    },
    searchPrecise : {
        flexDirection : 'row',
        marginLeft : 50
    },
    searchBar : {
        borderWidth : 2,
        padding : 3,
    },
    searchButton : {
        backgroundColor : '#BBBBFF',
        padding : 10,
        borderWidth : 2,
        borderLeftWidth : 1,
        alignContent : 'center'
    },
    item: {
        margin: 2,
        borderWidth: 1,
     }
})