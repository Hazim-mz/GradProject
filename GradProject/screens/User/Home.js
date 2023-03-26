import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Keyboard, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

import { collection, where, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config';

import { Ionicons, MaterialCommunityIcons, Fontisto, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HallList from '../../components/common/HallList';
import Sort from '../../components/homeCom/Sort';
import LodingOverlay from '../../components/UI/LodingOverlay';
import Search from '../../components/homeCom/Search';
import AvailableDate from '../../components/homeCom/AvailableDate';
import Filter from '../../components/homeCom/Filter';
import HallMap from '../../components/homeCom/HallMap';

import { AuthContext } from "../../store/auth-context";


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        };
    },
});

function Home({ navigation, route }) {

    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    }, [navigation]);

    const userAccountCtx = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [Halls, setHalls] = useState([]);

    //Sort Function
    const [mapIsVisible, setMapIsVisible] = useState(false);
    function openMap() {
        setMapIsVisible(true);
    }
    function closeMap() {
        setMapIsVisible(false);
    }

    //Sort Function
    const [sortIsVisible, setSortIsVisible] = useState(false);
    function openSort() {
        setSortIsVisible(true);
    }
    function closeSort() {
        setSortIsVisible(false);
    }
    function SortHalls(Halls) {
        setHalls(Halls);
    }

    //Filter Function
    const [hallsBeforeFilter, setHallsBeforeFilter] = useState([]);//to show the previous hall before the choose avalible date 
    const [startFilter, setStartFilter] = useState(false);//to show x button to cancel choosing avalible date 
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    function openFilter() {
        setFilterIsVisible(true);
    }
    function closeFilter() {
        setFilterIsVisible(false);
    }
    function cancelFilter() {
        setStartFilter(false);
        setHalls(hallsBeforeFilter);
    }
    function FilterHalls(halls) {
        if (hallsBeforeFilter.length == 0) {
            setHallsBeforeFilter(Halls);//old
        }
        setStartFilter(true);
        setHalls(halls);//new
    }

    //Date Function
    const [hallsBeforeDate, setHallsBeforeDate] = useState([]);//to show the previous hall before the choose avalible date 
    const [startDate, setStartDate] = useState(false);//to show x button to cancel choosing avalible date 
    const [dateIsVisible, setDateIsVisible] = useState(false);
    function openDate() {
        setDateIsVisible(true);
    }
    function closeDate() {
        setDateIsVisible(false);
    }
    function cancelAvalibleDate() {
        setStartDate(false);
        setHalls(hallsBeforeDate);
    }
    function avalibleHalls(halls) {
        if (hallsBeforeDate.length == 0) {
            setHallsBeforeDate(Halls);//old
        }
        setStartDate(true);
        setHalls(halls);//new
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
            setHallsBeforeSorting(Halls);//old
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

    //Search bar 
    const [startSearchBar, setStartSearchBar] = useState(true);//to show x button to cancel the search
    function SearchBar() {
        if (startSearchBar) {
            setStartSearchBar(false);
        } else {
            setStartSearchBar(true);
        }
    }

    //call Halls from DB
    useLayoutEffect(() => {
        const ref = query(collection(db, "Halls"), orderBy("Rate", "desc"));
        onSnapshot(ref, (Halls) =>
            setHalls(Halls.docs.map((Hall) => ({
                id: Hall.id,
                data: Hall.data()
            }))
            )
        );

    }, []);

    // get notifications Address of the user after register 
    // const [puchNotificationsAddress, setPuchNotificationsAddress] = useState('');
    // useLayoutEffect(() => {
    //     async function configurePuchNotifications(){
    //         const { status } = await Notifications.getPresentedNotificationsAsync();
    //         let finalStatus = status;

    //         if(finalStatus !== 'granted'){
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }

    //         if(finalStatus !== 'granted'){
    //             Alert.alert(
    //                 'Permission required',
    //                 'You no longer can get notifications about new reservation or review'
    //             );
    //             return;
    //         }
    //         const puchTokenData = await Notifications.getExpoPushTokenAsync();
    //         //console.log(puchTokenData);
    //         setPuchNotificationsAddress(puchTokenData.data);
    //     }
    //     if(userAccountCtx.isAuthenticated){
    //         configurePuchNotifications();
    //     }

    // }, [userAccountCtx.isAuthenticated]);
    // useLayoutEffect(() => {
    //     if(puchNotificationsAddress != ''){

    //         const docRef1 = doc(db, "Users",  userAccountCtx.userID);
    //         updateDoc(docRef1, {
    //             NotificationsAddress: puchNotificationsAddress
    //         });

    //         if(userAccountCtx.rule > 0.5){
    //             const docRef2 = doc(db, "Halls",  userAccountCtx.userID);
    //             updateDoc(docRef2, {
    //                 OwnerNotifAddr: puchNotificationsAddress
    //             });
    //         }

    //         userAccountCtx.notificationsAddress = puchNotificationsAddress;
    //     }

    // }, [puchNotificationsAddress]);

    //console.log(puchNotificationsAddress);

    if (isSubmitting) {
        return <LodingOverlay text={"Get your Loction"} />;
    }

    return (
        <View style={styles.container}>

            <HallMap
                Halls={Halls}
                locationOfUser={route.params.locationOfUser}
                visible={mapIsVisible}
                close={closeMap}
            />

            <Sort
                Halls={Halls}
                SortHalls={SortHalls}
                locationOfUser={route.params.locationOfUser}
                visible={sortIsVisible}
                close={closeSort}
            />

            <Filter
                Halls={Halls}
                oldHalls={hallsBeforeFilter}
                FilterHalls={FilterHalls}
                visible={filterIsVisible}
                close={closeFilter}
            />

            <AvailableDate
                Halls={Halls}
                oldHalls={hallsBeforeDate}
                avalibleHalls={avalibleHalls}
                visible={dateIsVisible}
                close={closeDate}
            />

            <View style={startSearchBar ? styles.searchBarShow : styles.searchBarHide}>
                {
                    startSearchBar ?
                        <View style={{flex: 1}}>
                            <View style={styles.searchBar1}>
                                <Search
                                    EnteredName={search}
                                    StartEnterNameOfHall={StartEnterNameOfHall}
                                    startSearch={startSearch}
                                    current={Halls}
                                    old={hallsBeforeSorting}
                                    SearchFuntion={StartSearch}
                                    CancelSearch={CancelSearch}
                                />
                                <Pressable
                                    style={({ pressed }) => (pressed ? [styles.button, styles.mapButton] : styles.mapButton)}
                                    onPress={openMap}
                                >
                                    <FontAwesome5 style={styles.map} name="map-marked-alt" size={30} color='#6A2B81' />
                                </Pressable>
                            </View>

                            <View style={styles.searchBar2}>
                                <Pressable
                                    style={({ pressed }) => (pressed ? styles.button : null)}
                                    onPress={openSort}
                                >
                                    <View style={styles.icon}>
                                        <MaterialCommunityIcons name="sort" size={30} color="#6A2B81" />
                                        <Text>sort</Text>
                                    </View>
                                </Pressable>

                                <View style={styles.FilterContainer}>
                                    {
                                        startFilter
                                            ?
                                            <Pressable
                                                onPress={cancelFilter}
                                                style={styles.cencelButtonContainer}
                                            >
                                                <Text style={styles.filterCencelButton}>X</Text>
                                            </Pressable>
                                            :
                                            <View></View>

                                    }
                                    <Pressable
                                        style={({ pressed }) => (pressed ? styles.button : null)}
                                        onPress={openFilter}
                                    >
                                        <View style={styles.icon}>
                                            <MaterialCommunityIcons name="filter" size={30} color="#6A2B81" />
                                            <Text>Filter</Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <View style={styles.DateContainer}>
                                    {
                                        startDate
                                            ?
                                            <Pressable
                                                onPress={cancelAvalibleDate}
                                                style={styles.cencelButtonContainer}
                                            >
                                                <Text style={styles.dateCencelButton}>X</Text>
                                            </Pressable>
                                            :
                                            <View></View>

                                    }
                                    <Pressable
                                        style={({ pressed }) => (pressed ? styles.button : null)}
                                        onPress={openDate}
                                    >
                                        <View style={styles.icon}>
                                            <Fontisto name="date" size={30} color="#6A2B81" />
                                            <Text> Date</Text>
                                        </View>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                        :
                        <></>
                }

                {
                    startSearchBar ?
                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.button, styles.searchBar3] : styles.searchBar3)}
                            onPress={SearchBar}
                        >
                            <Entypo name="chevron-thin-up" size={15} color="black" />
                        </Pressable>
                        :
                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.button, styles.searchBar3] : [styles.searchBar3, {borderRadius: 8, height: 18}])}
                            onPress={SearchBar}
                        >
                            <Entypo name="chevron-thin-down" size={15} color="black" />
                        </Pressable>
                }
            </View>

            <View style={{ flex: 3 }}>
                <View style={styles.hallContainer}>
                    <HallList Halls={Halls} LocationOfUser={route.params.locationOfUser} booking={false} />
                </View>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarShow: {
        height: 125,
        margin: 12,
        marginBottom: 4, 
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
        backgroundColor: '#E8E8E8',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cccdb2',
    },
    map: {
        flex: 1,
        marginTop: 14,
    },
    mapButton: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 4,
        marginRight: 4,
    },
    searchBar2: {
        backgroundColor: '#ECECEC',
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    button: {
        opacity: 0.6,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    FilterContainer: {
        flexDirection: 'row',
    },
    DateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cencelButtonContainer: {
    },
    filterCencelButton: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: 20,
        bottom: -3,
        right: 1,
        padding: 6
    },
    dateCencelButton: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: 20,
        bottom: -20,
        right: 1,
        padding: 6
    },
    cencelButton: {
        marginTop: 3,
        marginRight: 5,
        fontSize: 20,
    },
    hallContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});
