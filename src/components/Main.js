import React, {Component} from 'react'
import {
    View,
    StyleSheet, RefreshControl,
    Button, TextInput, FlatList, Text, AsyncStorage, TouchableOpacity
} from 'react-native'
import ItemProduct from "./ItemProduct";
import {connect, Provider} from "react-redux";
import {fetchProduct} from "../actions";
import Autocomplete from "react-native-autocomplete-input";
import store from "../store";

class Main extends Component {

    onClearHistory = () => {
        this.setState({recentSearch: [], show: []});
        AsyncStorage.setItem('recentSearch', JSON.stringify([]), (error, result) => {
                if (!error) {
                    console.log('clear history search');
                }
            }
        )
    }

    onClickSearch = () => {
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
    };


    onChangeText = text => {
        this.setState({
            text: text,
            indexPage: 1,
            show: this.state.recentSearch.filter((text) => {
                return text.indexOf(this.state.text) !== -1 && text != this.state.text;
            })
        })
    }
    onRefresh = () => {
        console.log('onRefresh....');
        this.setState({indexPage: 1})
        console.log('indexPage = ' + this.state.indexPage);

        this.actionFetchProduct(this.state.text, this.state.indexPage)
    }

    actionFetchProduct = (text, indexPage) => {
        this.setState({isFreshing: true});
        this.props.fetchProduct(text, indexPage);
    }


    renderItem = ({item}) => {
        return (
            <ItemProduct
                price={item.price}
                url={item.url}
                width={item.width}
                height={item.height}
                title={item.title}
                thumbnail={item.thumbnail}
                navigate={this.props.navigate}
                flex={1}
            />
        )
    }


    onLoadMore = (xxx) => {
        console.log('xxx', JSON.stringify(xxx));
        this.setState({
            indexPage: this.state.indexPage + 1
        }, () => {
            this.actionFetchProduct(this.state.text, this.state.indexPage)
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isFreshing: false,
            item: [],
            recentSearch: [],
            show: [],
            indexPage: 1
        }
    }


    componentWillMount() {
        try {
            AsyncStorage.getItem('recentSearch', (err, result) => {
                if (result !== null) {
                    console.log('recent Seach :' + result);
                    this.setState({recentSearch: JSON.parse(result)})
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log('state = ' + this.state.isFreshing);

        console.log('change props',
            'list size = ' + nextProps.productData.listProduct.length +
            ', productFetched = ' + nextProps.productData.productFetched +
            ', isFetching = ' + nextProps.productData.isFetching +
            ', page = ' + nextProps.productData.page);


        if (nextProps.productData.isFetching === false) {
            this.setState({isFreshing: false, indexPage: nextProps.productData.page})
            this.setState({
                item: nextProps.productData.listProduct
            })
        }

    }

    render() {

        const {navigate} = this.props.navigate;

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.rowInputSearch}>
                        <Button
                            style={{alignItems: 'center', justifyContent: 'center'}}
                            title={'Search'}
                            onPress={this.onClickSearch}
                        />

                        <Button
                            title={'Clear history search'}
                            onPress={this.onClearHistory}
                        />

                    </View>

                    <Autocomplete
                        data={this.state.show}
                        onBlur={(event) => {
                            console.log('event');
                            console.log(event);
                            this.setState({show: []})
                        }}
                        underlineColorAndroid={'transparent'}
                        placeholder={'type something...'}
                        defaultValue={''}
                        value={this.state.text}
                        onChangeText={this.onChangeText}

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
                        keyExtractor={(item) => item.index}
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.onRefresh}
                                refreshing={this.state.isFreshing}
                            />}
                        onEndReached={this.onLoadMore}
                        onEndReachedThreshold={0.1}

                    />
                </View>
            </Provider>
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
        marginLeft: 8,
        marginRight: 8
    },
    rowInputSearch: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    textInput: {
        borderWidth: 1,
        width: null,
        flex: 1,
        paddingLeft: 10,
        borderColor: '#DDD',
    }
})