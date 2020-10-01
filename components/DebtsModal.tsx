import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface debts {
  _id: string;
  name: string;
  value: string;
}

interface checkouts {
  id: string;
  title: string;
  debts: debts[];
}

interface IProps {
  item: checkouts;
  showModal: boolean;
  closeModal(): void;
  onNameChange(inputeValue:string,cId:string,dId:string):void;
  onValueChange(inputeValue:string,cId:string,dId:string):void;
  checkouts: checkouts[];
}

export default class DebtsModal extends Component<IProps> {


  render() {
    const { closeModal, showModal, item,onNameChange,onValueChange} = this.props;
    const itemId= item.id;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.mainContainer}>
          <View style={styles.menuContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{item["title"]}</Text>
              <TouchableOpacity style={styles.trashIcon} onPress={closeModal}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={item.debts}
              renderItem={({ item }) => (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View style={{ margin: 20 }}>
                    <TextInput
                      placeholder="Εισάγετε ένα όνομα."
                      placeholderTextColor="#202020"
                      maxLength={30}
                      value={item.name}
                      onChangeText={(value)=>onNameChange(value,itemId,item._id)}
                    />
                  </View>
                  <View style={{ margin: 20 }}>
                  <TextInput
                      placeholder="Εισάγετε μια τιμή."
                      placeholderTextColor="#202020"
                      maxLength={30}
                      value={item.value}
                      onChangeText={(value)=>onValueChange(value,itemId,item._id)}
                    />
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
            <Text>Total</Text>
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
  menuContainer: {
    justifyContent: "space-evenly",
    borderRadius: 30,
    backgroundColor: "white",
    width: "95%",
    height: "95%",
    elevation: 3,
    flexBasis: "85%",
  },
  header: {
    height: 45,
    paddingTop: 10,
    backgroundColor: "#036704",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    color: "white",
    letterSpacing: 4,
    marginTop: 1,
  },
  trashIcon: {
    position: "absolute",
    left: 15,
    top: 17,
  },
});
