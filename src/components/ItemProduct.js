import React, {Component} from 'react'
import FastImage from 'react-native-fast-image';
import {Text, TouchableHighlight, View} from "react-native";

export default class ItemProduct extends Component {

    render() {
        return (

            <TouchableHighlight
                style={{flex:1, marginTop: 10,}}
                underlayColor={'#DDD'}
                onPress={()=>{alert('touchable')}}>

            <View style={{flexDirection:'row', marginTop: 10,}}>


                <FastImage
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        flex: this.props.flex,
                        backgroundColor: 'red'
                    }}
                    source={{
                        uri: this.props.url,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{flex:2, marginLeft:10}}>
                    <Text style={{color:'red'}}> {this.props.title} </Text>
                    <Text>Link: {this.props.url}</Text>
                </View>

            </View>

            </TouchableHighlight>

        )
    }
}