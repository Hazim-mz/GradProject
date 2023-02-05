import { View, Text, StyleSheet, ScrollView, Pressable, Button } from "react-native";

import { Colors, GlobalStyles } from "../../constants/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useEffect, useContext, useState } from "react";

import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

import ReservationList from "../../components/Reservation/ReservationList";
import ReservationCalendars from "../../components/Reservation/ReservationCalendars";
import LodingOverlay from '../../components/UI/LodingOverlay';

function OwnerReservation() {
    const userAccountCtx = useContext(AuthContext);

    const [hall, setHall] = useState([]);
    const [users, setUsers] = useState([]);
    const [reservation, setReservation] = useState([]);

    useEffect(()=>{

        const q = query(collection(db, "Halls"), where("OwnerEmail", "==", userAccountCtx.email));
        onSnapshot(q, (Halls) =>
            setHall(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                }))
            )
        );

        const qq = query(collection(db, "Users"));
        onSnapshot(qq, (Users) =>
            setUsers(Users.docs.map((User) =>({
                    id: User.id,
                    data: User.data()
                }))
            )
        );
    }, []);

    useEffect(()=>{
        if(hall.length != 0){
            const q = query(collection(db, "Reservation"), where("HallsID", "==", hall[0].id));
            onSnapshot(q, (Reservations) =>
                setReservation(Reservations.docs.map((Reservation) =>({
                        id: Reservation.id,
                        data: Reservation.data()
                    }))
                )
            );
        }

    }, [hall]);


    const [calendarIsVisible, setCalendarIsVisible] = useState(false);
    function openCalendar(){
        setCalendarIsVisible(true);
    }
    function closeCalendar(){
        setCalendarIsVisible(false);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    if(isSubmitting){
        return <LodingOverlay text={"The hall is now booked, wait a second"}/>;
    }

    if(reservation.length != 0){
        return (
            <View style={{flex: 1}}>
                <ReservationCalendars Reservation={reservation} hall={hall} ownerID={userAccountCtx.userID} visible={calendarIsVisible} close={closeCalendar} setIsSubmitting={setIsSubmitting}/>
                <View>
                    <Pressable
                        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                        onPress={openCalendar}
                    >
    
                        <View>
                            <Text style={styles.buttonText}>Check & Reserve</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={{flex: 1}}>
                    <ReservationList Reservation={reservation} Users={users} ownerID={userAccountCtx.userID}/>
                </View>

            </View>
        );
    }else{
        <View>
            <Text>There is no reservation</Text>
        </View>
    }

}

export default OwnerReservation;
const styles = StyleSheet.create({
    cardi: {
        flexDirection: "row",
        margin: "2%",
        borderWidth: 1,
        backgroundColor: '#E4E4E4',
        borderRadius: 10,

        paddingLeft: 3,
    },

    dirc: {
        flexDirection: "row",
        margin: 3,

    },
    textspace: {
        color: "black",
        fontSize: 16,
        //fontWeight: "bold",
        margin: 5,
    },

    button: {
        margin: 10,
        height: 55,
        width: "95%",
        backgroundColor: GlobalStyles.colors.primary800,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.7,
    },
    conatct: {
        marginLeft: 40,
        marginTop: 90,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
