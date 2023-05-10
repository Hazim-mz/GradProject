import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";

import { GlobalStyles } from "../../constants/styles";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

function AvailableDate({ Halls, oldHalls, avalibleHalls, visible, close }) {

    const [choosingDay, setChoosingDay] = useState('');
    //get today date for cleander
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

    let markedDates = {};
    markedDates[todayDate]={ selectedColor: 'black', selected: false  };
    markedDates[choosingDay]={ selectedColor: '#6bf2ac', selected: true };

    //get booked halls in specific date 
    const [bookedHalls, setBookedHalls] = useState([]);
    useEffect(() => {
        const Reservations = query(collection(db, "Reservation"), where("Date", "==", choosingDay));
        onSnapshot(Reservations, (Reservation) => {
            setBookedHalls(Reservation.docs.map((reservation) => ({
                id: reservation.id,
                data: reservation.data()
            }))
            )
        })
    }, [choosingDay])


    function onPressDate() {
        if (choosingDay != '') {

            if (Halls >= oldHalls) {
                //Find values that are in result1 but not in result2
                var uniqueResultOne = Halls.filter((obj) => {
                    return !bookedHalls.some((obj2) => {
                        return obj.id == obj2.data.HallsID;
                    });
                });

                //Find values that are in result2 but not in result1
                var uniqueResultTwo = bookedHalls.filter((obj) => {
                    return !Halls.some((obj2) => {
                        return obj.data.HallsID == obj2.id;
                    });
                });
            }
            else {
                //Find values that are in result1 but not in result2
                var uniqueResultOne = oldHalls.filter((obj) => {
                    return !bookedHalls.some((obj2) => {
                        return obj.id == obj2.data.HallsID;
                    });
                });

                //Find values that are in result2 but not in result1
                var uniqueResultTwo = bookedHalls.filter((obj) => {
                    return !oldHalls.some((obj2) => {
                        return obj.data.HallsID == obj2.id;
                    });
                });
            }

            //Combine the two arrays of unique entries
            var notBookedHalls = uniqueResultOne.concat(uniqueResultTwo);
            avalibleHalls(notBookedHalls);
        }
        close();
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.calenderContainer}>
                    <Calendar
                        onDayPress={date => {
                            setChoosingDay(date.dateString);
                        }}
                        minDate={todayDate}
                        markedDates={markedDates}
                    />
                </View>

                <View style={styles.ColorsContainer}>
                    <View style={styles.ColorContainer}>
                        <View style={styles.circleColor3}>

                        </View>
                        <Text>Selected</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                        onPress={onPressDate.bind(this, choosingDay)}
                    >
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Save</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                        onPress={close}
                    >
                        <View style={styles.closeContainer}>
                            <Text style={styles.closeText}>Close</Text>
                        </View>
                    </Pressable>
                </View>

            </View>
        </Modal>
    );
}

export default AvailableDate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
    },
    calenderContainer: {
        marginBottom: 60,
    },
    ColorsContainer:{
        flex: 1,
    },
    ColorContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    circleColor1:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    circleColor2:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#d6516e',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    circleColor3:{
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#6bf2ac',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 50
    },
    loginContainer: {
        marginRight: 8,
        height: 50,
        width: 140,
        borderRadius: 4,
        backgroundColor: GlobalStyles.colors.primary10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer: {
        marginLeft: 8,
        height: 50,
        width: 140,
        borderRadius: 4,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button: {
        height: 70
    },
    buttonPress: {
        opacity: 0.7,
    },
});