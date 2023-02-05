import { View, Text, Button, Modal, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Calendar } from "react-native-calendars";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { GlobalStyles } from "../../constants/styles";

function ReservationCalendars({Reservation, hall, ownerID, visible, close, setIsSubmitting}){

    const [date, setDate] = useState('');

    const addNewReservation = async(date) => { 
        if(date != ''){
            close();
            setIsSubmitting(true);
            const ReservationID = await addDoc(collection(db, "Reservation"), {
                HallsID: hall[0].id,
                Date: date,
                Price: 0,
                UserID: ownerID
            }).
            then(()=>{
                setIsSubmitting(false);
                //sendPushNotificationHandler('book');
                alert("The hall is booked successsfilly");
            })
        }
        else{
            alert("Choose date first");
        }
        
    }

    //get today date for cleander
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var todayDate ;
    if(day < 10 && month < 10)
        todayDate = year + '-0' + month + '-0'+day;
    else if(day < 10)
        todayDate = year + '-' + month + '-0'+day;
    else if(month < 10)
        todayDate = year + '-0' + month + '-'+day;
    else
        todayDate = year + '-' + month + '-'+day;

    //Make booked days inactive
    const disabled = { disabled: true, disableTouchEvent: true, selectedColor: '#d6516e', selected: true };
    let markedDates = {};
    for(var i=0; i<Reservation.length; i++){
        markedDates[Reservation[i].data.Date] = disabled;
        //console.log(markedDates);
    }
    markedDates[todayDate]={ selectedColor: 'black', selected: false  };
    markedDates[date]={ selectedColor: '#6bf2ac', selected: true };

    //console.log(markedDates[date]={ selectedColor: '#d6516e', selected: true });
    //console.log({...markedDates, date:{ selectedColor: '#d6516e', selected: true }});
    
    return(
        <Modal visible={visible} animationType="fade">

            <View style={styles.container}>
                <Calendar 
                    onDayPress={date => {
                       setDate(date.dateString);
                    }}
                    markedDates={markedDates}
                    minDate={todayDate}
                    
                />
            </View>

            <View style={styles.ColorsContainer}>
                    <View style={styles.ColorContainer}>
                        <View style={styles.circleColor1}>
                            
                        </View>
                        <Text>Today</Text>
                    </View>
                    <View style={styles.ColorContainer}>
                        <View style={styles.circleColor2}>
                            
                        </View>
                        <Text>Booked</Text>
                    </View>
                    <View style={styles.ColorContainer}>
                        <View style={styles.circleColor3}>
                            
                        </View>
                        <Text>Selected</Text>
                    </View>
            </View>

            <View style={styles.buttonContainer}>

                <Pressable
                    style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                    onPress={addNewReservation.bind(this, date)}
                >
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Book</Text>
                    </View>
                </Pressable>

                <Pressable
                    style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                    onPress={close}
                >
                <View style={styles.closeContainer}>
                    <Text style={styles.closeText}>Close</Text>
                </View>
                </Pressable>
            </View>
        </Modal>
    );
}
export default ReservationCalendars;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
    ColorsContainer:{
        flex: 1,
        marginTop: 200,
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
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginContainer:{
        marginTop: 30,
        marginRight: 8,
        height: 50,
        width: 140,
        borderRadius: 4,
        backgroundColor: GlobalStyles.colors.primary10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    loginText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer:{
        marginTop: 30,
        marginLeft: 8,
        height: 50,
        width: 140,
        borderRadius: 4,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    closeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button:{
        height: 70
    },
    buttonPress:{
        opacity: 0.7,
    },
});