import React, { Component } from "react";
import { FlatList, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import moment from "moment";
//components
import Header from "./components/Header";
import FloatActionButton from "./components/FloatActionButton";
import Item from "./components/Item";
import DebtsModal from "./components/DebtsModal";

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
  selectedItem: checkouts;
  showModal: boolean;
  checkouts: checkouts[];
}

export default class App extends Component<IState> {
  state: IState = {
    selectedItem: { id: "", title: "", debts: [] },
    showModal: false,
    checkouts: [],
  };

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
      try {
        item = JSON.parse((await AsyncStorage.getItem(keys[i])) || "{}");
        this.setState({ checkouts: [...this.state.checkouts, item] });
      } catch (e) {
        console.log("error:Tasks cannot be retrieved");
      }
    }
  }

  newCheckout = async () => {
    let id = Math.random().toString();
    console.log(id);
    this.setState({
      checkouts: [
        {
          id: id,
          title: moment().format("ll"),
          debts: [],
        },
        ...this.state.checkouts,
      ],
    });
    let checkoutObj = {
      id: id,
      title: moment().format("ll"),
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

  newDedt = (cId: string) => {
    let newInput = { _id: Math.random().toString(), name: "", value: "" };
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === cId);
    checkouts[index].debts.push(newInput);
    this.setState({ checkouts });
  };

  deleteDebt = async (cId: string, dId: string) => {
    let checkouts = [...this.state.checkouts];
    let index = checkouts.findIndex((el) => el.id === cId);
    let debt = checkouts[index].debts.findIndex((debt) => debt._id == dId);
    checkouts[index].debts.splice(debt, 1);
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + cId,JSON.stringify(checkouts[index]));
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };

  onNameChange = async (inputValue: string, cId: string, dId: string) => {
    let checkouts = [...this.state.checkouts];
    let index0 = checkouts.findIndex((el) => el.id === cId);
    let index1 = checkouts[index0].debts.findIndex((el) => el._id === dId);
    checkouts[index0].debts[index1].name = inputValue;
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + cId,JSON.stringify(checkouts[index0]));
    } catch (e) {
      console.log("error:Task cannot be deleted");
    }
  };

  onValueChange = async (inputValue: string, cId: string, dId: string) => {
    let checkouts = [...this.state.checkouts];
    let index0 = checkouts.findIndex((el) => el.id === cId);
    let index1 = checkouts[index0].debts.findIndex((el) => el._id === dId);
    checkouts[index0].debts[index1].value = inputValue;
    this.setState({ checkouts });
    try {
      await AsyncStorage.mergeItem("@" + cId,JSON.stringify(checkouts[index0]));
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

  onPresstoggleModal = (item: checkouts) => {
    this.setState({ showModal: true, selectedItem: item });
    console.log(item);
  };
  onPressCloseModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
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
        <FloatActionButton newCheckout={() => this.newCheckout()} />
      </SafeAreaView>
    );
  }
}
