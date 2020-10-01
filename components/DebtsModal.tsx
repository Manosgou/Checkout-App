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
    } = this.props;
    const itemId = item.id;
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
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.list}
            data={item.debts}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <TextInput
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
                    placeholder="Εισάγετε μια τιμή."
                    placeholderTextColor="#202020"
                    maxLength={10}
                    value={item.value}
                    onChangeText={(value) =>
                      onValueChange(value, itemId, item._id)
                    }
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => newDebt(itemId)}
          >
            <Ionicons name="md-add" size={35} color="black" />
          </TouchableOpacity>
          <Text style={styles.total}>
            Total:
            {item.debts.reduce(
              (accum, item) => accum + parseInt(item.value),
              0
            )}
            €
          </Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    padding: 15,
  },
  list: {
    flex: 1,
  },
  total: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 10,
  },
});
