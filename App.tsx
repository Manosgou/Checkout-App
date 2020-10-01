import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, View, Modal } from "react-native";
import moment from "moment";
//components
import Header from "./components/Header";
import FloatActionButton from "./components/FloatActionButton";
import Item from "./components/Item";
import DebtsModal from "./components/DebtsModal";

interface debts {
  _id:string;
  name: string;
  value: string;
}

interface checkouts {
  id: string;
  title: string;
  debts: debts[];
}

interface IState {
  selectedItem:checkouts;
  showModal: boolean;
  checkouts: checkouts[];
}

export default class App extends Component<IState> {
  state: IState = {
    selectedItem:{id:'',title:'',debts:[]},
    showModal: false,
    checkouts: [
      { id: 'test1', title: "22/5/2020", debts: [{ _id:"1",name: "Dei", value: "50" },{_id:"2", name: "Nero", value: "200" },{_id:'3' ,name: "Trip", value: "70" }] },
      { id: "test2", title: "24/12/2022", debts: [{ _id:"01", name: "OTE", value: "150" },{ _id:"02", name: "BENZO", value: "2000" }] },
    ],
  };
  newCheckout = () => {
    // let id = Math.random().toString();
    // console.log(id);
    // this.setState({
    //   checkouts: [
    //     {
    //       id: id,
    //       title: moment().format("ll"),
    //     },
    //     ...this.state.checkouts,
    //   ],
    // });
    console.log(this.state.checkouts)
  };

  onNameChange = (inputValue:string,cId:string,dId:string) => {
    let checkouts = [...this.state.checkouts];
    let index0 = checkouts.findIndex((el) => el.id === cId);
    let index1 = checkouts[index0].debts.findIndex((el) => el._id === dId);
    checkouts[index0].debts[index1].name = inputValue;
    this.setState({checkouts})
      
     
  };

  onValueChange = (inputValue:string,cId:string,dId:string) => {
    let checkouts = [...this.state.checkouts];
    let index0 = checkouts.findIndex((el) => el.id === cId);
    let index1 = checkouts[index0].debts.findIndex((el) => el._id === dId);
    checkouts[index0].debts[index1].value = inputValue;
    this.setState({checkouts})
      
     
  };


  onPresstoggleModal = (item:checkouts) => {
    this.setState({ showModal: true,selectedItem:item });
    console.log(item);
  };
  onPressCloseModal =()=>{
    this.setState({ showModal: false})
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <DebtsModal item={this.state.selectedItem} onValueChange={this.onValueChange} onNameChange ={this.onNameChange} checkouts={this.state.checkouts} showModal={this.state.showModal} closeModal={() => this.onPressCloseModal()} />
        <FlatList
          data={this.state.checkouts}
          renderItem={({ item }) => (
            <Item

              showModal={() => this.onPresstoggleModal(item)}
              id={item.id}
              title={item.title}
              
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <FloatActionButton newCheckout={() => this.newCheckout()} />
      </SafeAreaView>
    );
  }
}
