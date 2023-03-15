import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import Star from "../common/Star";

function AdminMainInformation({ data, onPressLocation, isBloked, onPressBlock }) {
  return (
    <View style={styles.mainInfoContainer}>
      <View style={styles.maininfo}>
        <View>
          <Text style={styles.boldName}>{data.name}</Text>
        </View>
        <View style={styles.maininfo2}>
          <Text style={styles.boldName}>{data.price}</Text>
          <Text style={styles.normalName}> SR</Text>
        </View>
      </View>

      <View style={styles.maininfo}>
        <View style={styles.maininfo2}>
          <View>
            <MaterialCommunityIcons
              name="account-group"
              size={30}
              color={GlobalStyles.colors.primary10}
            />
          </View>
          <View style={styles.guestsInfoContainer}>
            <Text style={{ fontSize: 17 }}>{data.guests}, </Text>
            <Text style={{ fontSize: 17 }}>Guests</Text>
          </View>
        </View>
        <Star rate={data.rate} size={18} />
      </View>

      <View style={styles.maininfo3}>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.maininfo2] : styles.maininfo2
          }
          onPress={onPressLocation}
        >
          <View>
            <FontAwesome5
              name="map-marked-alt"
              size={25}
              color={GlobalStyles.colors.primary10}
            />
          </View>
          <View style={styles.loctionInfoContainer}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Location</Text>
          </View>
        </Pressable>

          {
            isBloked ?
              <Pressable
                style={({ pressed }) => [styles.unblockbutton, pressed && styles.pressed]}
                onPress={onPressBlock}
              >
                <Text style={styles.unblockText}>UnBlock Hall</Text>
              </Pressable>
            :
              <Pressable
                style={({ pressed }) => [styles.blockbutton, pressed && styles.pressed]}
                onPress={onPressBlock}
              >
                <Text style={styles.blockText}>Block Hall</Text>
              </Pressable>
          }

      </View>
    </View>
  );
}

export default AdminMainInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    width: 375,
    height: 282,
    overflow: "hidden",
  },
  InfoContainer: {
    flex: 1,
  },
  mainInfoContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginHorizontal: 4,
    borderRadius: 3,
    backgroundColor: "white",
  },
  maininfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  maininfo2: {
    flexDirection: "row",
  },
  guestsInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 2,
  },
  maininfo3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    alignItems: 'center'
  },
  loctionInfoContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginTop: 6,
    marginLeft: 6,
  },
  unblockbutton: {
    height: 40,
    width: "28%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#e0372d",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  blockbutton: {
    height: 40,
    width: "28%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  pressed: {
    opacity: 0.7,
  },
  unblockText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  blockText: {
    textAlign: "center",
    color: "#e0372d",
    fontSize: 14,
    fontWeight: "bold",
  },
  boldName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  normalName: {
    fontSize: 20,
  },
  button: {
    opacity: 0.8,
  },
});
