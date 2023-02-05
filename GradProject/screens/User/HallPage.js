import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Button, Platform, StyleSheet } from "react-native";
import * as Linking from 'expo-linking';

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
import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import GoToLoginPage from "../../components/common/GoToLoginPage";



function HallPage({route, navigation}){
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx); 
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
        ownerID: route.params.ownerID,
        ownerEmail: route.params.ownerEmail,
        ownerNotifAddr: route.params.ownerNotifAddr,
    };

    //the booked date of hall
    const [bookedDates, setBookedDates] = useState([]);
    const [reviews, setReviews] = useState([]);//the reviews of the hall
    const [owner, setOwner] = useState([]);
    const [chat, setChat] = useState([]);
    useEffect(()=>{
        //get the booked date
        const q = query(collection(db, "Reservation"), where("HallsID", "==", displayedHall.id));
        onSnapshot(q, (Reservations) =>{
            setBookedDates(Reservations.docs.map((Reservation) =>({
                    id: Reservation.id,
                    data: Reservation.data()
                }))
            )
        });
        //get the reviews 
        const qq = query(collection(db, "Review"), where("HallsID", "==", displayedHall.id));
        onSnapshot(qq, (Comments) =>
            setReviews(Comments.docs.map((Comment) =>({
                    id: Comment.id,
                    data: Comment.data()
                }))
            )
        );

        const qqq = query(collection(db, "Users"), where("Email", "==", displayedHall.ownerEmail));
        onSnapshot(qqq, (Owners) =>
            setOwner(Owners.docs.map((Owner) =>({
                    id: Owner.id,
                    data: Owner.data()
                }))
            )
        );

        if(userAccountCtx.isAuthenticated){
            const qqqq = query(collection(db, "MessagesRequest"), where('OwnerID', '==', displayedHall.ownerID), where('UserID', '==', userAccountCtx.userID));
            onSnapshot(qqqq, (Owners) =>
                setChat(Owners.docs.map((Owner) =>({
                        id: Owner.id,
                        data: Owner.data()
                    }))
                )
            );
        }


    },[]);

    //chat with owner
    async function contactWithOwner(){

        if(userAccountCtx.isAuthenticated){
            if(chat.length != 0){
                console.log('owner');
                navigation.navigate('Chat', {
                    chatId: chat[0].id,
                    chatReceiverInfo: owner,
                    chatStart: chat[0].data.Start,
                    chatUserID: userAccountCtx.userID,
                    chatUserEmail: userAccountCtx.email,
                    chatUserImage: userAccountCtx.image,
                    chatUserRule: userAccountCtx.rule,
                })
            }
            else{

                const ChatID = await addDoc(collection(db, "MessagesRequest"), {
                    OwnerID: displayedHall.ownerID,
                    Start: false,
                    UserID: userAccountCtx.userID,
                    NewOwnerMes: 0,
                    NewUserMes: 0,
                    TimeOfLastMes: serverTimestamp(),
                    LastMessage: '',
                })

                navigation.navigate('Chat', {
                    chatId: ChatID.id,
                    chatReceiverInfo: owner,
                    chatStart: false,
                    chatUserID: userAccountCtx.userID,
                    chatUserEmail: userAccountCtx.email,
                    chatUserImage: userAccountCtx.image,
                    chatUserRule: userAccountCtx.rule,
                })
            }
        }else{
            openLoginPage();
        }
    }

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

    //check if user login before Book or add Review
    const [goToLoginPageIsVisible, setGoToLoginPageIsVisible] = useState(false);
    function openLoginPage(){
        setGoToLoginPageIsVisible(true);
    }
    function closeLoginPage(){
        setGoToLoginPageIsVisible(false);
    }

    //fuction to send Notification to Owner if there is new Book or Review
    // function sendPushNotificationHandler(eventType){
    //     if(eventType == 'book'){
    //         fetch('https://exp.host/--/api/v2/push/send',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'appliction/json'
    //             },
    //             body: JSON.stringify({
    //                 to: displayedHall.ownerNotifAddr,
    //                 title: 'New Reservation',
    //                 body: 'There is new reservation'
    //             })
    //         });
    //     }else{
    //         fetch('https://exp.host/--/api/v2/push/send',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'appliction/json'
    //             },
    //             body: JSON.stringify({
    //                 to: displayedHall.ownerNotifAddr,
    //                 title: 'New Review',
    //                 body: 'There is new review'
    //             })
    //         });
    //     }
    // }

    //add new Reservation
    const hallReservation = async(hallsID, date, price) => { 
        if(! userAccountCtx.isAuthenticated){
            openLoginPage();
        }
        else{
            setIsSubmitting(true);
            const ReservationID = await addDoc(collection(db, "Reservation"), {
                HallsID: hallsID,
                Date: date,
                Price: price,
                UserID: userAccountCtx.userID
            }).
            then(()=>{
                setIsSubmitting(false);
                //sendPushNotificationHandler('book');
                alert("The hall is booked successsfilly");
            })
            navigation.navigate('Bookings',{
                update: true,
            });
        }
    }
    //console.log(displayedHall.bookedDays);
    
    //add new Review
    const addReview = async(comment, rate, userName, userID, userImage) => {
        //4+3+2 == 9/3 the rate 3
        let rateOfhall = (reviews.length * displayedHall.rate) + rate;//3*3+5 = 14
        rateOfhall = rateOfhall/(reviews.length+1);//14/4 = 3.5 new rate
        
        const ComentID = await addDoc(collection(db, "Review"), {
            HallsID: displayedHall.id,
            Comment: comment,
            Rate: rate,
            UserName: userName,
            UserID: userID,
            UserImage: userImage
        })
        const docRef = doc(db, "Halls", displayedHall.id);

        await updateDoc(docRef, {
            Rate: rateOfhall
        });
        //sendPushNotificationHandler('review');
    }

    if(isSubmitting){
        return <LodingOverlay text={"The hall is now booked, wait a second"}/>;
    }

    return(
        <View style={styles.container}>

            <GoToLoginPage isVisible={goToLoginPageIsVisible} close={closeLoginPage}/>

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
                                bookedDates={bookedDates}
                            />

                            <View style={styles.line}></View>

                            {/* المعلومات عن الغرف */}
                            {/* <RoomInformation /> */}

                            <View style={styles.contactContainer}>
                                <View style={styles.contactInformationTitle}>
                                    <Text style={styles.boldName}>Contact with owner :</Text>
                                    <Button title="contact" onPress={contactWithOwner}/>
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>

                                {/* تعريف القاعة  */}
                                <DescriptionInformation description={displayedHall.description}/>

                                {/* الخدمات */}
                                <ServiecesInformation services={displayedHall.services}/>
                                
                            </View>

                            <View style={styles.line}></View>

                            <EnterReview onPress={addReview} account={userAccountCtx}/>

                            <View style={styles.line2}></View>

                            <HallComment reviews={reviews} account={userAccountCtx}/>
                            

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
    contactContainer:{
        flex: 1,
        marginHorizontal:4,
        borderRadius:3,
    },
    contactInformationTitle:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius:3,
        borderBottomRightRadius:0,
        paddingTop:8,
        paddingLeft:6,
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
