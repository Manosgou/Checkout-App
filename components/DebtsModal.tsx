import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//components
import WarningModal from "./WarningModal";
import FloatView from "./FloatView";

//colours
import { Colours } from "../Colours";

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
  onInputsUpdate: (
    uName: string,
    uValue: string,
    cId: string,
    dId: string
  ) => void;
  newDebt: (cId: string, name: string, value: string) => void;
  deleteDebt: (cId: string, dId: string) => void;
  checkouts: checkouts[];
}
interface IState {
  showWarningModal: boolean;
  debtID: string;
  keyboardHeight: number;
  name: string;
  value: string;
  editMode: boolean;
  selectedItemID: string;
}

export default class DebtsModal extends Component<IProps, IState> {
  state: IState = {
    showWarningModal: false,
    debtID: "",
    keyboardHeight: 0,
    name: "",
    value: "",
    editMode: false,
    selectedItemID: "",
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

  total = () => {
    let total: number = 0;
    total += this.props.item.debts.reduce(
      (accum, item) => accum + parseFloat(item.value),
      0
    );
    if (total) {
      return total.toFixed(2);
    } else if (!total || isNaN(total)) {
      return " - ";
    }
  };
  handleInputChange = (inputName: string, inputValue: string) => {
    this.setState((state) => ({
      ...state,
      [inputName]: inputValue,
    }));
  };
  editInputs = (name: string, value: string, selectedItemID: string) => {
    this.setState({
      selectedItemID: selectedItemID,
      name: name,
      value: value,
      editMode: true,
    });
  };
  render() {
    const {
      closeModal,
      showModal,
      item,
      onInputsUpdate,
      newDebt,
      deleteDebt,
    } = this.props;
    const { selectedItemID, name, value, editMode } = this.state;
    const itemId = item.id;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <WarningModal
          title="ΠΡΟΣΟΧΗ"
          text="Η οφειλή θα διαγραφεί."
          buttonText="Διαγραφή"
          buttonFuntion={() => {
            deleteDebt(itemId, this.state.debtID);
            this.onPresstoggleWarningModal();
          }}
          modalVisibility={this.state.showWarningModal}
          closeModal={() => this.onPresstoggleWarningModal()}
        />
        <View style={{ flex: 1, backgroundColor: Colours.white }}>
          <View
            style={{
              backgroundColor: Colours.primaryColour,
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => closeModal()}
              style={{ position: "absolute", top: 21, left: 10 }}
            >
              <AntDesign name="arrowleft" size={30} color={Colours.white} />
            </TouchableOpacity>
          </View>
          {item.debts.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", opacity: 0.2 }}>
              <AntDesign
                style={{ textAlign: "center" }}
                name="inbox"
                size={65}
                color="black"
              />
              <Text style={{ textAlign: "center" }}>
                Η λίστα των ταμείων είναι κενή
              </Text>
            </View>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              initialNumToRender={5}
              data={item.debts}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 25,
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.created}>{item.created}</Text>
                    <View style={styles.divider} />
                  </View>
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 7,
                      backgroundColor:item.value[0]==='-'?Colours.warningRed:Colours.primaryColour,
                      width: "85%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          color: Colours.primaryTextColour,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          color: Colours.primaryTextColour,
                        }}
                      >
                        {item.value}
                      </Text>

                      <TouchableOpacity
                        onPress={() =>
                          this.editInputs(item.name, item.value, item._id)
                        }
                        style={{ justifyContent: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="circle-edit-outline"
                          size={30}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.deletedebt(item._id)}
                        style={{ justifyContent: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={30}
                          color={Colours.black}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          )}
          <View
            style={{
              backgroundColor:this.state.value[0]==='-'?Colours.warningRed:Colours.primaryColour,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TextInput
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: Colours.primaryTextColour,
                }}
                maxLength={15}
                placeholder="'Ονομα"
                placeholderTextColor="lightgrey"
                value={name}
                onChangeText={(value) => this.handleInputChange("name", value)}
              />
              <TextInput
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  width: 90,
                  color: Colours.primaryTextColour,
                }}
                keyboardType="numeric"
                placeholder="Τιμή"
                maxLength={6}
                placeholderTextColor="lightgrey"
                value={value}
                onChangeText={(value) => this.handleInputChange("value", value)}
              />
              {!editMode ? (
                <TouchableOpacity style={{ justifyContent: "center" }}>
                  <Entypo
                    name="add-to-list"
                    size={30}
                    color={Colours.black}
                    onPress={() => {
                      if (name.trim() === "" || value.trim() === "") {
                        alert("Τα στοιχεία δεν μπορούν να είναι κενά.");
                      } else {
                        newDebt(itemId, name, value);
                        this.setState({
                          name: "",
                          value: "",
                        });
                      }
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ justifyContent: "center" }}>
                  <MaterialCommunityIcons
                    name="update"
                    size={30}
                    color={Colours.black}
                    onPress={() => {
                      if (name.trim() === "" || value.trim() === "") {
                        alert("Τα στοιχεία δεν μπορούν να είναι κενά.");
                      } else {
                        onInputsUpdate(name, value, item.id, selectedItemID);
                        this.setState({
                          selectedItemID: "",
                          name: "",
                          value: "",
                          editMode: false,
                        });
                      }
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                opacity: 0.1,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Medium",
                  color: Colours.primaryTextColour,
                }}
              >
                Αρ.παραγγελιών: {item.debts.length}
              </Text>
              <FloatView total={this.total} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: Colours.primaryTextColour,
    fontSize: 25,
    padding: 15,
  },
  total: {
    fontFamily: "Poppins-Medium",
    color: Colours.secondaryTextColour,
    textAlign: "center",
    fontSize: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "lightgrey",
    alignSelf: "center",
    opacity: 0.2,
  },
  created: {
    fontSize: 15,
    opacity: 0.3,
  },
});
