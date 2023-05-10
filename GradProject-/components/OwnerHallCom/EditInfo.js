import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import EditInput from './EditInput';


function EditInfo({ data, setName, setPrice, setGuests }) {

  function updateInformationHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setName(enteredValue);
        break;
      case 'price':
        setPrice(enteredValue);
        break;
      case 'guests':
        setGuests(enteredValue);
        break;
    }
  }


  return (
    <View style={styles.mainInfoContainer}>


      <View style={styles.maininfo}>

        <Text style={styles.boldName}>Hall Name</Text>
        <EditInput
          placeholder={data.name}
          onUpdateValue={updateInformationHandler.bind(this, 'name')}

        />
      </View>
      <View style={styles.maininfo}>
        <Text style={styles.boldName}>Price</Text>
        <EditInput
          placeholder={data.price}
          onUpdateValue={updateInformationHandler.bind(this, 'price')}
          keyboardType="number-pad"
        />
      </View>


      <View style={styles.maininfo}>
        <Text style={styles.boldName}>Guest capacity</Text>

        <EditInput
          placeholder={data.guests}
          onUpdateValue={updateInformationHandler.bind(this, 'guests')}
          keyboardType="number-pad"
        />
      </View>


    </View>


  );
}

export default EditInfo;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: 375,
    height: 282,
    overflow: 'hidden',
  },
  InfoContainer: {
    flex: 1,
  },
  mainInfoContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginHorizontal: 3,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  maininfo: {
    flexDirection: 'coulmn',
    marginVertical: 3
    //justifyContent: 'space-between',

  },
  maininfo2: {
    flexDirection: 'row',
  },
  maininfo3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  guestsInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 2,
  },

  line: {
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginHorizontal: 30,
    marginVertical: 4,
  },
  boldName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  normalName: {
    fontSize: 20,
  },


  container: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 3,
  },
  roomInformationTitle: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 3,
    borderBottomRightRadius: 0,
    paddingTop: 8,
    paddingLeft: 6,
  },
  roomInformationContainer: {
    flex: 1,
    height: 220,
    backgroundColor: "white",
    borderRadius: 3,
    borderTopRightRadius: 0,
  },
  roomInformation: {
    flex: 1,
    height: 180,
    width: 180,
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: "#dfa4f5",
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.15,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  boldName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boldName2: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30
  },
  normalName: {
    fontSize: 12,
    textAlign: "center",
  },
  Dirction: {
    flexDirection: "row",
    justifyContent: "center"

  }
});
