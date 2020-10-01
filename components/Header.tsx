import React, { Component } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';





export default class Header extends Component{
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>Check<Text style={{ color: 'black' }}>out</Text></Text>
                <TouchableOpacity style={styles.trashIcon}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 75,
        paddingTop: 15,
        backgroundColor: '#036704',
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white',
        letterSpacing: 4,
        marginTop: 8

    },
    trashIcon: {
        position: 'absolute',
        right: 15,
        top: 40


    }
});