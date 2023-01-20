import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Calendar } from "react-native-calendars";


function Calendars({visible, dateFromCalendar, bookedDates}){

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

    //Make booked days inactive
    const disabled = { disabled: true, disableTouchEvent: true };
    let markedDates = {};
    for(var i=0; i<bookedDates.length; i++){
        markedDates[bookedDates[i].data.Date] = disabled;
        //console.log(markedDates);
    }

    return(
        <Modal visible={visible} animationType="fade">
            <View style={styles.container}>
                <Calendar 
                    onDayPress={date => {
                        dateFromCalendar.bind(this, date.dateString, date.day, date.month)();
                    }}
                    markedDates={markedDates}
                    minDate={todayDate}
                    
                />
            </View>
        </Modal>
    );
}
export default Calendars;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
});