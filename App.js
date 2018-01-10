/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet, Button
} from 'react-native';
import Main from "./src/components/Main";
import store from "./src/store";
import {Provider} from 'react-redux';
import {DetailsComponent} from "./src/constants";


export default class App extends Component<{}> {

    render() {

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Main navigate={this.props.navigation}/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});