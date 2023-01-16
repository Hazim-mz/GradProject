import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Button, Platform, StyleSheet } from "react-native";
import { useScrollToTop } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import DropDownPicker from 'react-native-dropdown-picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import HallImage from "../../components/common/HallImage";
import { GlobalStyles } from "../../constants/styles";
import MainInformation from "../../components/hallCom/MainInformation";
import RoomInformation from "../../components/hallCom/RoomInformation";
import DescriptionInformation from "../../components/hallCom/DescriptionInformation";
import ServiecesInformation from "../../components/hallCom/ServiecesInformation";
import EnterReview from "../../components/hallCom/EnterReview";
import HallComment from "../../components/hallCom/HallComment";
import LodingOverlay from "../../components/UI/LodingOverlay";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';



function HallPage({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);//for loding if book hall
    const [openReport, setOpenReport] = useState(false);

    //report on hall
    function reportOnHall(){
        if(openReport){
            setOpenReport(false);
        }
        else{
            setOpenReport(true);
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable onPress={reportOnHall} style={({pressed}) => pressed ? styles.pressable1 : null}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />                    
                    </Pressable>
                );
                
            }
        });
    }, [navigation, reportOnHall]);

    async function addReportToHall (){
        const docRef = doc(db, "Halls",  displayedHall.id);

        await updateDoc(docRef, {
            Report: displayedHall.report+1
        });
    }

    //معلومات القاعة
    const displayedHall ={
        id: route.params.hallId,
        name: route.params.hallName,
        description: route.params.hallDescription,
        price: route.params.hallPrice,
        guests: route.params.hallGuests,
        imageUrl: route.params.hallImageUrl,
        services: route.params.hallServices,
        locationOfHall: route.params.locationOfHall,
        locationOfUser: route.params.locationOfUser,
        report: route.params.hallReport,
        rate: route.params.hallRate,
    };

    //the booked date of hall
    const [bookedDates, setBookedDates] = useState([]);
    const [reviews, setReviews] = useState([]);//the reviews of the hall
    useEffect(()=>{
        //get the booked date
        const dates = query(collection(db, "Reservation"), where("HallsID", "==", displayedHall.id));
        onSnapshot(dates, (Reservation) =>{
            setBookedDates(Reservation.docs.map((reservations) =>({
                    id: reservations.id,
                    data: reservations.data()
                }))
            )
        });
        //get the reviews 
        const review = query(collection(db, "Review"), where("HallsID", "==", displayedHall.id));
        onSnapshot(review, (Comment) =>
            setReviews(Comment.docs.map((comment) =>({
                    id: comment.id,
                    data: comment.data()
                }))
            )
        );
    },[]);
    //console.log(reviews);

   
    //get location of the hall
    function pressLoctionHandler(){
        const tempIos ="googleMaps://app?saddr="+displayedHall.locationOfUser.latitude+", "+displayedHall.locationOfUser.longitude+"&daddr="+displayedHall.locationOfHall.latitude+", "+displayedHall.locationOfHall.longitude;
        const tempAndroid ="google.navigation:q="+displayedHall.locationOfHall.latitude+", "+displayedHall.locationOfHall.longitude;
        Linking.openURL(
            Platform.OS === 'ios'
              ? tempIos
              : tempAndroid,
        );  
    }
    //console.log(displayedHall.locationOfHall);

    //add new Reservation
    const hallReservation = async(hallsID, date, price, userID) => {
        setIsSubmitting(true);
        const ReservationID = await addDoc(collection(db, "Reservation"), {
            HallsID: hallsID,
            Date: date,
            Price: price,
            UserID: userID
        }).
        then(()=>{
            setIsSubmitting(false);
            alert("The hall is booked successsfilly");
        })
        navigation.navigate('Bookings');
    }
    //console.log(displayedHall.bookedDays);
    
    //add new Review
    const addReview = async(comment, rate, userID) => {
        //4+3+2 == 9/3 the rate 3
        let rateOfhall = (reviews.length * displayedHall.rate) + rate;//3*3+5 = 14
        rateOfhall = rateOfhall/(reviews.length+1);//14/4 = 3.5 new rate
        
        const ComentID = await addDoc(collection(db, "Review"), {
            HallsID: displayedHall.id,
            Comment: comment,
            Rate: rate,
            UserID: userID
        })
        const docRef = doc(db, "Halls", displayedHall.id);

        await updateDoc(docRef, {
            Rate: rateOfhall
        });
    }

    //get today date for cleander
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var todayDate ;
    if(day < 10)
        todayDate = year + '-' + month + '-0'+day;
    else if(month < 10)
        todayDate = year + '-0' + month + '-'+day;
    else
        todayDate = year + '-' + month + '-'+day;

    if(isSubmitting){
        return <LodingOverlay text={"The hall is now booked, wait a second"}/>;
    }

    return(
        <View style={styles.container}>
            <ScrollView 
                style={{flex: 1}}
            >
                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                    <HallImage 
                        data={displayedHall.imageUrl}
                        style={styles.imageContainer}
                        press={false}
                    />

                </View>

                <ScrollView style={{flex: 1}}>
                    <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                        <View style={styles.InfoContainer}>
                            
                            {/* المعلومات الاساسية */}
                            <MainInformation 
                                data={displayedHall} 
                                onPressLocation={pressLoctionHandler} 
                                onPressBook={hallReservation} 
                                todayDate={todayDate}
                                bookedDates={bookedDates}
                            />

                            <View style={styles.line}></View>

                            {/* المعلومات عن الغرف */}
                            <RoomInformation />
                            
                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>

                                {/* تعريف القاعة  */}
                                <DescriptionInformation description={displayedHall.description}/>

                                {/* الخدمات */}
                                <ServiecesInformation services={displayedHall.services}/>
                                
                            </View>

                            <View style={styles.line}></View>

                            <EnterReview onPress={addReview} />

                            <View style={styles.line2}></View>

                            <HallComment reviews={reviews} />
                            

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScrollView>
            {
            openReport 
                ? 
                    <View style={styles.reportContainer}>
                        <Pressable 
                            style={({pressed}) => pressed ? [styles.reportTextContainer, styles.pressable1] : styles.reportTextContainer }
                            onPress={addReportToHall}
                        >
                            <Text style={styles.reportText}>Report</Text>
                        </Pressable>
                    </View>
                :
                    <View></View>
            }
        </View>
    );
}

export default HallPage;

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    pressable1:{
        opacity: 0.7
    },
    imageContainer:{
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',
        
    },
    reportContainer:{
        position:'absolute', 
        minHeight: 55,
        minWidth: 60, 
        backgroundColor:'black',
        opacity: 0.7,
        marginRight: 26,
        paddingLeft: 2,
        paddingTop: 4,
        alignItems: 'center',
        right: 2,
        top: 0,
        borderWidth:1,
        borderBottomRightRadius:2,
        borderBottomLeftRadius: 2,
    },
    reportTextContainer:{
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    reportText:{
        color: 'white',
        marginBottom: 2,
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
