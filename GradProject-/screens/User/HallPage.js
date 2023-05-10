import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, Pressable, ScrollView, Alert, KeyboardAvoidingView, Image, Platform, StyleSheet } from "react-native";

import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import HallImage from "../../components/Common/HallImage";
import { GlobalStyles } from "../../constants/styles";
import MainInformation from "../../components/HallCom/MainInformation";
import RoomInformation from "../../components/HallCom/RoomInformation";
import DescriptionInformation from "../../components/HallCom/DescriptionInformation";
import ServiecesInformation from "../../components/HallCom/ServiecesInformation";
import EnterReview from "../../components/HallCom/EnterReview";
import HallComment from "../../components/HallCom/HallComment";
import LodingOverlay from "../../components/UI/LodingOverlay";
import { AuthContext } from "../../store/auth-context";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import GoToLoginPage from "../../components/Common/GoToLoginPage";
import Contact from "../../components/HallCom/Contact";
import GoToBillPage from "../../components/Common/GoToBillPage";


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        };
    },
});

function HallPage({ route, navigation }) {

    const userAccountCtx = useContext(AuthContext);
    
    //console.log(userAccountCtx); 
    const [isSubmitting, setIsSubmitting] = useState(false);//for loding if book hall

    const [openReport, setOpenReport] = useState(false);
    //report on hall
    function reportOnHall() {
        if (openReport) {
            setOpenReport(false);
        }
        else {
            setOpenReport(true);
        }
    }

    // useEffect(() => {
    //     navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    // }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable onPress={reportOnHall} style={({ pressed }) => pressed ? styles.pressable1 : null}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </Pressable>
                );

            }
        });
    }, [navigation, reportOnHall]);

    //payment 
    // const [ready, setReady] = useState(false);
    // const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

    // useEffect(()=>{
    //     initialisePaymentSheet();
    // }, []);

    // const initialisePaymentSheet = async ()=>{
    //     const {paymenIntent, ephemeralKey, customenr} =
    //         await fetchPaymentSheetParams();

    //     const {error} = await initPaymentSheet({
    //         customerId: customenr,
    //         customerEphemeralKeySecret: ephemeralKey,
    //         paymentIntentClientSecret: paymenIntent,
    //         merchantDisplayName: 'Example Inc.',
    //         allowsDelayedPaymentMethods: true,
    //         returnURL: 'stripe-example://stripe-redirect',
    //     });
    //     if(error){
    //         alert('Error hapend: ', error.message);
    //     }else{
    //         setReady(true);
    //     }
    // };

    //add reaport to hall
    async function addReportToHall() {
        const docRef = doc(db, "Halls", displayedHall.id);
        Alert.alert('Report', 'Are you sure to report on this hall', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => updateDoc(docRef, {
                    Report: displayedHall.report + 1
                })
            },
        ]);

    }

    //معلومات القاعة
    const displayedHall = {
        id: route.params.hallId,
        name: route.params.hallName,
        description: route.params.hallDescription,
        price: route.params.hallPrice,
        weekendPrice: route.params.hallWeekendPrice,
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
        ownerID: route.params.ownerID,
        ownerEmail: route.params.ownerEmail,
    };


    const [bookedDates, setBookedDates] = useState([]);//the booked date of hall
    const [reviews, setReviews] = useState([]);//the reviews of the hall
    const [replays, setReplays] = useState([]);//the replay of the owner
    const [specialPrices, setSpecialPrices] = useState([]);//the date with special prices
    const [owner, setOwner] = useState([]);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        //get the booked date
        const query1 = query(collection(db, "Reservation"), where("HallsID", "==", displayedHall.id));
        onSnapshot(query1, (Reservations) => {
            setBookedDates(Reservations.docs.map((Reservation) => ({
                id: Reservation.id,
                data: Reservation.data()
            }))
            )
        });
        //get the reviews 
        const query2 = query(collection(db, "Review"), where("HallsID", "==", displayedHall.id));
        onSnapshot(query2, (Comments) =>
            setReviews(Comments.docs.map((Comment) => ({
                id: Comment.id,
                data: Comment.data()
            }))
            )
        );

        //get owner infomation 
        const query3 = query(collection(db, "Users"), where("Email", "==", displayedHall.ownerEmail));
        onSnapshot(query3, (Owners) =>
            setOwner(Owners.docs.map((Owner) => ({
                id: Owner.id,
                data: Owner.data()
            }))
            )
        );

        //get price if the hall for specific days
        const query4 = query(collection(db, "SpecialPrice"), where("HallsID", "==", displayedHall.id));
        onSnapshot(query4, (SpecialPrices) =>
            setSpecialPrices(SpecialPrices.docs.map((SpecialPrice) => ({
                id: SpecialPrice.id,
                data: SpecialPrice.data()
            }))
            )
        );

        //get the replay 
        const query5 = query(collection(db, "ReplayToReview"), where("HallsID", "==", displayedHall.id));
        onSnapshot(query5, (Replays) =>
            setReplays(Replays.docs.map((Replay) => ({
                id: Replay.id,
                data: Replay.data()
            }))
            )
        );

        if (userAccountCtx.isAuthenticated) {
            const query6 = query(collection(db, "MessagesRequest"), where('OwnerID', '==', displayedHall.ownerID), where('UserID', '==', userAccountCtx.userID));
            onSnapshot(query6, (Owners) =>
                setChat(Owners.docs.map((Owner) => ({
                    id: Owner.id,
                    data: Owner.data()
                }))
                )
            );
        }


    }, []);


    //chat with owner MessagesRequest
    async function startMessagesRequest() {
        const ChatID = await addDoc(collection(db, "MessagesRequest"), {
            OwnerID: displayedHall.ownerID,
            Start: false,
            UserID: userAccountCtx.userID,
            NewOwnerMes: 0,
            NewUserMes: 0,
            TimeOfLastMes: serverTimestamp(),
            LastMessage: '',
        })
        return ChatID.id;
    }


    //start new chat with owner 
    async function contactWithOwner() {

        if (userAccountCtx.isAuthenticated) {
            if (chat.length != 0) {
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
            else {
                var chatId = await startMessagesRequest();
                navigation.navigate('Chat', {
                    chatId: chatId,
                    chatReceiverInfo: owner,
                    chatStart: false,
                    chatUserID: userAccountCtx.userID,
                    chatUserEmail: userAccountCtx.email,
                    chatUserImage: userAccountCtx.image,
                    chatUserRule: userAccountCtx.rule,
                })
            }
        } else {
            openLoginPage();
        }
    }

    //get location of the hall
    function pressLoctionHandler() {
        const tempIos = "googleMaps://app?saddr=" + displayedHall.locationOfUser.latitude + ", " + displayedHall.locationOfUser.longitude + "&daddr=" + displayedHall.locationOfHall.latitude + ", " + displayedHall.locationOfHall.longitude;
        const tempAndroid = "google.navigation:q=" + displayedHall.locationOfHall.latitude + ", " + displayedHall.locationOfHall.longitude;
        Linking.openURL(
            Platform.OS === 'ios'
                ? tempIos
                : tempAndroid,
        );
    }
    //console.log(displayedHall.locationOfHall);

    //check if user login before Book or add Review
    const [goToLoginPageIsVisible, setGoToLoginPageIsVisible] = useState(false);
    function openLoginPage() {
        setGoToLoginPageIsVisible(true);
    }
    function closeLoginPage() {
        setGoToLoginPageIsVisible(false);
    }

    //fuction to send Notification to Owner if there is new Book or Review
    function sendPushNotificationHandler(eventType) {
        if (eventType == 'book') {
            if (owner[0].data.NotificationsAddress != '') {
                fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: owner[0].data.NotificationsAddress,
                        title: 'New Reservation',
                        body: 'There is new reservation'
                    })
                });
            }
        } else {
            if (owner[0].data.NotificationsAddress != '') {
                fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: owner[0].data.NotificationsAddress,
                        title: 'New Review',
                        body: 'There is new review'
                    })
                });
            }
        }
    }

    //add new Reservation
    const [bookedHall, setBookedHall] = useState({});
    const hallReservation = async (hallsID, date, price) => {
        if (!userAccountCtx.isAuthenticated) {
            openLoginPage();
        }
        else {
            // setIsSubmitting(true);
            // const ReservationID = await addDoc(collection(db, "Reservation"), {
            //     HallsID: hallsID,
            //     Date: date,
            //     Price: price,
            //     UserID: userAccountCtx.userID
            // }).
            //     then(() => {
            //         setIsSubmitting(false);
            //         sendPushNotificationHandler('book');
            //         alert("The hall is booked successsfilly");
            //     })
            // navigation.navigate('Bookings', {
            //     update: true,
            // });
            userAccountCtx.hall = displayedHall;
            userAccountCtx.addHall(userAccountCtx);
            //setBookedHall(displayedHall);
        }
    }
    //console.log(displayedHall.bookedDays);

    
    //add new Review
    const addReview = async (comment, rate, userName, userID, userImage) => {
        //4+3+2 == 9/3 the rate 3
        let rateOfhall = (reviews.length * displayedHall.rate) + rate;//3*3+5 = 14
        rateOfhall = rateOfhall / (reviews.length + 1);//14/4 = 3.5 new rate

        const ComentID = await addDoc(collection(db, "Review"), {
            HallsID: displayedHall.id,
            Comment: comment,
            Rate: rate,
            Report: 0,
            UserName: userName,
            UserID: userID,
            UserImage: userImage,
            ReplayTo: ''
        })
        const docRef = doc(db, "Halls", displayedHall.id);

        await updateDoc(docRef, {
            Rate: rateOfhall
        });
        sendPushNotificationHandler('review');
    }

    if (isSubmitting) {
        return <LodingOverlay text={"The hall is now booked, wait a second"} />;
    }

    return (
        <View style={styles.container}>
            <GoToLoginPage isVisible={goToLoginPageIsVisible} close={closeLoginPage} />

            <ScrollView
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <HallImage
                        data={displayedHall.imageUrl}
                        imageContainerStyle={styles.imageContainer}
                        press={false}
                    />

                </View>

                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                        <View style={styles.InfoContainer}>

                            {/* المعلومات الاساسية */}
                            <MainInformation
                                data={displayedHall}
                                specialPricesDate={specialPrices}
                                onPressLocation={pressLoctionHandler}
                                onPressBook={hallReservation}
                                bookedDates={bookedDates}
                            />

                            <View style={styles.line}></View>

                            <Contact owner={owner} contact={contactWithOwner} />

                            <View style={styles.line}></View>

                            {/* المعلومات عن الغرف */}
                            <RoomInformation
                                menCoun={displayedHall.menCoun}
                                womanCoun={displayedHall.womanCoun}
                                menBath={displayedHall.menBath}
                                womanBath={displayedHall.womanBath}
                                menDin={displayedHall.menDin}
                                womanDin={displayedHall.womanDin}
                            />

                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>

                                {/* تعريف القاعة  */}
                                <DescriptionInformation description={displayedHall.description} />

                                {/* الخدمات */}
                                <ServiecesInformation services={displayedHall.services} />

                            </View>

                            <View style={styles.line}></View>

                            <EnterReview onPress={addReview} account={userAccountCtx} />

                            <View style={styles.line2}></View>

                            <HallComment reviews={reviews} replays={replays} />


                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScrollView>
            {
                openReport
                    ?
                    <View style={styles.reportContainer}>
                        <Pressable
                            style={({ pressed }) => pressed ? [styles.reportTextContainer, styles.pressable1] : styles.reportTextContainer}
                            onPress={addReportToHall}
                        >
                            <Text style={styles.reportText}>Report</Text>
                        </Pressable>
                        <Pressable
                            style={{ flex: 1 }}
                        >
                            <Text style={styles.reportText}></Text>
                        </Pressable>
                    </View>
                    :
                    <View></View>
            }
            {
                userAccountCtx.isAuthenticated ?
                    Object.keys(userAccountCtx.hall).length !== 0 ?
                        <GoToBillPage hall={userAccountCtx.hall}/>
                        :
                        <></>
                :
                    <></>
            }   
        </View>
    );
}

