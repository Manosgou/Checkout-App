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
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: Colours.primaryColour,
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
          <KeyboardAwareFlatList
            extraHeight={100}
            extraScrollHeight={200}
            removeClippedSubviews={false}
            initialNumToRender={5}
            enableOnAndroid={true}
            style={{ flex: 1 }}
            data={item.debts}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 25,
                }}
              >
                <View
                  style={{
                    padding: 10,
                    borderRadius: 7,
                    backgroundColor: Colours.primaryColour,
                    width: "80%",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={{
                        flex: 1,
                        fontSize: 20,
                        textAlign: "center",
                        color: Colours.primaryTextColour,
                      }}
                      maxLength={15}
                      placeholder="'Ονομα"     
                      placeholderTextColor="lightgrey"
                      value={item.name}
                      onChangeText={(value) =>
                        onNameChange(value, itemId, item._id)
                      }
                    />

                    <TextInput
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        width:90,
                        color: Colours.primaryTextColour,
                      }}
                      // inlineImageLeft='search_icon'
                      keyboardType="numeric"
                      placeholder="Τιμή"
                      maxLength={6}
                      placeholderTextColor="lightgrey"
                      value={item.value}
                      onChangeText={(value) =>
                        onValueChange(value, itemId, item._id)
                      }                    
                    />

                    <TouchableOpacity
                      onPress={() => this.deletedebt(item._id)}
                      style={{justifyContent:'center'}}
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
            ListFooterComponent={
              <View
                style={{
                  alignItems: "center",
                  marginTop: 50,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    backgroundColor: Colours.primaryColour,
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
});
