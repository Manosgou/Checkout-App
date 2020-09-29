import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import moment from 'moment';
//components
import Header from "./components/Header";
import FloatActionButton from "./components/FloatActionButton";
import Item from './components/Item';

interface checkouts{
  id:string;
  title:string;
  total:number;
  
}

interface State{
  checkouts:checkouts[]
}


export default class App extends Component <State> {
  newCheckout=()=>{
    
    let id = Math.random().toString();
    console.log(id);
    this.setState({
      checkouts:[{
        id:id,
        title:moment().format("ll"),
        

      },...this.state.checkouts]
    })
  }

  state:Readonly<State>={
    checkouts:[]
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <FlatList
        data={this.state.checkouts}
              renderItem={({ item }) => (
                <Item title={item.title} total={item.total} />
              )}
              keyExtractor={(item) => item.id}
            />
         <FloatActionButton newCheckout={()=>this.newCheckout()} />
      </SafeAreaView>
    );
  }
}
