import { View, Text, Button, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import ServiecesIcon from "../../components/hallCom/ServiecesIcon";

function Services({ setServices, services }) {

  function onPress(text) {
    setServices((current) =>
      current.map((obj) => {
        if (obj.name === text) {
          if (text == "Coffee") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Incense") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Catering") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Valet Parking") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Janitors") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Hospitality") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }
          else if (text == "Deserts") {
            return { ...obj, isAvailable: !obj.isAvailable };
          }

        }

        return obj;
      })
    );
  }
  //console.log(services);

  return (
    <>
      <Text style={styles.boldName}>Services: </Text>
      <Text>icons are clickable </Text>
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.serviecesContainer}
        >
          <Pressable onPress={onPress.bind(this, "Coffee")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[0].isAvailable ?
                <ServiecesIcon name={"Coffee"} color="green" />
                :
                <ServiecesIcon name={"Coffee"} color="red" />
              }
              <Text>Tea Boy</Text>
            </View>
          </Pressable>

          <Pressable onPress={onPress.bind(this, "Incense")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[1].isAvailable ?
                <ServiecesIcon name={"Incense"} color="green" />
                :
                <ServiecesIcon name={"Incense"} color="red" />
              }
              <Text>Incense</Text>
            </View>
          </Pressable>


          <Pressable onPress={onPress.bind(this, "Catering")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[2].isAvailable ?
                <ServiecesIcon name={"Catering"} color="green" />
                :
                <ServiecesIcon name={"Catering"} color="red" />
              }
              <Text>Catering</Text>
            </View>
          </Pressable>

          <Pressable onPress={onPress.bind(this, "Valet Parking")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[3].isAvailable ?
                <ServiecesIcon name={"Valet Parking"} color="green" />
                :
                <ServiecesIcon name={"Valet Parking"} color="red" />
              }
              <Text>Valet Parking</Text>
            </View>
          </Pressable>

          <Pressable onPress={onPress.bind(this, "Janitors")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[4].isAvailable ?
                <ServiecesIcon name={"Janitors"} color="green" />
                :
                <ServiecesIcon name={"Janitors"} color="red" />
              }
              <Text>Janitors</Text>
            </View>
          </Pressable>

          <Pressable onPress={onPress.bind(this, "Hospitality")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[5].isAvailable ?
                <ServiecesIcon name={"Hospitality"} color="green" />
                :
                <ServiecesIcon name={"Hospitality"} color="red" />
              }
              <Text>Hospitality</Text>
            </View>
          </Pressable>

          <Pressable onPress={onPress.bind(this, "Deserts")}
            style={({ pressed }) => [styles.b, pressed && styles.pressed]}
          >
            <View style={styles.iconContainer}>
              {services[6].isAvailable ?
                <ServiecesIcon name={"Deserts"} color="green" />
                :
                <ServiecesIcon name={"Deserts"} color="red" />
              }
              <Text>Deserts</Text>
            </View>
          </Pressable>

        </ScrollView>
      </View>
    </>
  );
}

export default Services;
const styles = StyleSheet.create({
  serviecesContainer: {
    flex: 1,
    height: 150,
  },
  b: {
  },
  label: {
    marginBottom: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    margin: 4,
  },
  boldName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxText: {
    textAlign: "center",
    fontSize: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
  },
  pressed: {
    opacity: 0.7,
  },
});
