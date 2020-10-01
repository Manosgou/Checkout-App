import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface debts {
  _id: string;
  name: string;
  value: string;
}

interface Props {
  id: string;
  title: string;
  debts: debts[];
  showModal(): void;
}

export default class Item extends Component<Props> {
  render() {
    const { title, showModal, debts } = this.props;
    return (
      <TouchableOpacity style={styles.item} onPress={showModal}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemTotal}>
          Total:{" "}
          {debts.reduce((accum, item) => accum + parseInt(item.value), 0)}€
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#036704",
    borderRadius: 20,
    padding: 15,
    margin: 15,
    elevation: 5,
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 25,
  },
  itemTotal: {
    fontSize: 18,
  },
});
