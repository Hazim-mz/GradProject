import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";

import { GlobalStyles } from "../../constants/styles";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

function AvailableDate({Halls, oldHalls, avalibleHalls, visible, close}){

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


    //highlight selected day and get the date
    const [highlightedDate, setHighlightedDate] = useState({});
    const [choosingDay, setChoosingDay] = useState('');
    function setSelectedDayHighlight(date){
        let markedDates = {};
        markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
        if(choosingDay == '')
            markedDates[todayDate] = { selected: false };
        else
            markedDates[choosingDay] = { selected: false };
        setHighlightedDate(markedDates);
        setChoosingDay(date);
    }
    
    //get booked halls in specific date 
    const [bookedHalls, setBookedHalls] = useState([]);
    useEffect(()=>{
        const Reservations = query(collection(db, "Reservation"), where("Date", "==", choosingDay));
        onSnapshot(Reservations, (Reservation) =>{
            setBookedHalls(Reservation.docs.map((reservation) =>({
                    id: reservation.id,
                    data: reservation.data()
                }))
            )
        })
    }, [choosingDay])


    function onPressDate(){     
        if(choosingDay != ''){

            if(Halls >= oldHalls){
                //Find values that are in result1 but not in result2
                var uniqueResultOne = Halls.filter((obj)=>{
                    return !bookedHalls.some((obj2)=>{
                        return obj.id == obj2.data.HallsID;
                    });
                });

                //Find values that are in result2 but not in result1
                var uniqueResultTwo = bookedHalls.filter((obj)=>{
                    return !Halls.some((obj2)=>{
                        return obj.data.HallsID == obj2.id;
                    });
                });
            }
            else{
                //Find values that are in result1 but not in result2
                var uniqueResultOne = oldHalls.filter((obj)=>{
                    return !bookedHalls.some((obj2)=>{
                        return obj.id == obj2.data.HallsID;
                    });
                });

                //Find values that are in result2 but not in result1
                var uniqueResultTwo = bookedHalls.filter((obj)=>{
                    return !oldHalls.some((obj2)=>{
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

    return(
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.calenderContainer}>
                    <Calendar
                        onDayPress={date => {
                            setSelectedDayHighlight(date.dateString);
                        }}
                        minDate={todayDate}
                        markedDates={highlightedDate}
                    />
                </View>
                <Button style={styles.button} title="Save" onPress={onPressDate.bind(this, choosingDay)}/>

            </View>
        </Modal>
    );
}

export default AvailableDate;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
    calenderContainer:{
        marginBottom: 120,
    },
    button:{
    },
});
