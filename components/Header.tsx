import React, { Component } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {Colours} from '../Colours';

interface IProps{
    showDeleteAllModal:() => void;
}


export default class Header extends Component<IProps>{
    
    render() {
        
        const {showDeleteAllModal}=this.props;
        return (
            <View style={styles.header}>
                <Text style={styles.title}>Check<Text style={{ color:Colours.black }}>out</Text></Text>
                
                <TouchableOpacity style={styles.trashIcon} onPress={()=>showDeleteAllModal()}>
                    <FontAwesome5 name="trash-alt" size={24} color={Colours.black} />
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        // marginTop:Constant.statusBarHeight,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colours.primaryColour,
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        color: Colours.primaryTextColour,
        marginTop: 8,
        fontFamily:'Poppins-Medium'

    },
    trashIcon: {
        position: 'absolute',
        right: 15,
        top: 18


    }
});