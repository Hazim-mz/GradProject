import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import EditInput from './EditInput';
import { GlobalStyles } from "../../constants/styles";

function EditRoomInfo({ setMenCoun, setWomenCoun, setMenBath, setWomanBath, MCplaceHolder, WCplaceHolder, MBplaceHolder, WBplaceHolder, setMenDining, setWomanDining }) {
  function updateRoomInfoHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'menCouncil':
        setMenCoun(enteredValue);
        break;
      case 'womanCouncil':
        setWomenCoun(enteredValue);
        break;
      case 'menBathroom':
        setMenBath(enteredValue);
        break;
      case 'womanBathroom':
        setWomanBath(enteredValue);
        break;
      case 'menDining':
        setMenDining(enteredValue);
        break;
      case 'womanDining':
        setWomanDining(enteredValue);
        break;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.roomInformationTitle}>
        <Text style={styles.boldName}>Hall Rooms Information :</Text>
      </View>
      <ScrollView
        style={styles.roomInformationContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.roomInformation}>
          
          <MaterialCommunityIcons name="sofa-outline" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput
              placeholder={MCplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'menCouncil')}
              keyboardType="number-pad"

            />
            <Text style={styles.boldName2}> men's council</Text>
          </View>

        </View>

        <View style={styles.roomInformation}>
          
          <MaterialCommunityIcons name="sofa-outline" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput
              placeholder={WCplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'womanCouncil')}
              keyboardType="number-pad"
            />
            <Text style={styles.boldName2}> woman's council</Text>
          </View>

        </View>

        <View style={styles.roomInformation}>
          
          <MaterialCommunityIcons name="table-chair" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput placeholder={MBplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'menDining')}
              keyboardType="number-pad"
            />
            <Text style={styles.boldName2}> men's dining</Text>
          </View>

        </View>

        <View style={styles.roomInformation}>

          <MaterialCommunityIcons name="table-chair" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput placeholder={MBplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'womanDining')}
              keyboardType="number-pad"
            />
            <Text style={styles.boldName2}> woman's Dining</Text>
          </View>

        </View>

        <View style={styles.roomInformation}>

          <MaterialCommunityIcons name="toilet" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput placeholder={MBplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'menBathroom')}
              keyboardType="number-pad"
            />
            <Text style={styles.boldName2}> men's bathroom</Text>
          </View>

        </View>


        <View style={styles.roomInformation}>

          <MaterialCommunityIcons name="toilet" size={40} color={GlobalStyles.colors.primary10} />
          <View style={styles.Dirction}>
            <EditInput placeholder={WBplaceHolder}
              onUpdateValue={updateRoomInfoHandler.bind(this, 'womanBathroom')}
              keyboardType="number-pad"
            />
            <Text style={styles.boldName2}> woman's bathroom</Text>
          </View>
          
        </View>

      </ScrollView>
    </View>
  );
}

export default EditRoomInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 3,
  },
  roomInformationTitle: {
    flex: 1,
    borderRadius: 3,
    borderBottomRightRadius: 0,
    paddingTop: 8,
    paddingLeft: 6,
  },
  roomInformationContainer: {
    flex: 1,
    height: 220,
    borderRadius: 3,
    borderTopRightRadius: 0,
  },
  roomInformation: {
    flex: 1,
    height: 120,
    width: 120,
    marginTop: 24,
    marginHorizontal: 20,
    borderColor: '#cccdb2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.15,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30
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
