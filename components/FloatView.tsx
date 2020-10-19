import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

//colours
import { Colours } from "../Colours";

interface IProps {
  total:()=>void;
  elevation?:number;
  colour?:string;
}

export default class FloatView extends Component<IProps> {
  render() {
    const { total,elevation,colour } = this.props;
    return (
      <View style={styles.fvContainer}>
        <View style={[styles.fv,{elevation:elevation,backgroundColor:colour}]}>
          <Text style={styles.text}>Σύνολο{"\n"+total()}€</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fvContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    padding:5
  },
  fv: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    borderRadius: 50,
    
  },
  text:{
    textAlign:'center',
    color:Colours.primaryTextColour,
    fontSize:15,
    fontFamily: "Poppins-Medium",
  }
});
