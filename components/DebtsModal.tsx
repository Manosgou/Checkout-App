import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

//components
import WarningModal from "./WarningModal";
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
  onNameChange: (inputeValue: string, cId: string, dId: string) => void;
  onValueChange: (inputeValue: string, cId: string, dId: string) => void;
  newDebt: (cId: string) => void;
  deleteDebt: (cId: string, dId: string) => void;
  checkouts: checkouts[];
}
interface IState {
  showWarningModal: boolean;
  debtID: string;
}
export default class DebtsModal extends Component<IProps, IState> {
  state: IState = {
    showWarningModal: false,
    debtID: "",
  };
  onPresstoggleWarningModal = () => {
    this.setState({ showWarningModal: !this.state.showWarningModal });
  };
  deletedebt = (id: string) => {
    this.setState({
      debtID: id,
    });
    this.onPresstoggleWarningModal();
  };
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
        <WarningModal
          text="Η οφειλή θα διαγραφεί."
          buttonText="Διαγραφή"
          buttonFuntion={() => {
            deleteDebt(itemId, this.state.debtID);
            this.onPresstoggleWarningModal();
          }}
          modalVisibility={this.state.showWarningModal}
          closeModal={() => this.onPresstoggleWarningModal()}
        />
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
              style={{ position: "absolute", top: 21, left: 10 }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Poppins-Medium",
                color: "#000000",
              }}
            >
              Όνομα
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Poppins-Medium",
                marginRight: 25,
                color: "#000000",
              }}
            >
              Τιμή
            </Text>
          </View>
          <KeyboardAwareFlatList
            removeClippedSubviews={false}
            style={styles.list}
            data={item.debts}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 20,
                    textAlign: "center",
                    color: "#000000",
                  }}
                  autoFocus={true}
                  placeholder="'Ονομα"
                  placeholderTextColor="lightgrey"
                  maxLength={10}
                  value={item.name}
                  onChangeText={(value) =>
                    onNameChange(value, itemId, item._id)
                  }
                />

                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 20,
                    textAlign: "center",

                    color: "#000000",
                  }}
                  keyboardType="numeric"
                  placeholder="Τιμή"
                  placeholderTextColor="lightgrey"
                  maxLength={10}
                  value={item.value}
                  onChangeText={(value) =>
                    onValueChange(value, itemId, item._id)
                  }
                />

                <TouchableOpacity
                  onPress={() =>
                    this.deletedebt(item._id)
                  }
                  style={{ padding: 2 }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
            ListFooterComponent={
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    backgroundColor: "#036704",
                    borderRadius: 5,
                  }}
                  onPress={() => newDebt(itemId)}
                >
                  <Ionicons name="md-add" size={30} color="white" />
                </TouchableOpacity>
              </View>
            }
          />

          <Text style={styles.total}>
            Σύνολο:
            {isNaN(total) ? <Text> - </Text> : <Text>{total.toFixed(2)}</Text>}€
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
    color: "#000000",
    fontSize: 30,
    padding: 15,
  },
  list: {
    flex: 1,
  },
  total: {
    fontFamily: "Poppins-Medium",
    color: "#000000",
    textAlign: "center",
    fontSize: 25,
  },
});
