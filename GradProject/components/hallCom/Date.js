import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Calendar } from "react-native-calendars";


function Date({visible, dateFromCalendar, bookedDates, todayDate}){

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
                        dateFromCalendar.bind(this, date.dateString, date.day)();
                    }}
                    markedDates={markedDates}
                    minDate={todayDate}
                    
                />
            </View>
        </Modal>
    );
}
export default Date;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
});
