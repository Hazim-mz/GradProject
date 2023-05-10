import React, { Fragment, useState, useRef, useEffect } from 'react';
import { AppRegistry, Dimensions, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Alert, FlatList } from 'react-native';

import { auth, db, storage } from './config';
import { query, collection, where, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



var screenWidth = Dimensions.get('window').width;


const Test = () => {

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var todayDate;
    if (day < 10 && month < 10)
        todayDate = year + '-0' + month + '-0' + day;
    else if (day < 10)
        todayDate = year + '-' + month + '-0' + day;
    else if (month < 10)
        todayDate = year + '-0' + month + '-' + day;
    else
        todayDate = year + '-' + month + '-' + day;

    function isLater(dateString1) {
        return dateString1 > todayDate
    }

    const [bookedHalls, setBookedHalls] = useState([]);
    const [bookedReservations, setBookedReservations] = useState([]);
    const [canceledHalls, setcanceledHalls] = useState([]);
    const [canceledReservations, setCanceledReservations] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getReservation() {
            const reservationQuery1 = query(collection(db, 'Reservation'), where('UserID', '==', 'tRhm3ErtexY04p7Jhd9Y'));//booked Reservations
            const reservationSnapshot1 = await getDocs(reservationQuery1);
            const reservationQuery2 = query(collection(db, 'CanceledReservation'), where('UserID', '==', 'tRhm3ErtexY04p7Jhd9Y'));//canceled Reservations
            const reservationSnapshot2 = await getDocs(reservationQuery2);
            //console.log(reservationSnapshot.size);

            if(reservationSnapshot1.size > bookedReservations.length) {

                // Extract new reservations and their corresponding room IDs
                const newReservations = [];
                const hallsIds = [];
                reservationSnapshot1.forEach((doc) => {
                    if (!bookedReservations.some(reservation => reservation.id === doc.id)) {
                        newReservations.push({ id: doc.id, data: doc.data() });
                        hallsIds.push(doc.data().HallsID);
                    }
                });
                //console.log("hallsIds: ", hallsIds.length);

                // Query Firestore for rooms with the extracted room IDs
                const hallSnapshot = await Promise.all(hallsIds.map(hallsId => getDoc(doc(db, "Halls", hallsId))));
                //console.log("hallSnapshot: ", hallSnapshot.length);

                // Extract new rooms
                const newHalls = hallSnapshot.map((snapshot) => ({ id: snapshot.id, data: snapshot.data() }))
                //console.log("newHalls: ", ...newHalls);


                for (var i = 0; i < newHalls.length; i++) {
                    if (isLater(newReservations[i].data.Date)) {
                        newHalls[i].data = { ...newHalls[i].data, cancelAvailable: true, Date: newReservations[i].data.Date }
                    } else {
                        newHalls[i].data = { ...newHalls[i].data, cancelAvailable: false, Date: newReservations[i].data.Date }
                    }
                }
                var sortNewHalls
                if(newHalls.length != 0){
                    sortNewHalls = newHalls.sort((a, b) => (a.data.Date < b.data.Date) ? 1 : -1)

                }

                // Update state with new reservations and rooms
                setBookedReservations([...bookedReservations, ...newReservations]);
                setBookedHalls([...bookedHalls, ...sortNewHalls]);
            }

            if(reservationSnapshot2.size > canceledReservations.length) {

                // Extract new reservations and their corresponding room IDs
                const newReservations = [];
                const hallsIds = [];
                reservationSnapshot2.forEach((doc) => {
                    if (!canceledReservations.some(reservation => reservation.id === doc.id)) {
                        newReservations.push({ id: doc.id, data: doc.data() });
                        hallsIds.push(doc.data().HallsID);
                    }
                });
                //console.log("hallsIds: ", hallsIds.length);

                // Query Firestore for rooms with the extracted room IDs
                const hallSnapshot = await Promise.all(hallsIds.map(hallsId => getDoc(doc(db, "Halls", hallsId))));
                //console.log("hallSnapshot: ", hallSnapshot.length);

                // Extract new rooms
                const newHalls = hallSnapshot.map((snapshot) => ({ id: snapshot.id, data: snapshot.data() }))
                //console.log("newHalls: ", ...newHalls);


                for (var i = 0; i < newHalls.length; i++) {
                    if (isLater(newReservations[i].data.Date)) {
                        newHalls[i].data = { ...newHalls[i].data, Date: newReservations[i].data.Date }
                    } else {
                        newHalls[i].data = { ...newHalls[i].data, Date: newReservations[i].data.Date }
                    }
                }
                var sortNewHalls
                if(newHalls.length != 0){
                    sortNewHalls = newHalls.sort((a, b) => (a.data.Date < b.data.Date) ? 1 : -1)

                }

                // Update state with new reservations and rooms
                setCanceledReservations([...canceledReservations, ...newReservations]);
                setcanceledHalls([...canceledHalls, ...sortNewHalls]);
            }
        }
        getReservation();
    }, [update])
    // console.log("number of reservations: ", reservations.length);
    // console.log("number of halls: ", halls.length);

    if (bookedReservations.length) {
        if (bookedHalls.length) {
            console.log("number of booked halls: ", bookedReservations.length);
            console.log("number of book cancele : ", canceledHalls.length);
            for (var i = 0; i < bookedReservations.length; i++) {
                console.log("( ", bookedReservations[i].data.HallsID, bookedHalls[i].id, " )", "( ", bookedReservations[i].data.Date, bookedHalls[i].data.Date, " )", "( ", bookedHalls[i].data.cancelAvailable, " )");

            }
        }
    }


    async function Add() {
        // AsyncStorage.setItem('hall', JSON.stringify(hall1));
        const ReservationID = await addDoc(collection(db, "Reservation"), {
            HallsID: "7B0Y1UXUECQveiSAHriP",
            Date: "2023-05-29",
            Price: "30000",
            UserID: "tRhm3ErtexY04p7Jhd9Y"
        })
        const ReservationID2 = await addDoc(collection(db, "Reservation"), {
            HallsID: "XWDpFgPbcm748D5qqucC",
            Date: "2023-03-29",
            Price: "30000",
            UserID: "tRhm3ErtexY04p7Jhd9Y"
        })
        const ReservationID3 = await addDoc(collection(db, "Reservation"), {
            HallsID: "cbvNsgcu6USc5y4Mj9ao",
            Date: "2023-02-29",
            Price: "30000",
            UserID: "tRhm3ErtexY04p7Jhd9Y"
        })
        const ReservationID4 = await addDoc(collection(db, "Reservation"), {
            HallsID: "xJvpN0fxfrrFqA9zjIsd",
            Date: "2023-07-29",
            Price: "30000",
            UserID: "tRhm3ErtexY04p7Jhd9Y"
        })
        const ReservationID5 = await addDoc(collection(db, "Reservation"), {
            HallsID: "Pa4gjbKezbH4as6ZNEME",
            Date: "2023-01-29",
            Price: "30000",
            UserID: "tRhm3ErtexY04p7Jhd9Y"
        })
        setUpdate(!update);
    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.ButtonContainer}>
                <Button title="Add" onPress={() => Add()} />
            </View>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                ref={re => scroll = re}
                style={{ flex: 1 }}
            >

                {
                    bookedHalls.map((hall, index) => (
                        <View style={styles.ScrollContainer} key={index}>
                            <Text style={styles.ScrollTextContainer}>
                                {hall.data.Name}
                            </Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )

};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#abe3a8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    ScrollContainer: {
        backgroundColor: '#cdf1ec',
        flexGrow: 1,
        marginTop: 0,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ScrollTextContainer: {
        fontSize: 20,
        padding: 15,
        color: '#000',
        textAlign: 'center'
    },
    ButtonViewContainer: {
        flexDirection: 'row',
        paddingTop: 35,
    },
    ButtonContainer: {
        padding: 30,
        flex: 1
    },
    textContainer: {
        flex: 1,
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 5,
    },
    text: {
    },
    scrollView: {
        backgroundColor: 'red'
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: 'white',
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    itemContainer: {
        marginTop: 12,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: 'row'
    },
    totalContainer: {
        marginTop: 12,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: 'row',
        borderTopColor: "#cccccc",
        borderTopWidth: 1,
        paddingTop: 10,
        marginBottom: 20
    },
    itemDetail: {
        flex: 2
    },
    itemTitle: {
        fontWeight: '500',
        fontSize: 18
    },
    itemDescription: {
        fontSize: 12
    },
    itemPrice: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '400',
        color: 'blue',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: 'blue',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default Test;