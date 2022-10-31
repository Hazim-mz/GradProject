import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import Checkbox from 'expo-checkbox';

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

    


const initialState = {
    highPrice: false,
    lowPrice: false,
    highGuest: false,
    lowGuest: false,
};
function HomeSort({navigation}){
    const [state, setState] = useState(initialState);
    const [toggleButton, setToggleButton] = useState(false);

    function onPressHandler(){
        navigation.navigate({
            name: 'Home',
            params: { 
                highPrice: state.highPrice,
                lowPrice: state.lowPrice,
                highGuest: state.highGuest,
                lowGuest: state.lowGuest,
            },
            merge: true,
        });
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Hall Sort</Text>
            </View>
            <View style={styles.checkContainer}>
                <Text style={styles.checkTitle}>Price:</Text>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={state.highPrice}
                        disabled={state.lowPrice}
                        onValueChange={value =>
                            setState({
                                ...state,
                                highPrice: value,
                                lowPrice: !value,
                            })
                        }
                    />
                    <Text style={styles.checkboxName}>High</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={state.lowPrice}
                        disabled={state.highPrice}
                        onValueChange={value =>
                            setState({
                                ...state,
                                lowPrice: value,
                                highPrice: !value,
                            })
                        }
                    />
                    <Text style={styles.checkboxName}>Low</Text>
                </View>

                <Text style={styles.checkTitle}>Gusets:</Text>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={state.highGuest}
                        disabled={state.lowGuest}
                        onValueChange={value =>
                            setState({
                                ...state,
                                highGuest: value,
                                lowGuest: !value,
                            })
                        }
                    />
                    <Text style={styles.checkboxName}>High</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={state.lowGuest}
                        disabled={state.highGuest}
                        onValueChange={value =>
                            setState({
                                ...state,
                                lowGuest: value,
                                highGuest: !value,
                            })
                        }
                    />
                    <Text style={styles.checkboxName}>Low</Text>
                </View>
            </View>
            <View style={{flex: 3}}>
                <View style={styles.hallContainer}>
                    <HallList Halls={enteredHall}/>
                </View>
            </View>

            <Button
                onPress={onPressHandler}
                title="Save"
            />
        </View>
    );
}

export default HomeSort;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 80,
    },
    titleContainer:{
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 2,
    },
    checkContainer:{
        marginTop: 32,
        marginLeft: 4,
    },
    checkTitle:{
        fontSize:18,
        fontWeight: 'bold',
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox:{
        marginHorizontal: 6,
        marginVertical: 6,
    },
    checkboxName:{
        fontSize:16,
    },
    hallContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
  });
  
});
