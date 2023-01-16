import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Keyboard,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { collection, where, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config';

import { Ionicons, MaterialCommunityIcons, Fontisto, FontAwesome,FontAwesome5 } from '@expo/vector-icons';

import HallList from '../../components/common/HallList';
import Sort from '../../components/homeCom/Sort';
import LodingOverlay from '../../components/UI/LodingOverlay';
import Search from '../../components/homeCom/Search';

function Home({navigation, route}){
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [Halls, setHalls] = useState([]);
    
    //Sort Function
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

    //Search Fuction
    const [oldHalls, setOldHalls] = useState([]);//to show the previous hall before the search
    const [startSearch, setStartSearch] = useState(false);//to show x button to cancel the search
    const [search, setSearch] = useState('');//name of the hall you search for 
    function StartEnterNameOfHall(name){
        setSearch(name);
    }
    function StartSearch(halls){
        if(oldHalls.length == 0){
            setOldHalls(Halls);//old
        }
        setStartSearch(true);
        setHalls(halls);//new
    }
    function CancelSearch(){
        Keyboard.dismiss();
        setHalls(oldHalls);
        setStartSearch(false);
        setSearch('');
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
        
    }, []);
    //console.log(Halls);
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

            <Sort Halls={Halls} SortHalls={SortHalls} locationOfUser={locationOfUser} visible={sortIsVisible} close={closeSort}/>

            <View style={styles.searchBar}>

                <Search 
                    EnteredName={search} 
                    StartEnterNameOfHall={StartEnterNameOfHall} 
                    startSearch={startSearch} 
                    halls={Halls}
                    oldHalls={oldHalls} 
                    SearchFuntion={StartSearch} 
                    CancelSearch={CancelSearch}
                />

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
                    <HallList Halls={Halls} LocationOfUser={locationOfUser}/>
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
    searchContainer:{
        flex: 6,
        borderWidth: 1,
        borderRadius: 8,
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    search:{
        flex: 6,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        height: '100%',
        fontSize: 18,
    },
    searchButton:{
        flex: 6,
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        backgroundColor: '#1a54ab',
        height: 15,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
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
  
