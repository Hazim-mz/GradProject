import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 

import HallList from "../components/common/HallList";
import { HALLS } from '../data/dummy-data';

function Home({navigation, route}){
    const [enteredHall, setEnteredHall] = useState(HALLS);

    function sortHandler(){
        navigation.navigate('HomeSort');
    }
    function FilterHandler(){
        navigation.navigate('HomeFilter');
    }
    function DateHandler(){
        navigation.navigate('HomeDate');
    }

    useEffect(() => {
        if (route.params?.highPrice) {
            const highPriceHalls = enteredHall.sort((a, b) => {
                return b.price - a.price;
            });
            setEnteredHall(highPriceHalls);
            //console.log(enteredHall[0].price, enteredHall[1].price, enteredHall[2].price);
        }
        else if (route.params?.lowPrice) {
            const lowPriceHalls = enteredHall.sort((a, b) => {
                return a.price - b.price;
            });
            setEnteredHall(lowPriceHalls);
        }
        if (route.params?.highGuest) {
            const highGuestHalls = enteredHall.sort((a, b) => {
                return b.guests - a.guests;
            });
            setEnteredHall(highGuestHalls);
        }
        else if (route.params?.lowGuest) {
            const lowGuestHalls = enteredHall.sort((a, b) => {
                return a.guests - b.guests;
            });
            setEnteredHall(lowGuestHalls);
        }
    }, [route.params?.highPrice, route.params?.lowPriceHalls, route.params?.highGuest, route.params?.lowGuest, enteredHall]);

    

    

    return(
        <View style={styles.container}>

            <View style={styles.searchBar}>

                <View style={styles.searchBar1}>
                    <TextInput style={styles.search}/>
                    <Ionicons style={styles.map} name="map" size='30' color='#6A2B81' />
                </View>

                <View style={styles.searchBar2}>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)} 
                        onPress={sortHandler}
                    >
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="sort" size={30} color="#6A2B81" />
                            <Text>sort</Text>
                        </View>
                    </Pressable>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)}
                        onPress={FilterHandler} 
                    >
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="filter" size={30} color="#6A2B81" />
                            <Text>Filter</Text>
                        </View>
                    </Pressable>
                    <Pressable 
                        style={({pressed}) => (pressed ? styles.button : null)}
                        onPress={DateHandler} 
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
                    <HallList Halls={enteredHall}/>
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
  
