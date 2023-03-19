import { View, Text, Pressable, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons  } from '@expo/vector-icons'; 

import { AuthContext } from "../../store/auth-context";

import { db } from '../../config'; 
import { collection, where, query, onSnapshot, getDocs, deleteDoc } from 'firebase/firestore';

import HallList from "../../components/common/HallList";
import { GlobalStyles } from "../../constants/styles";

function Bookings({navigation, route}){
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx); 
    function onPress(){
        navigation.navigate("LoginOverview");
    }

    const [Halls, setHalls] = useState([]);//all halls
    const [reservations, setReservations] = useState([]);//reservations of user
    const [bookedHalls, setBookedHalls] = useState([]);//halls reserved by the user

    //get reservations of user
    useEffect(()=>{
        const ref = collection(db, "Halls");
        onSnapshot(ref, (Halls) =>
            setHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        );
        if(userAccountCtx.isAuthenticated && userAccountCtx.userID !== undefined ){
            const dates = query(collection(db, "Reservation"), where("UserID", "==", userAccountCtx.userID));
            onSnapshot(dates, (Reservation) =>{
                setReservations(Reservation.docs.map((reservations) =>({
                        id: reservations.id,
                        data: reservations.data()
                    }))
                )
            });
        }
    },[userAccountCtx.isAuthenticated, route.params?.update]);

    //after get reservations of user get the halls the user reserved 
    function requiredMediaByName (id){
        return Halls.find(item => item.id === id);
    };
    //to check if the user can cancel the reservation or not  
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
    
    function isLater(dateString1) {
        return dateString1 > todayDate
    }

    useEffect(()=>{
        if(reservations.length>0){
            //let HallsID = reservations.map(item => item.data.HallsID);
            //console.log(HallsID);
            //let BookedHalls = Halls.filter(item => (HallsID.includes(item.id)));
            //console.log(BookedHalls);

            //sort hall by the date to make the new in top 
            list= reservations.sort((a, b) => (a.data.Date < b.data.Date) ? 1 : -1)

            let BookedHalls = [];
            let temp = {};
            for(var i=0; i<list.length ; i++){
                temp = requiredMediaByName(list[i].data.HallsID);
                if(isLater(list[i].data.Date))
                    temp = {...temp, cancelAvailable: true, Date: list[i].data.Date}
                else
                    temp = {...temp, cancelAvailable: false, Date: list[i].data.Date}
                BookedHalls.push(temp);
            }

            setBookedHalls(BookedHalls); 

        }
        else{
            setBookedHalls([]);
        }
    },[reservations]);

    //console.log('Halls: ', Halls); 
    //console.log('reservations of user: ', reservations);
    //console.log('halls reserved by the user: ', bookedHalls);

    async function deleateReservations(hallID, Date){
        const q = query(collection(db, "Reservation"), where("UserID", "==", userAccountCtx.userID), where("HallsID", "==", hallID), where("Date", "==", Date));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }

    if(! userAccountCtx.isAuthenticated){
        return(
            <View style={styles.noChatContainer}>

                <Text style={styles.noChatText1}>Start Booking Hall</Text>
                <MaterialCommunityIcons name="card-bulleted-outline" size={120} color={GlobalStyles.colors.primary10} />
                <Text style={styles.noChatText2}>And See Your Book History</Text>

                <Pressable
                    style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                    onPress={onPress}
                >
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Login</Text>
                    </View>
                </Pressable>

            </View>
        );
    }
    else{
        if(bookedHalls.length == 0){
            return(
                <View style={styles.noChatContainer}>

                    <Text style={styles.noChatText1}>Start Booking Hall</Text>
                    <MaterialCommunityIcons name="card-bulleted-outline" size={100} color={GlobalStyles.colors.primary10} />
                    <Text style={styles.noChatText2}>And See Your Book History</Text>

                </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    <View style={styles.hallContainer}>
                        <HallList Halls={bookedHalls} LocationOfUser={route.params.locationOfUser} booking={true} deleateReservations={deleateReservations}/>
                    </View>
                </View>
            );
        }
    }
}

export default Bookings;

const styles = StyleSheet.create({
    noChatContainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noChatText1:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    noChatText2:{
        fontSize: 14,
        fontWeight: 'bold',
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
    button: {
        height: 70,
        marginTop: 15,
    },
    buttonPress: {
        opacity: 0.7,
    },
    container:{
        flex: 1,
        alignItems: 'center',
    },
    hallContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
});
  