/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Main from "./src/Main";
import store from "./src/store";
import {Provider} from 'react-redux';

export default class App extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Main/>
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