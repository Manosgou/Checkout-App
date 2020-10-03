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
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  onNameChange(inputeValue: string, cId: string, dId: string): void;
  onValueChange(inputeValue: string, cId: string, dId: string): void;
  newDebt(cId: string): void;
  deleteDebt(cId: string, dId: string): void;
  checkouts: checkouts[];
}

export default class DebtsModal extends Component<IProps> {
  render() {
    const {
      closeModal,
      showModal,
      item,
      onNameChange,
      onValueChange,
      newDebt,
      deleteDebt,
    } = this.props;

    const itemId = item.id;
    const total = item.debts.reduce(
      (accum, item) => accum + parseFloat(item.value),
      0
    );
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: "#036704",
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: "absolute", top: 21, left: 5 }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ flex: 1, textAlign: "center", fontSize: 22,fontFamily: "Poppins-Medium" }}>
              Όνομα
            </Text>
            <Text style={{ flex: 1, textAlign: "center", fontSize: 22,fontFamily: "Poppins-Medium" }}>
              Τιμή
            </Text>
          </View>
          {item.debts.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", opacity: 0.2 }}>
              <AntDesign
                style={{ textAlign: "center" }}
                name="inbox"
                size={65}
                color="black"
              />
              <Text style={{ textAlign: "center" }}>Δεν υπάρχουν οφειλές.</Text>
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={item.debts}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 8,
                  }}
                >
                  <View>
                    <TextInput
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                      }}
                      placeholder="Εισάγετε ένα όνομα."
                      placeholderTextColor="#202020"
                      maxLength={10}
                      value={item.name}
                      onChangeText={(value) =>
                        onNameChange(value, itemId, item._id)
                      }
                    />
                  </View>
                  <View>
                    <TextInput
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginLeft: 15,
                      }}
                      keyboardType="numeric"
                      placeholder="Εισάγετε μια τιμή."
                      placeholderTextColor="#202020"
                      maxLength={10}
                      value={item.value}
                      onChangeText={(value) =>
                        onValueChange(value, itemId, item._id)
                      }
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => deleteDebt(itemId, item._id)}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={28}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          )}

          <View style={{ alignItems: "center", marginBottom: 15 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                backgroundColor: "#036704",
                borderRadius: 22,
              }}
              onPress={() => newDebt(itemId)}
            >
              <Ionicons name="md-add" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.total}>
            Σύνολο:
            {isNaN(total) ? <Text> - </Text> : <Text>{total}</Text>}€
          </Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 30,
    padding: 15,
  },
  list: {
    flex: 1,
    marginTop: 2,
  },
  total: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 10,
  },
});
