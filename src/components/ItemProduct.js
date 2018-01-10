import React, {Component} from 'react'
import FastImage from 'react-native-fast-image';
import {Text, TouchableHighlight, View} from "react-native";
import {DetailsComponent} from "../constants";

export default class ItemProduct extends Component {
    render() {
        console.log('navigate = ' + this.props.navigate);
        const {navigate} = this.props.navigate;
        return (
            <TouchableHighlight
                style={{flex: 1, marginTop: 10,}}
                underlayColor={'#DDD'}
                onPress={() => {
                    console.log('click here = ' + this.props.url);

                    navigate(DetailsComponent, {
                        data: this.props.url
                    })
                }}
            >

                <View style={{flexDirection: 'row', marginTop: 10,}}>

                    <FastImage
                        style={{
                            width: this.props.width,
                            height: this.props.height,
                            flex: this.props.flex,
                        }}
                        source={{
                            uri: this.props.thumbnail,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    <View style={{flex: 2, marginLeft: 10}}>
                        <Text> {this.props.title} </Text>
                        <Text style={{color: 'red'}}>{this.props.price}</Text>
                    </View>

                </View>

            </TouchableHighlight>

        )
    }
}