import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Button, Platform, StyleSheet } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import * as Linking from "expo-linking";
import DropDownPicker from "react-native-dropdown-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import HallImage from "../../components/Common/HallImage";
import { GlobalStyles } from "../../constants/styles";
import AdminMainInformation from "../../components/AdminHomeCom/AdminMainInformation";
import RoomInformation from "../../components/HallCom/RoomInformation";
import DescriptionInformation from "../../components/HallCom/DescriptionInformation";
import ServiecesInformation from "../../components/HallCom/ServiecesInformation";
import EnterReview from "../../components/HallCom/EnterReview";
import AdminHallComment from "../../components/AdminHomeCom/AdminHallComment";
import LodingOverlay from "../../components/UI/LodingOverlay";

import { db } from "../../config";
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";

function AdminHallPage({ route, navigation }) {

  //console.log(isBlocked);

  //معلومات القاعة
  const displayedHall = {
    id: route.params.hallId,
    name: route.params.hallName,
    description: route.params.hallDescription,
    price: route.params.hallPrice,
    guests: route.params.hallGuests,
    imageUrl: route.params.hallImageUrl,
    services: route.params.hallServices,
    menCoun: route.params.hallMenCoun,
    womanCoun: route.params.hallWomanCoun,
    menBath: route.params.hallMenBath,
    womanBath: route.params.hallWomanBath,
    menDin: route.params.hallMenDin,
    womanDin: route.params.hallWomanDin,
    locationOfHall: route.params.locationOfHall,
    locationOfUser: route.params.locationOfUser,
    report: route.params.hallReport,
    rate: route.params.hallRate,
    isBlocked: route.params.HallIsBlocked,
  };

  const [isBlocked, setIsBlocked] = useState(displayedHall.isBlocked);

  async function blockHall() {
    const docRef = doc(db, "Halls", displayedHall.id);

    await updateDoc(docRef, {
      isBlocked: !isBlocked,
      Report: 0
    });
    setIsBlocked(!isBlocked);

  }

  //the booked date of hall
  const [bookedDates, setBookedDates] = useState([]);
  const [reviews, setReviews] = useState([]); //the reviews of the hall
  const [replays, setReplays] = useState([]);//the replay of the owner
  useEffect(() => {
    //get the booked date
    const dates = query(collection(db, "Reservation"), where("HallsID", "==", displayedHall.id));
    onSnapshot(dates, (Reservation) => {
      setBookedDates(
        Reservation.docs.map((reservations) => ({
          id: reservations.id,
          data: reservations.data(),
        }))
      );
    });

    //get the reviews
    const review = query(collection(db, "Review"), where("HallsID", "==", displayedHall.id));
    onSnapshot(review, (Comment) =>
      setReviews(
        Comment.docs.map((comment) => ({
          id: comment.id,
          data: comment.data(),
        }))
      )
    );

    //get the replay 
    const replay = query(collection(db, "ReplayToReview"), where("HallsID", "==", displayedHall.id));
    onSnapshot(replay, (Replays) =>
        setReplays(Replays.docs.map((Replay) =>({
                id: Replay.id,
                data: Replay.data()
            }))
        )
    );
  }, []);
  //console.log(reviews);

  //get location of the hall
  function pressLoctionHandler() {
    const tempIos =
      "googleMaps://app?saddr=" +
      displayedHall.locationOfUser.latitude +
      ", " +
      displayedHall.locationOfUser.longitude +
      "&daddr=" +
      displayedHall.locationOfHall.latitude +
      ", " +
      displayedHall.locationOfHall.longitude;
    const tempAndroid =
      "google.navigation:q=" +
      displayedHall.locationOfHall.latitude +
      ", " +
      displayedHall.locationOfHall.longitude;
    Linking.openURL(Platform.OS === "ios" ? tempIos : tempAndroid);
  }
  //console.log(displayedHall.locationOfHall);

  //add new Reservation

  //console.log(displayedHall.bookedDays);

  //add new Review

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <HallImage
            data={displayedHall.imageUrl}
            style={styles.imageContainer}
            press={false}
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.InfoContainer}>
              {/* المعلومات الاساسية */}
              <AdminMainInformation
                data={displayedHall}
                onPressLocation={pressLoctionHandler}
                isBloked={isBlocked}
                onPressBlock={blockHall}
              />

              <View style={styles.line}></View>

              {/* المعلومات عن الغرف */}
              <RoomInformation 
                menCoun={displayedHall.menCoun} 
                menBath={displayedHall.menBath} 
                womanCoun={displayedHall.womanCoun} 
                womanBath={displayedHall.womanBath} 
                menDin={displayedHall.menDin}
                womanDin={displayedHall.womanDin}
              />

              <View style={styles.line}></View>

              <View style={styles.descServContainer}>
                {/* تعريف القاعة  */}
                <DescriptionInformation
                  description={displayedHall.description}
                />

                {/* الخدمات */}
                <ServiecesInformation services={displayedHall.services} />
              </View>

              <View style={styles.line}></View>

              <AdminHallComment reviews={reviews} replays={replays}/>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

export default AdminHallPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable1: {
    opacity: 0.7,
  },
  imageContainer: {
    flex: 1,
    width: 375,
    height: 282,
    overflow: "hidden",
  },
  reportContainer: {
    position: "absolute",
    minHeight: 55,
    minWidth: 60,
    backgroundColor: "black",
    opacity: 0.7,
    marginRight: 26,
    paddingLeft: 2,
    paddingTop: 4,
    alignItems: "center",
    right: 2,
    top: 0,
    borderWidth: 1,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
  },
  reportTextContainer: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  reportText: {
    color: "white",
    marginBottom: 2,
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
    flexDirection: "column",
  },
  line: {
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginHorizontal: 30,
    margintop: 4,
    marginBottom: 6,
  },
  line2: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginRight: 60,
    marginLeft: 4,
  },
  boldName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boldName2: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  normalName: {
    fontSize: 12,
    textAlign: "center",
  },
  descServContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 3,
    marginHorizontal: 4,
    paddingTop: 8,
    paddingLeft: 6,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 3,
    marginHorizontal: 4,
    paddingTop: 8,
    paddingLeft: 6,
    minHeight: 180,
  },
  textIput1: {
    color: GlobalStyles.colors.primary700,
    borderWidth: 2,
    borderColor: "#dfa4f5",
    marginTop: 4,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    minHeight: 100,
    maxHeight: 150,
    textAlignVertical: "top",
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer2: {
    flex: 1,
    flexDirection: "row",
    marginTop: 4,
  },
});
