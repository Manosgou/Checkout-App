import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

//colours
import { Colours } from "../Colours";

interface IProps {
  total:()=>void;
}

export default class FloatView extends Component<IProps> {
  render() {
    const { total } = this.props;
    return (
      <View style={styles.fvContainer}>
        <View style={styles.fv}>
          <Text style={styles.text}>Σύνολο{"\n"+total()}€</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fvContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  fv: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 50,
    backgroundColor: Colours.primaryColour,
    borderRadius: 50,
    elevation: 5,
  },
  text:{
    textAlign:'center',
    color:Colours.primaryTextColour,
    fontSize:15,
    fontFamily: "Poppins-Medium",
  }
});
