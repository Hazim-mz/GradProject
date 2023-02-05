import { View, Text, Pressable, StyleSheet} from "react-native";
import { useEffect, useState, useContext } from "react";

import { Colors } from "../../constants/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function AcceptView({ id, name, record, email, accept, reject }) {
    return (
      <View style={styles.cardi}>
        <View style={styles.Allspace}>
          <View style={styles.dirc}>
            <Ionicons name="person" size={24} color={Colors.primary800} />
            <Text style={styles.textspace}>{name}</Text>
          </View>
          <View style={styles.dirc}>
            <FontAwesome name="id-card" size={24} color="black" />
            <Text style={styles.textspace}>{record}</Text>
          </View>
          <View style={styles.dirc}>
            <Entypo name="email" size={24} color="black" />
            <Text style={styles.textspace}>{email}</Text>
          </View>
        </View>
        <View style={styles.buttonspace}>
          <Pressable
            style={({ pressed }) => [
              styles.button1,
              styles.green,
              pressed && styles.pressed,
            ]}
            onPress={accept.bind(this, id)}
          >
            <View>
              <Text style={styles.buttonText}>Accept</Text>
            </View>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button1,
              styles.red,
              pressed && styles.pressed,
            ]}
            onPress={reject.bind(this, id)}
          >
            <View>
              <Text style={styles.buttonText}>Reject</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
}

export default AcceptView;

const styles = StyleSheet.create({
  noOwnercontainer:{
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noOwnerText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  container:{
    flex: 1
  },
  cardi: {
    margin: "2%",
    borderWidth: 1,
    backgroundColor: Colors.lightgrey,
    borderRadius: 10,
    paddingLeft: 3,
  },
  textspace: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    margin: 3,
  },
  buttonspace: {
    flexDirection: "row",
    marginLeft: "40%",
    // backgroundColor: "black",
  },
  dirc: {
    flexDirection: "row",
    margin: 3,
  },
  Allspace: {
    flex: 4,
  },
  green: {
    backgroundColor: "green",
  },
  red: {
    backgroundColor: "red",
  },
  button1: {
    marginLeft: 15,
    padding: 2,
    height: 55,
    width: "40%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
