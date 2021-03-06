import React,{ Component } from "react";
import {StyleSheet,View,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


//colours
import {Colours} from '../Colours';

interface IProps{
  newCheckout():void;
}


export default class FloatActionButton extends Component<IProps>{
    render(){
      const {newCheckout}=this.props;
        return(
            <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fab} onPress={newCheckout}>
              <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        );
    }
}

const styles =StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5
      },
    
      fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: Colours.primaryColour,
        borderRadius: 50,
        elevation:5
      },
  })