import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import * as Linking from "expo-linking";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";
import { AntDesign } from "@expo/vector-icons";

//moment
import moment from "moment";
import "moment/locale/el";

//components
import Header from "./components/Header";
import FloatActionButton from "./components/FloatActionButton";
import Item from "./components/Item";
import DebtsModal from "./components/DebtsModal";
import DeleteAllModal from "./components/DeleteAllModal";

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

interface IState {
  deleteAllModal: boolean;
  fontsLoaded: boolean;
  selectedItem: checkouts;
  showModal: boolean;
  checkouts: checkouts[];
}

export default class App extends Component<IState> {
  state: IState = {
    deleteAllModal: false,
    fontsLoaded: false,
    selectedItem: { id: "", title: "", debts: [] },
    showModal: false,
    checkouts: [],
  };

  getFonts = () =>
    Font.loadAsync({
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    });

  getKeys = async (): Promise<string[]> => {
    let keys: string[] = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log("error:Keys cannot be retrieved");
    }
    return keys;
  };

  async componentDidMount() {
    //await AsyncStorage.clear()
    let keys = await this.getKeys();
    let item: object;
    for (let i in keys) {
      if (keys[i] !== null) {
        try {
          item = JSON.parse((await AsyncStorage.getItem(keys[i])) || "{}");
          this.setState({ checkouts: [...this.state.checkouts, item] });
        } catch (e) {
          console.log("error:Tasks cannot be retrieved");
        }
      }
    }
  }

  newCheckout = async () => {
    let checkouts = [...this.state.checkouts];
    moment.locale("el");
    let date = moment().format("LL");
    let id = Math.random().toString();
    for (let i in checkouts) {
      if (checkouts[i].title === date) {
        alert("Υπάρχει ήδη ταμείο με ημερομηνία " + date);
        return;
      }
    }
    this.setState({
      checkouts: [
        {
          id: id,
          title: date,
          debts: [],
        },
        ...this.state.checkouts,
      ],
    });
    let checkoutObj = {
      id: id,
      title: date,
      debts: [],
    };
    try {
      await AsyncStorage.setItem(
        "@" + checkoutObj.id,
        JSON.stringify(checkoutObj)
      );
    } catch (e) {
      console.log("error:Task cannot be saved");
    }
  };

  newDedt = (id: string) => {
    let newInput = { _id: Math.random().toString(), name: "", value: "" };
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === id);
    checkouts[index].debts.push(newInput);
    this.setState({ checkouts });
  };

  deleteDebt = async (id: string, _id: string) => {
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === id);
    let debt = checkouts[index].debts.findIndex((debt) => debt._id == _id);
    checkouts[index].debts.splice(debt, 1);
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + id, JSON.stringify(checkouts[index]));
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };

  onNameChange = async (inputValue: string, id: string, _id: string) => {
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === id);
    let _index = checkouts[index].debts.findIndex((el) => el._id === _id);
    checkouts[index].debts[_index].name = inputValue;
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + id, JSON.stringify(checkouts[index]));
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };

  onValueChange = async (inputValue: string, id: string, _id: string) => {
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === id);
    let _index = checkouts[index].debts.findIndex((el) => el._id === _id);
    checkouts[index].debts[_index].value = inputValue;
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + id, JSON.stringify(checkouts[index]));
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };

  deleteCheckout = async (id: string) => {
    const checkout = this.state.checkouts.filter(
      (checkout) => checkout.id != id
    );
    this.setState({ checkouts: checkout });
    try {
      await AsyncStorage.removeItem("@" + id);
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };
  deleteAll = async () => {
    if (this.state.checkouts.length === 0) {
      alert("Δεν υπάρχουν διαθέσια ταμεία");
      this.onPresstoggleDeleteAllModal();
    } else {
      this.setState({ checkouts: [] });

      let keys = await this.getKeys();

      for (let i in keys) {
        if (keys[i] !== null) {
          try {
            await AsyncStorage.removeItem(keys[i]);
          } catch (e) {
            console.log("error:Tasks cannot be retrieved");
          }
        }
      }
      this.onPresstoggleDeleteAllModal();
    }
  };
  onPresstoggleModal = (item: checkouts) => {
    this.setState({ showModal: true, selectedItem: item });
    console.log(item);
  };
  onPressCloseModal = () => {
    this.setState({ showModal: false });
  };
  onPresstoggleDeleteAllModal = () => {
    this.setState({ deleteAllModal: !this.state.deleteAllModal });
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Header showDeleteAllModal={this.onPresstoggleDeleteAllModal} />

          <DebtsModal
            item={this.state.selectedItem}
            onValueChange={this.onValueChange}
            onNameChange={this.onNameChange}
            checkouts={this.state.checkouts}
            showModal={this.state.showModal}
            closeModal={() => this.onPressCloseModal()}
            newDebt={this.newDedt}
            deleteDebt={this.deleteDebt}
          />

          <DeleteAllModal
            deleteAll={this.deleteAll}
            modalVisibility={this.state.deleteAllModal}
            closeModal={() => this.onPresstoggleDeleteAllModal()}
          />
          {this.state.checkouts.length === 0 ? (
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
              data={this.state.checkouts}
              renderItem={({ item }) => (
                <Item
                  showModal={() => this.onPresstoggleModal(item)}
                  id={item.id}
                  title={item.title}
                  debts={item.debts}
                  deleteCheckout={this.deleteCheckout}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}

          <FloatActionButton newCheckout={() => this.newCheckout()} />
          <Text style={{ fontSize: 10, textAlign: "center", opacity: 0.2 }}>
            Created by{" "}
            <Text
              style={{ fontFamily: "Poppins-Medium" }}
              onPress={() => Linking.openURL("https://manosgou.herokuapp.com/")}
            >
              {" "}
              Manos Gouvrikos
            </Text>
          </Text>
        </SafeAreaView>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.getFonts}
          onFinish={() => {
            this.setState({ fontsLoaded: true });
          }}
        />
      );
    }
  }
}
