import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Keyboard,StyleSheet, Alert } from 'react-native';
import { Switch } from 'react-native-paper';


import { collection, where, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '../../config';

import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import AdminHallList from '../../components/AdminHomeCom/AdminHallList';
import LodingOverlay from '../../components/UI/LodingOverlay';
import Search from '../../components/homeCom/Search';
import HallMap from '../../components/homeCom/HallMap';

import { AuthContext } from "../../store/auth-context";
import { GlobalStyles } from '../../constants/styles';


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return{
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        };
    },
});

function AdminHome({navigation, route}){
    const userAccountCtx = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [halls, setHalls] = useState([]);
    const [unblockedHalls, setUnblockedHalls] = useState([]);
    const [blockedHalls, setBlockedHalls] = useState([]);
    const [reportedHalls, setReportedHalls] = useState([]);
    //Map Function
    const [mapIsVisible, setMapIsVisible] = useState(false);
    function openMap(){
        setMapIsVisible(true);
    }
    function closeMap(){
        setMapIsVisible(false);
    }


    //Search Fuction
    const [hallsBeforeSearching, setHallsBeforeSearching] = useState([]);//to show the previous hall before the search
    const [startSearch, setStartSearch] = useState(false);//to show x button to cancel the search
    const [search, setSearch] = useState('');//name of the hall you search for 
    function StartEnterNameOfHall(name){
        setSearch(name);
    }
    function StartSearch(Halls){
        setIsSwitchToBlock(false);
        setIsSwitchToReported(false);
        if(hallsBeforeSearching.length == 0){
            setHallsBeforeSearching(halls);//old
        }
        setStartSearch(true);
        setHalls(Halls);//new
    }
    function CancelSearch(){
        Keyboard.dismiss();
        setHalls(hallsBeforeSearching);
        setStartSearch(false);
        setSearch('');
    }

    //call Halls from DB
    useLayoutEffect(() => {
        const q = query(collection(db, "Halls"), orderBy("Rate", "desc"));
        onSnapshot(q, (Halls) =>
            setHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        );
        const qq = query(collection(db, "Halls"), where('isBlocked', '==', false));
        onSnapshot(qq, (Halls) =>
            setUnblockedHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        );
        const qqq = query(collection(db, "Halls"), where('isBlocked', '==', true));
        onSnapshot(qqq, (Halls) =>
            setBlockedHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        );
        const qqqq = query(collection(db, "Halls"), where('Report','>', 15));
        onSnapshot(qqqq, (Halls) =>
            setReportedHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        ); 
    }, []);

    const [isSwitchToBlock, setIsSwitchToBlock] = useState(false);

    const onToggleSwitchToBlock = () => setIsSwitchToBlock(!isSwitchToBlock);

    const [isSwitchToReported, setIsSwitchToReported] = useState(false);

    const onToggleSwitchToReport = () => setIsSwitchToReported(!isSwitchToReported);

    if(isSubmitting){
        return <LodingOverlay text={"Get your Loction"}/>;
    }

    return(
        <View style={styles.container}>

            <HallMap 
                Halls={unblockedHalls}
                locationOfUser={route.params.locationOfUser} 
                visible={mapIsVisible}
                close={closeMap}
            />


            <View style={styles.searchBar}>
                <View style={styles.searchBar1}>
                    <Search 
                        EnteredName={search} 
                        StartEnterNameOfHall={StartEnterNameOfHall} 
                        startSearch={startSearch} 
                        halls={halls}
                        oldHalls={hallsBeforeSearching} 
                        SearchFuntion={StartSearch} 
                        CancelSearch={CancelSearch}
                    />
                    <Pressable 
                        style={({pressed}) => (pressed ? [styles.button, styles.mapButton] : styles.mapButton)} 
                        onPress={openMap}
                    >
                    <FontAwesome5 style={styles.map} name="map-marked-alt" size={30} color= '#6A2B81' />
                    </Pressable>
                </View>

                <View style={styles.searchBar2}>

                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="fireplace-off" size={30} color="#6A2B81" />
                            <Switch value={isSwitchToBlock} onValueChange={onToggleSwitchToBlock} />
                            <View style={styles.blockHallContainer}>
                                <Text style={styles.blockHall}>/</Text>
                            </View>
                            <MaterialCommunityIcons name="fireplace-off" size={30} color="#6A2B81" />
                        </View>
                    
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)} 
                        onPress={onToggleSwitchToReport}
                    >
                        {
                            isSwitchToReported ?
                                <View style={[styles.icon, {marginRight: 5}]}>
                                    <MaterialIcons name="report" size={30} color="#6A2B81" />
                                </View>
                            :
                            <View style={[styles.icon, {marginRight: 5}]}>
                                <MaterialIcons name="report" size={30} color="#787575" />
                            </View>
                        }

                    </Pressable>

                </View>

            </View>

            <View style={{flex: 3}}>
                <View style={styles.hallContainer}>
                    {
                        isSwitchToBlock ?
                            isSwitchToReported ?
                                startSearch?
                                    <AdminHallList Halls={halls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                                :
                                    <AdminHallList Halls={reportedHalls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                            :
                                startSearch?
                                    <AdminHallList Halls={halls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                                :
                                    <AdminHallList Halls={blockedHalls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                        :
                            isSwitchToReported ?
                                startSearch?
                                    <AdminHallList Halls={halls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                                :
                                    <AdminHallList Halls={reportedHalls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                            :
                                startSearch ?
                                    <AdminHallList Halls={halls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                                :
                                    <AdminHallList Halls={unblockedHalls} LocationOfUser={route.params.locationOfUser} booking={false}/>
                    }
                </View>
            </View>
        </View>
    );
}

export default AdminHome;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    searchBar:{
      flex: 1,
      margin: 12,
    },
    searchBar1:{
        backgroundColor:'#E8E8E8',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 1,
        flexDirection: 'row',
    },
    map:{
        flex: 1,
        marginTop: 14,
    },
    mapButton:{
        flex: 1,
        alignItems: 'center',
        paddingRight: 4,
        marginRight: 4,
    },
    searchBar2:{
        backgroundColor: '#ECECEC',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
    },
    button:{
        opacity: 0.6,
    },
    icon:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    blockHallContainer: {
        position: 'absolute',
        alignItems: 'center',
        left: 92,
        bottom: -3,
    },
    blockHall: {
        fontSize: 34,
        color: GlobalStyles.colors.primary10,
        transform: [{ rotate: '30deg' }]
    },
    hallContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
  });
  