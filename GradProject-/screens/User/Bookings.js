import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Fontisto, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';


import { AuthContext } from "../../store/auth-context";

import { db } from '../../config';
import { collection, where, query, onSnapshot, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore';

import HallList from "../../components/Common/HallList";
import Search from "../../components/HomeCom/Search";
import { GlobalStyles } from "../../constants/styles";
import CategoryTags from "../../components/BookingCom/CategoryTags";
import CategorysLists from "../../components/BookingCom/CategorysLists";

const Tags = {
    New: true,
    History: false,
    Canceled: false,
};

var screenWidth = Dimensions.get('window').width;

function Bookings({ navigation, route }) {
    const userAccountCtx = useContext(AuthContext);
    //console.log(userAccountCtx); 
    function onPress() {
        navigation.navigate("LoginOverview");
    }


    //Search Fuction
    const [hallsBeforeSorting, setHallsBeforeSorting] = useState([]);//to show the previous hall before the search
    const [startSearch, setStartSearch] = useState(false);//to show x button to cancel the search
    const [search, setSearch] = useState('');//name of the hall you search for 
    function StartEnterNameOfHall(name) {
        setSearch(name);
    }
    function StartSearch(halls) {
        if (hallsBeforeSorting.length == 0) {
            setHallsBeforeSorting(bookedHalls);//old
        }
        setStartSearch(true);
        setHalls(halls);//new
    }
    function CancelSearch() {
        Keyboard.dismiss();
        setHalls(hallsBeforeSorting);
        setStartSearch(false);
        setSearch('');
    }

    //category 
    const [tags, setTags] = useState(Tags);
    const [tagActiveByClick, settagActiveByClick] = useState(false);
    const [tagActive, setTagActive] = useState(0);

    function onPressTagToScroll(index) {
        scroll.scrollTo({ x: index * screenWidth, y: 0, animated: true })
    }

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

    useEffect(() => {
        async function getReservation() {
            const reservationQuery1 = query(collection(db, 'Reservation'), where('UserID', '==', userAccountCtx.userID));//booked Reservations
            const reservationSnapshot1 = await getDocs(reservationQuery1);
            const reservationQuery2 = query(collection(db, 'CanceledReservation'), where('UserID', '==', userAccountCtx.userID));//canceled Reservations
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
        if(userAccountCtx.isAuthenticated){
            getReservation();
        }
    }, [userAccountCtx.isAuthenticated, route.params?.update])

    // if (bookedReservations.length) {
    //     if (bookedHalls.length) {
    //         console.log("number of booked halls: ", bookedReservations.length);
    //         console.log("number of book cancele : ", canceledHalls.length);
    //         for (var i = 0; i < bookedReservations.length; i++) {
    //             console.log("( ", bookedReservations[i].data.HallsID, bookedHalls[i].id, " )", "( ", bookedReservations[i].data.Date, bookedHalls[i].data.Date, " )", "( ", bookedHalls[i].data.cancelAvailable, " )");

    //         }
    //     }
    // }

    async function deleateReservations(hallID, Date) {
        const q = query(collection(db, "Reservation"), where("UserID", "==", userAccountCtx.userID), where("HallsID", "==", hallID), where("Date", "==", Date));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }

    if (!userAccountCtx.isAuthenticated) {
        return (
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
    else {
        if (bookedHalls.length == 0 && canceledHalls.length == 0) {
            return (
                <View style={styles.noChatContainer}>

                    <Text style={styles.noChatText1}>Start Booking Hall</Text>
                    <MaterialCommunityIcons name="card-bulleted-outline" size={100} color={GlobalStyles.colors.primary10} />
                    <Text style={styles.noChatText2}>And See Your Book History</Text>

                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.searchBarShow}>
                        <View style={styles.searchBar1}>
                            <Search
                                EnteredName={search}
                                StartEnterNameOfHall={StartEnterNameOfHall}
                                startSearch={startSearch}
                                current={bookedHalls}
                                old={hallsBeforeSorting}
                                SearchFuntion={StartSearch}
                                CancelSearch={CancelSearch}
                            />
                        </View>
                    </View>

                    <View style={styles.categoryContainer}>
                        <CategoryTags tags={tags} setTags={setTags} onPressTagToScroll={onPressTagToScroll} settagActiveByClick={settagActiveByClick} />
                    </View>

                    <View style={styles.hallContainer}>
                        <CategorysLists
                            tags={tags}
                            setTags={setTags}
                            tagActive={tagActive}
                            tagActiveByClick={tagActiveByClick}
                            setTagActive={setTagActive}
                            settagActiveByClick={settagActiveByClick}
                            bookedHalls={bookedHalls}
                            canceledHalls={canceledHalls}
                            LocationOfUser={route.params.locationOfUser}
                            deleateReservations={deleateReservations} 
                        />
                    </View>
                </View>
            );
        }
    }
}

export default Bookings;

const styles = StyleSheet.create({
    noChatContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noChatText1: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noChatText2: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    searchBarShow: {
        margin: 6,
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchBarHide: {
        height: 0,
        margin: 12,
        marginTop: 5,
        marginBottom: 20,
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchBar1: {
        borderRadius: 8,
        flexDirection: 'row',
    },
    searchBar2: {
        backgroundColor: '#ECECEC',
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    searchBar3: {
        backgroundColor: '#E8E8E8',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomWidth: 1,
        height: 15,
        borderColor: '#cccdb2',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    categoryContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 8
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
    container: {
        flex: 1,
    },
    hallContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});
