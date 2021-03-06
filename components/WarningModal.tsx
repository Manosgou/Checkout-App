import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

interface IProps {
  modalVisibility: boolean;
  closeModal:()=> void;
  buttonFuntion:()=> void;
  title:string;
  text:string;
  buttonText:string;
}

export default class WarningModal extends Component<IProps> {
  render() {
    const { closeModal, modalVisibility, buttonFuntion,title,text,buttonText } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={closeModal}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => closeModal()}
            >
              <AntDesign name="closecircle" size={25} color="black" />
            </TouchableOpacity>
            <AntDesign
              name="warning"
              size={65}
              color="white"
              style={{ marginTop: 40 }}
            />
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color:'#000000',
                  fontSize: 25,
                }}
              >
                {title}
              </Text>
              <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => buttonFuntion()}
              >
                <Text style={styles.buttonsText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    justifyContent:'space-between',
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#B33A3A",
    width: "90%",
    height: "45%",
    elevation: 3,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 25,
    justifyContent: "space-between",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 2,
    
  },
  buttonsText: {
    color: "#B33A3A",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  text:{
    textAlign: "center",
    color:'#000000',
    fontFamily: "Poppins-Medium",   
  }
});
