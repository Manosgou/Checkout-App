import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//colours
import { Colours } from "../Colours";

interface debts {
  _id: string;
  name: string;
  value: string;
}

interface Props {
  id: string;
  title: string;
  debts: debts[];
  showModal: () => void;
  deleteCheckout: (id: string) => void;
}

export default class Item extends Component<Props> {
  render() {
    const { title, showModal, debts, id, deleteCheckout } = this.props;
    const total = debts.reduce(
      (accum, item) => accum + parseFloat(item.value),
      0
    );
    return (
      <TouchableOpacity style={styles.item} onPress={showModal}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                color: Colours.primaryTextColour,
              }}
            >
              Σύνολο:{" "}
              {isNaN(total) ? (
                <Text> - </Text>
              ) : (
                <Text>{total.toFixed(2)}</Text>
              )}
              €
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                color: Colours.primaryTextColour,
              }}
            >
              Αρ.παραγγελιών: {debts.length}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => deleteCheckout(id)}>
              <MaterialCommunityIcons name="delete" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colours.primaryColour,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    elevation: 5,
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Poppins-Medium",
    color: Colours.primaryTextColour,
  },
  itemTotal: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: Colours.primaryTextColour,
  },
});
