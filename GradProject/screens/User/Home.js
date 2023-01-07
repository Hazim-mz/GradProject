import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { collection, setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 

import HallList from '../../components/common/HallList';
import Sort from '../../components/homeCom/Sort';
import LodingOverlay from '../../components/UI/LodingOverlay';

function Home({navigation, route}){
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [Halls, setHalls] = useState([]);
    const [bookedDays, setBookedDays] = useState([]);

    const [sortIsVisible, setSortIsVisible] = useState(false);
    function openSort(){
        setSortIsVisible(true);
    }
    function closeSort(){
        setSortIsVisible(false);
    }
    function SortHalls(Halls){
        setHalls(Halls);
    }

    //call Halls from DB
    useLayoutEffect(() => {
        const ref = collection(db, "Halls");
        onSnapshot(ref, (Halls) =>
            setHalls(Halls.docs.map((Hall) =>({
                    id: Hall.id,
                    data: Hall.data()
                }))
            )
        );

        const reff = collection(db, "Reservation");
        onSnapshot(reff, (Reservation) =>
            setBookedDays(Reservation.docs.map((reservations) =>({
                    id: reservations.id,
                    data: reservations.data()
                }))
            )
        );
       
    }, []);


    const [locationOfUser, setLocationOfUser] = useState({
        latitude: -1,
        longitude: -1
    });
    useEffect(() => {
        (async () => {
            setIsSubmitting(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            //console.log(location);
            setLocationOfUser({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setIsSubmitting(false);
        })();
    }, []);

    if(isSubmitting){
        return <LodingOverlay text={"Get your Loction"}/>;
    }

    return(
        <View style={styles.container}>

            <Sort Halls={Halls} SortHalls={SortHalls} visible={sortIsVisible} close={closeSort}/>

            <View style={styles.searchBar}>

                <View style={styles.searchBar1}>
                    <TextInput style={styles.search}/>
                    <Ionicons style={styles.map} name="map" size='30' color='#6A2B81' />
                </View>

                <View style={styles.searchBar2}>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)} 
                        onPress={openSort}
                    >
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="sort" size={30} color="#6A2B81" />
                            <Text>sort</Text>
                        </View>
                    </Pressable>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)}
                        onPress={openSort} 
                    >
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="filter" size={30} color="#6A2B81" />
                            <Text>Filter</Text>
                        </View>
                    </Pressable>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)}
                        onPress={openSort} 
                    >                        
                        <View style={styles.icon}>
                            <Fontisto name="date" size={30} color="#6A2B81" />
                            <Text> Date</Text>
                        </View>
                    </Pressable>
                </View>

            </View>

            <View style={{flex: 3}}>
                <View style={styles.hallContainer}>
                    <HallList Halls={Halls} BookedDays={bookedDays} LocationOfUser={locationOfUser}/>
                </View>
            </View>
        </View>
    );
}

export default Home;

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
    search:{
        flex: 6,
        borderWidth: 1,
        borderRadius: 8,
        margin: 12,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    map:{
        flex: 1,
        marginTop: 14,
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
    hallContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
  });
  