export default HallPage;

const styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: 'white',
        flex: 0.15
    },
    container: {
        flex: 1
    },
    pressable1: {
        opacity: 0.7
    },
    imageContainer: {
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',
    },
    reportContainer: {
        position: 'absolute',
        minHeight: 55,
        minWidth: 90,
        backgroundColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginRight: 0,
        paddingLeft: 2,
        paddingTop: 4,
        alignItems: 'center',
        right: 2,
        top: 0,
        borderWidth: 1,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
    },
    reportTextContainer: {
        paddingHorizontal: 0,
        paddingHorizontal: 20,
        marginTop: 5,
        borderColor: 'white',
        borderBottomWidth: 1,
        flex: 1
    },
    reportText: {
        color: 'white',
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
        backgroundColor: 'white',
        flexDirection: 'column',

    },
    line: {
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        margintop: 4,
        marginBottom: 6,
    },
    line2: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginRight: 60,
        marginLeft: 4,
    },
    boldName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    normalName: {
        fontSize: 12,
        textAlign: 'center',
    },
    contactContainer: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 3,
        height: 90,
    },
    contactInformationTitle: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        borderBottomRightRadius: 0,
        paddingTop: 8,
        paddingLeft: 6,
    },
    contactInformation: {
        height: 50,
        borderRadius: 45,
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    press: {
        opacity: 0.7,
    },
    descServContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        marginHorizontal: 4,
        paddingTop: 8,
        paddingLeft: 6,
    },
    commentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        marginHorizontal: 4,
        paddingTop: 8,
        paddingLeft: 6,
        minHeight: 180,
    },
    textIput1: {
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
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingContainer2: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
    },
    hallBookedContainer: {
        backgroundColor: 'rgba(203, 39, 239, 0.8)',
        height: 55
    },
});