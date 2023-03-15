import { View, Text, TextInput, Modal, Pressable, ScrollView, KeyboardAvoidingView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Calendar } from "react-native-calendars";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Colors, GlobalStyles } from "../../constants/styles";


function EditSpecialPrice({ Reservation, SpecialPrices, hallID, ownerID, visible, close, setIsSubmitting }) {

    const [selectedDate, setSelectedDate] = useState([]);
    const [price, setPrice] = useState('');
    const [weekendPrice, setWeekendPrice] = useState('');

    const addToDatabase = async (selectedDate) => {

        const ReservationID = await addDoc(collection(db, "SpecialPrice"), {
            HallsID: hallID,
            Date: selectedDate,
            Price: price,
        })
        console.log(ReservationID);
        return ReservationID;
    }
    const addNewSpecialPrice = async () => {
        if (selectedDate.length != 0 && price != '' && weekendPrice != '') {

            close();
            setIsSubmitting(true);
            for (var i = 0; i < selectedDate.length; i++) {
                var id = await addToDatabase(selectedDate[i])
            }
            const docRef = doc(db, "Halls",  hallID);

            await updateDoc(docRef, {
                WeekendPrice: weekendPrice
            });
            setIsSubmitting(false);
            alert("The price updated");

        }else if(selectedDate.length != 0 && price != ''){

            close();
            setIsSubmitting(true);
            for (var i = 0; i < selectedDate.length; i++) {
                var id = await addToDatabase(selectedDate[i])
            }
            setIsSubmitting(false);
            alert("The price updated");

        }else if(selectedDate.length == 0 && price != ''){

            alert("Choose dates and price first");

        }else if(weekendPrice != ''){
            close();
            setIsSubmitting(true);
            const docRef = doc(db, "Halls",  hallID);

            await updateDoc(docRef, {
                WeekendPrice: weekendPrice
            });
            setIsSubmitting(false);

        }
        else {
            alert("Choose dates and price first");
        }

    }

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

    //Make booked days inactive
    const disabled1 = { disabled: true, disableTouchEvent: true, selectedColor: '#d6516e', selected: true };
    const disabled2 = { disabled: true, disableTouchEvent: true, selectedColor: '#c1d45d', selected: true };
    const selected = { selectedColor: '#6bf2ac', selected: true };
    let markedDates = {};
    for (var i = 0; i < Reservation.length; i++) {
        if (Reservation[i].data.Date > todayDate) {
            markedDates[Reservation[i].data.Date] = disabled1;
        }
        //console.log(markedDates);
    }
    for (var i = 0; i < SpecialPrices.length; i++) {
        if (SpecialPrices[i].data.Date > todayDate) {
            markedDates[SpecialPrices[i].data.Date] = disabled2;
        }
        //console.log(markedDates);
    }
    for (var i = 0; i < selectedDate.length; i++) {
        markedDates[selectedDate[i]] = selected;
        //console.log(markedDates);
    }

    return (
        <Modal visible={visible} animationType="fade">
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <View style={styles.container}>
                        <Calendar
                            onDayPress={date => {
                                let checkDate = selectedDate.filter(item => item === date.dateString);
                                if (checkDate == 0) {
                                    setSelectedDate((pre) => [...pre, date.dateString]);
                                } else {
                                    setSelectedDate(selectedDate.filter(item => item !== date.dateString));
                                }

                            }}
                            markedDates={markedDates}
                            minDate={todayDate}

                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.ColorsContainer}>
                            <View style={styles.ColorContainer}>
                                <View style={styles.circleColor2}>

                                </View>
                                <Text>Booked</Text>
                            </View>
                            <View style={styles.ColorContainer}>
                                <View style={styles.circleColor3}>

                                </View>
                                <Text>Special Price</Text>
                            </View>
                            <View style={styles.ColorContainer}>
                                <View style={styles.circleColor4}>

                                </View>
                                <Text>Selected</Text>
                            </View>
                        </View>
                        <View style={styles.PriceContainer}>
                            <Text style={styles.boldName}>Price: </Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='number-pad'
                                onChangeText={newPrice => setPrice(newPrice)}
                                defaultValue={price}
                            />
                            <Text style={styles.boldName}>Weekend Price: </Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='number-pad'
                                onChangeText={newWeekendPrice => setWeekendPrice(newWeekendPrice)}
                                defaultValue={price}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>

                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                            onPress={addNewSpecialPrice}
                        >
                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Change</Text>
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
                </KeyboardAvoidingView>
            </ScrollView>
        </Modal>

    );
}
export default EditSpecialPrice;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    ColorsContainer: {
        flex: 1,
        marginTop: 40,
    },
    ColorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circleColor1: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    circleColor2: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#d6516e',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    circleColor3: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#c1d45d',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    circleColor4: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#6bf2ac',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    PriceContainer: {
        flex: 1,
        marginTop: 40,
        marginLeft: 12
    },
    boldName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    input: {
        height: 35,
        width: 140,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        margin: 0,
        justifyContent: "center",
        marginBottom: 8,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginContainer: {
        marginTop: 90,
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
        marginTop: 90,
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