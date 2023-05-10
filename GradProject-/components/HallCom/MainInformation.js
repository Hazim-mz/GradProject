import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { GlobalStyles } from "../../constants/styles";
import Calendars from "./Calendars";
import Star from "../Common/Star";

function MainInformation({data, specialPricesDate, onPressLocation, onPressBook, bookedDates}){ 

    const [price, setPrice] = useState(data.price);

    const [date, setDate] = useState('');
    const [choosingDay, setChoosingDay] = useState(0);
    const [choosingMonth, setChoosingMonth] = useState(0);
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);
    function openCalendar(){
        setCalendarIsVisible(true);
    }
    function closeCalendar(){
        setCalendarIsVisible(false);
    }
    function changedate(date, day, month){
        setDate(date);
        setChoosingDay(day);
        setChoosingMonth(month);
    }

    const getWeekday = (date) => {
        let d = new Date(date)
    
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
        let day = weekday[d.getDay()];
    
        return day;
    }
    useEffect(()=>{
        var tempDate = specialPricesDate.filter(item => item.data.Date === date);
        if(tempDate.length != 0){
            setPrice(tempDate[0].data.Price);
        }else if((getWeekday(date) == 'Friday'|| getWeekday(date) == 'Saturday') && data.weekendPrice != ''){
            setPrice(data.weekendPrice);
        }else{
            setPrice(data.price);
        }
    }, [date]);

    return(
        <View style={styles.mainInfoContainer}>

            <Calendars dateFromCalendar={changedate} bookedDates= {bookedDates} visible={calendarIsVisible} close={closeCalendar}/>

            <View style={styles.maininfo}>
                <View>
                    <Text style={styles.boldName}>{data.name}</Text>
                </View>
                <View style={styles.maininfo2}>
                    {
                        price == 0 ?
                            <Text style={styles.boldName}>{data.price}</Text>
                        :
                        <Text style={styles.boldName}>{price}</Text>
                    }
                    <Text style={styles.normalName}> SR</Text>
                </View>
            </View>

            <View style={styles.maininfo}>
                <View style={styles.maininfo2}>
                    <View>
                        <MaterialCommunityIcons 
                            name="account-group" 
                            size={30} 
                            color={GlobalStyles.colors.primary10} 
                        />
                    </View>
                    <View style={styles.guestsInfoContainer}>
                        <Text style={{fontSize:17}}>{data.guests}, </Text>
                        <Text style={{fontSize:17}}>Guests</Text>
                    </View>
                </View>
                    <Star rate={data.rate} size={18} />
            </View>

            <View style={styles.maininfo3}>
                <Pressable 
                    style={({pressed}) => (
                        pressed ? [styles.button, styles.maininfo2] : styles.maininfo2
                    )}
                    onPress={onPressLocation}
                >
                    <View>
                        <FontAwesome5 
                            name="map-marked-alt" 
                            size={25} 
                            color= {GlobalStyles.colors.primary10} 
                        />
                    </View>
                    <View style={styles.loctionInfoContainer}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}>Location</Text>
                    </View>
                </Pressable>

                <View style={styles.BookContainer}>
                    <View>
                        {
                            choosingDay == 0 ? 
                                <View></View> 
                            :
                                <View style={styles.choosingDayContainer}>
                                    <Text style={styles.choosingDayText}>{choosingDay}/{choosingMonth}</Text>
                                </View> 
                        }
                    </View>
                    <View style={styles.calendar}>
                        <Pressable
                                style={({pressed}) => (
                                    pressed ? styles.button : null
                                )}
                                onPress={openCalendar}
                            >
                            <Ionicons name="calendar" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View>
                        {
                            date == '' ?
                                <Pressable
                                    style={({pressed}) => (
                                        pressed ? styles.button : null
                                    )}
                                    onPress={() => {alert('Choose the date first');}}
                                >
                                    <View style={styles.buttonDesignNoClick}>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>Book</Text>
                                    </View>
                                </Pressable>
                            :
                                <Pressable
                                    style={({pressed}) => (
                                        pressed ? styles.button : null
                                    )}
                                    onPress={onPressBook.bind(this, data.id, date, price)}
                                >
                                    <View style={styles.buttonDesign}>
                                        <Text style={{color: 'white', fontWeight: 'bold'}}>Book</Text>
                                    </View>
                                </Pressable>
                        }
                        
                    </View>
                </View>

            </View>
        </View>
    );
}

export default MainInformation;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imageContainer:{
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',
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
        backgroundColor: 'white'
    },
    maininfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        
    },
    maininfo2:{
        flexDirection: 'row',
    },
    maininfo3:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    guestsInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 2,
    },
    loctionInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 3,
    },
    BookContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    choosingDayContainer:{
        marginRight: 4,
    },
    choosingDayText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    calendar:{
        marginRight: 8
    },
    line:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        marginVertical: 4,
    },
    boldName:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    normalName:{
        fontSize: 20,
    },
    buttonDesignNoClick:{
        height: 30,
        width: 70,
        borderRadius: 5,
        borderWidth:1,
        borderColor: '#a19c8f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDesign:{
        height: 30,
        width: 70,
        borderRadius: 5,
        backgroundColor: GlobalStyles.colors.primary10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        opacity: 0.8,
    },
});