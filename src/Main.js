import React, {Component} from 'react'
import {
    View,
    StyleSheet, RefreshControl,
    Button, TextInput, FlatList, Text, AsyncStorage, TouchableOpacity
} from 'react-native'
import ItemProduct from "./components/ItemProduct";
import {connect} from "react-redux";
import {fetchProduct} from "./actions";
import Autocomplete from "react-native-autocomplete-input";

class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isFreshing: false,
            item: [],
            recentSearch: [],
            show: [],
            indexPage: 0
        }
    }


    componentWillMount() {
        try {
            AsyncStorage.getItem('recentSearch', (err, result) => {
                if (result !== null) {
                    console.log('recent SeachL :' + result);
                    this.setState({recentSearch: JSON.parse(result)})
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log('change props' + JSON.stringify(nextProps));
        if (nextProps.productData.isFetching === false){
            this.setState({isFreshing:false})
        }
        this.setState({
            item: nextProps.productData.listProduct
        })
    }


    shouldComponentUpdate(nextProps, nextState) {
        console.log('show component update....');
        return true;
    }


    render() {
        let data = this.state.recentSearch;
        console.log('data = ' + data);

        return (
            <View style={styles.container}>


                <View style={styles.rowInputSearch}>

                    <Button
                        style={{alignItems: 'center', justifyContent: 'center'}}
                        title={'Search'}
                        onPress={() => {
                            this.actionFetchProduct(this.state.text, this.state.indexPage);

                            // show suggest text
                            if (this.state.recentSearch.length === 0) {
                                const tempState = this.state.recentSearch
                                tempState.push(this.state.text)
                                this.setState({
                                    recentSearch: tempState
                                })
                                AsyncStorage.setItem('recentSearch', JSON.stringify(this.state.recentSearch), (error, result) => {
                                    if (!error) {
                                        console.log('saved recent search');

                                    }
                                })


                            } else if (this.state.recentSearch.length > 0 && this.state.recentSearch.indexOf(this.state.text) === -1) {
                                const tempState = this.state.recentSearch
                                tempState.push(this.state.text)
                                this.setState({
                                    recentSearch: tempState
                                })
                                AsyncStorage.setItem('recentSearch', JSON.stringify(this.state.recentSearch), (error, result) => {
                                    if (!error) {
                                        console.log('saved recent search');
                                    }
                                })

                            }
                        }}
                    />


                    <TextInput onBlur={(event) => {
                        console.log('event');
                        console.log(event);
                    }}/>
                    <Button
                        title={'Clear history'}
                        onPress={() => {
                            this.setState({recentSearch: [], show: []});
                            AsyncStorage.setItem('recentSearch', JSON.stringify(this.state.recentSearch), (error, result) => {
                                if (!error) {
                                    console.log('clear history search');
                                }
                            })
                        }}
                    />

                </View>

                <Autocomplete
                    data={this.state.show}

                    onBlur={(event) => {
                        console.log('event');
                        console.log(event);
                        this.setState({show: []})
                    }}
                    placeholder={'type something...'}
                    defaultValue={''}
                    value={this.state.text}
                    onChangeText={text => {
                        this.setState({
                            text: text,
                            indexPage: 1,
                            show: this.state.recentSearch.filter((text) => {
                                return text.indexOf(this.state.text) !== -1 && text != this.state.text;
                            })
                        })
                    }
                    }

                    renderItem={text => (
                        <TouchableOpacity onPress={() => this.setState({text: text})}>
                            <Text>{text}</Text>
                        </TouchableOpacity>
                    )}
                />


                <FlatList
                    style={{flex: 1, flexDirection: 'column'}}
                    data={this.state.item}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.index}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                console.log('onRefresh....');
                                this.setState({indexPage:this.state.indexPage + 1})
                                console.log('indexPage = ' + this.state.indexPage);

                                this.actionFetchProduct(this.state.text, this.state.indexPage)
                            }}
                            refreshing={this.state.isFreshing}
                        />}
                />

            </View>
        )
    }


    actionFetchProduct = (text, indexPage) => {
        this.setState({isFreshing: true});
        this.props.fetchProduct(text, indexPage);
    }


    renderItem = ({item}) => {
        return (
            <ItemProduct
                url={item.url}
                width={item.width}
                height={item.height}
                title={item.title}
                flex={1}
            />
        )
    }

}

const mapStateToProps = state => ({
    productData: state.productData
})

const mapDispatchToProps = dispatch => ({
    fetchProduct: (key, page) => dispatch(fetchProduct(key, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginLeft: 8,
        marginRight: 8
    },
    rowInputSearch: {
        flexDirection: 'row'
    },
    textInput: {
        borderWidth: 1,
        width: null,
        flex: 1,
        paddingLeft: 10,
        borderColor: '#DDD',
    }
})