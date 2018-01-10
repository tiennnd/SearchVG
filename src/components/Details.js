import React, {Component} from 'react'
import {
    View, WebView,
} from 'react-native'


export default class Details extends Component {

    render() {
        const {state} = this.props.navigation;
        var data = state.params ? state.params.data : "<undefined>";
        console.log('data = ' + data);


        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: data}}
                />
            </View>
        )
    }
}

