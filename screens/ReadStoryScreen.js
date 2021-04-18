import * as React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {SearchBar} from 'react-native-elements'
import db from '../config'

export default class ReadScreen extends React.Component{
    constructor(){
        super();
        this.state = {searchA : '', searchT : '', allStories : [], dataSource : [], lastVisTrans : null}
    }

    retrieveStories = async () => {
        const stories = await db.collection("books").get();
        stories.docs.map((doc)=>{this.setState({allStories:[...this.state.allStories,doc.data()], lastVisTrans : doc})})
        console.log(this.state.lastVisTrans)
    }

    searchFilterFunctionA = async () => {
        this.setState({dataSource : []})
        var text = this.state.searchA.toUpperCase()
        console.log(text)
        const query = await db.collection("books").where('authorCheck','==',text).get();
        query.docs.map((doc)=>{this.setState({dataSource : [...this.state.dataSource,doc.data()], lastVisTrans : doc})})
        console.log(this.state.dataSource)
    }
    updateSearch1 = (e) => {
        this.setState({ searchA : e});
        this.searchFilterFunctionA();
    };

    searchFilterFunctionT = async () => {
        this.setState({dataSource : []})
        var text = this.state.searchT.toUpperCase()
        console.log(text)
        const query = await db.collection("books").where('titleCheck','==',text).get();
        query.docs.map((doc)=>{this.setState({dataSource : [...this.state.dataSource,doc.data()], lastVisTrans : doc})})
        console.log(this.state.dataSource)
    }
    updateSearch2 = (e) => {
        this.setState({ searchT : e});
        this.searchFilterFunctionT();
    };



    fetchMoreTrans1 = async () => {
        const query = await db.collection("books").startAfter(this.state.lastVisTrans).limit(10).get();
        query.docs.map((doc)=>{this.setState({allStories : [...this.state.allStories,doc.data()], lastVisTrans : doc})})
    }


    

    componentDidMount = () => {
        this.retrieveStories()
    }

    render(){
        if(this.state.dataSource.length == 0){
            return(
                <View style={styles.container}>
                    <View style={styles.searchBox}>
                        <SearchBar
                            style={styles.searchBar}
                            placeholder="Search By Author..."
                            value={this.state.searchA}
                            onChangeText={(text)=>{this.updateSearch1(text)}}
                        />
                        <SearchBar
                            style={styles.searchBar}
                            placeholder="Search By Title..."
                            value={this.state.searchT}
                            onChangeText={(text)=>{this.updateSearch2(text)}}
                        />
                    </View>
                    <View style={styles.helpTextBox}>
                        <Text style={styles.helpText}>Add an "_" after the author or title</Text>
                    </View>
                    <View style={styles.flatlist}>
                        <FlatList
                            data={this.state.allStories}
                            renderItem={({item}) => 
                                (
                                    <View style = {styles.item}>
                                        <Text>{'Book Title : ' + item.title}</Text>
                                        <Text>{'Book Author : ' + item.author}</Text>
                                    </View>
                                )
                            }
                            keyExtractor={(item,index)=>{index.toString()}}
                            //onEndReachedThreshold={0.8}
                            //onEndReached={this.fetchMoreTrans1()}
                        />
                    </View>
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                    <View style={styles.searchBox}>
                    <SearchBar
                            style={styles.searchBar}
                            placeholder="Search By Author..."
                            value={this.state.searchA}
                            onChangeText={(text)=>{this.updateSearch1(text)}}
                        />
                        <SearchBar
                            style={styles.searchBar}
                            placeholder="Search By Title..."
                            value={this.state.searchT}
                            onChangeText={(text)=>{this.updateSearch2(text)}}
                        />
                    </View>
                    <View style={styles.flatlist}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) => 
                                (
                                    <View style = {styles.item}>
                                        <Text>{'Book Title : ' + item.title}</Text>
                                        <Text>{'Book Author : ' + item.author}</Text>
                                    </View>
                                )
                            }
                            keyExtractor={(item,index)=>{index.toString()}}
                            //onEndReachedThreshold={0.8}
                            //onEndReached={this.fetchMoreTrans2()}
                        />
                    </View>
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
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    },
    flatlist : {
        marginTop : 10
    },
    searchBar : {
        alignSelf : 'center'
    },
    searchButton : {
        backgroundColor : '#ffadec',
        padding : 10,
        borderWidth : 2,
        borderLeftWidth : 1,
        alignContent : 'center'
    },
    helpTextBox : {
        backgroundColor : '#ffadec',
        padding : 5,
        margin : 5,
        width : '50%',
        alignItems : 'center',
        alignSelf : 'center',
    },
    helpText : {
        textAlign : 'center',
        fontSize : 20,
        fontWeight : 'bold'
    },
    item: {
        borderWidth : 1,
        borderColor : '#ffadec',
    }
})