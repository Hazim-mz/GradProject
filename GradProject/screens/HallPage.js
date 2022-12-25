import { useLayoutEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Button,StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { HALLS } from '../data/dummy-data';
import { COMMENTS } from '../data/dummy-data2';
import HallImage from "../components/common/HallImage";
import { GlobalStyles } from "../constants/styles";
import MainInformation from "../components/hallCom/MainInformation";
import RoomInformation from "../components/hallCom/RoomInformation";
import ServiecesIcon from "../components/hallCom/ServiecesIcon";
import DescriptionInformation from "../components/hallCom/DescriptionInformation";
import ServiecesInformation from "../components/hallCom/ServiecesInformation";
import HallForm from "../components/ManageHall/HallForm";
import EnterReview from "../components/hallCom/EnterReview";
import HallComment from "../components/hallCom/HallComment";

import { auth,db,storage } from '../config'; 
import { addDoc, collection } from 'firebase/firestore';


function HallPage({route, navigation}){

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return(
                    <Pressable
                    >
                        <View>
                        </View>
                    </Pressable>
                );
            }
        });
    }, [navigation]);

    //معلومات القاعة
    const displayedHall ={
        id: route.params.hallId,
        name: route.params.hallName,
        description: route.params.hallDescription,
        price: route.params.hallPrice,
        guests: route.params.hallGuests,
        imageUrl: route.params.hallImageUrl,
        services: route.params.hallServices,
        bookedDays: route.params.hallBookedDays
    };


    const displayedComment = COMMENTS.filter((commentItem) => {
        return commentItem.hallID == displayedHall.id;
    });

    function pressLoctionHandler(){
        return;
    }
    const hallReservation = async(hallsID, date, price, userID) => {
        const ReservationID = await addDoc(collection(db, "Reservation"), {
            HallsID: hallsID,
            Date: date,
            Price: price,
            UserID: userID
        }).
        then(()=>{
            alert("The hall is booked successsfilly");
        })
        navigation.navigate('Bookings');
    }

    return(
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <HallImage 
                        data={displayedHall.imageUrl}
                        style={styles.imageContainer}
                    />
                </View>

                <ScrollView style={{flex: 1}}>
                    <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                        <View style={styles.InfoContainer}>

                            {/* المعلومات الاساسية */}
                            <MainInformation data={displayedHall} onPressLocation={pressLoctionHandler} onPressBook={hallReservation} />

                            <View style={styles.line}></View>

                            {/* المعلومات الغرف */}
                            <RoomInformation />
                            
                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>

                                {/* تعريف القاعة  */}
                                <DescriptionInformation description={displayedHall.description}/>

                                {/* الخدمات */}
                                <ServiecesInformation services={displayedHall.services}/>
                                
                            </View>

                            <View style={styles.line}></View>

                            <EnterReview />

                            <View style={styles.line2}></View>

                            <HallComment data={displayedComment}/>
                            

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

export default HallPage;

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    imageContainer:{
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',
    },
    InfoContainer:{
        flex: 1,
    },
    mainInfoContainer:{
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderRadius: 3,
        backgroundColor: 'white',
        flexDirection: 'column',
        
    },
    line:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        margintop: 4,
        marginBottom: 6,
    },
    line2:{
        backgroundColor:'white',
        borderBottomWidth: 1,
        marginRight: 60,
        marginLeft: 4,
    },
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign:'center',
    },
    normalName:{
        fontSize: 12,
        textAlign:'center',
    },
    descServContainer:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius:3,
        marginHorizontal: 4,
        paddingTop:8,
        paddingLeft:6,
    },
    commentContainer:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius:3,
        marginHorizontal: 4,
        paddingTop:8,
        paddingLeft:6,
        minHeight: 180,
    },
    textIput1:{
        color: GlobalStyles.colors.primary700,
        borderWidth: 2,
        borderColor: '#dfa4f5',
        marginTop: 4,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        minHeight: 100,
        maxHeight: 150,
        textAlignVertical: 'top',
    },
    ratingContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingContainer2:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
    },
});
