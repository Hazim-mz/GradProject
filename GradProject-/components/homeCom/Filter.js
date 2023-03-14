import { View, Text, Button, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

import InputSlider from "../homeCom/InputSlider";
import { Colors, GlobalStyles } from '../../constants/styles';

function Filter({ Halls, oldHalls, FilterHalls, visible, close }) {
    //console.log(Halls) 

    const [Price, setPrice] = useState({});
    const [Guests, setGuests] = useState({});
    const [emptyRate, setEmptyRate] = useState('#bfba22');//false
    const [rate, setRate] = useState(0);

    // console.log('price:',Price) 
    // console.log('guests:',Guests)
    // console.log(rate)

    function onPressFilter() {
        var newHalls;
        if (Halls >= oldHalls) {
            if (rate == 0) {

                if (Object.keys(Price).length == 0) {

                    if (Object.keys(Guests).length == 0) {
                        //Nothing
                    } else {
                        //Guests
                        newHalls = Halls.filter(item => {
                            return (
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests)
                            );
                        });
                    }

                } else {

                    if (Object.keys(Guests).length == 0) {
                        //Price
                        newHalls = Halls.filter(item => {
                            return (
                                (Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price))
                            );
                        });
                    } else {
                        //Price && Guests
                        newHalls = Halls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price) &&
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests)
                            );
                        });
                    }

                }

            } else {//oldHall
                if (Object.keys(Price).length == 0) {

                    if (Object.keys(Guests).length == 0) {
                        //Rate
                        console.log('hi');
                        newHalls = Halls.filter(item => {
                            return (
                                rate <= item.data.Rate
                            );
                        });
                    } else {
                        //Rate && Guests
                        newHalls = Halls.filter(item => {
                            return (
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    }

                } else {

                    if (Object.keys(Guests).length == 0) {
                        //Rate && Price
                        newHalls = Halls.filter(item => {
                            return (
                                Price.max >= (item.data.Guests) && Price.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    } else {
                        //Rate && Price && Guests
                        newHalls = Halls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price) &&
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    }

                }
            }



            //old Halls
        } else {

            if (rate == 0) {

                if (Object.keys(Price).length == 0) {

                    if (Object.keys(Guests).length == 0) {
                        //Nothing
                    } else {
                        //Guests
                        newHalls = oldHalls.filter(item => {
                            return (
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests)
                            );
                        });
                    }

                } else {

                    if (Object.keys(Guests).length == 0) {
                        //Price
                        newHalls = oldHalls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price)
                            );
                        });
                    } else {
                        //Price && Guests
                        newHalls = oldHalls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price) &&
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests)
                            );
                        });
                    }

                }

            } else {

                if (Object.keys(Price).length == 0) {

                    if (Object.keys(Guests).length == 0) {
                        newHalls = oldHalls.filter(item => {
                            return (
                                rate <= item.data.Rate
                            );
                        });
                    } else {
                        //Rate && Guests
                        newHalls = oldHalls.filter(item => {
                            return (
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    }

                } else {

                    if (Object.keys(Guests).length == 0) {
                        //Rate && Price
                        newHalls = oldHalls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Guests) && Price.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    } else {
                        //Rate && Price && Guests
                        newHalls = oldHalls.filter(item => {
                            return (
                                Price.max >= Number(item.data.Price) && Price.min <= Number(item.data.Price) &&
                                Guests.max >= Number(item.data.Guests) && Guests.min <= Number(item.data.Guests) &&
                                rate <= item.data.Rate
                            );
                        });
                    }

                }
            }
        }
        console.log(newHalls);
        FilterHalls(newHalls);
        setPrice({});
        setGuests({});
        setRate(0);
        close();
    }

    return (
        <View>
            <Modal isVisible={visible}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={styles.container}>

                    <View style={styles.checkContainer}>
                        <View style={styles.sliderContainer}>
                            <View style={[styles.header, { borderBottomWidth: 1.5, borderTopRadius: 20 }]}>
                                <Text style={styles.title}>Filter</Text>
                                <View>
                                    <Pressable
                                        onPress={close}
                                    >
                                        <Text style={styles.cencelButton}>X</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <InputSlider min={1000} max={60000} steps={1000} title='Price' onValueChange={(range) => setPrice(range)} />
                            <InputSlider min={50} max={3500} steps={10} title='Guest' onValueChange={(range) => setGuests(range)} />

                            <View style={styles.header}>
                                <Text style={styles.subTitle}>Rating</Text>
                            </View>

                            <View style={styles.ratingContainer2}>
                                <Pressable
                                    onPress={() => { setRate(1); setEmptyRate('#bfba22'); }}
                                >
                                    <Ionicons style={styles.map} name={rate > 0 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                                </Pressable>
                                <Pressable
                                    onPress={() => { setRate(2); setEmptyRate('#bfba22'); }}
                                >
                                    <Ionicons style={styles.map} name={rate > 1 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                                </Pressable>
                                <Pressable
                                    onPress={() => { setRate(3); setEmptyRate('#bfba22'); }}
                                >
                                    <Ionicons style={styles.map} name={rate > 2 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                                </Pressable>
                                <Pressable
                                    onPress={() => { setRate(4); setEmptyRate('#bfba22'); }}
                                >
                                    <Ionicons style={styles.map} name={rate > 3 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                                </Pressable>
                                <Pressable
                                    onPress={() => { setRate(5); setEmptyRate('#bfba22'); }}
                                >
                                    <Ionicons style={styles.map} name={rate > 4 ? 'star' : 'star-outline'} size='22' color={emptyRate} />
                                </Pressable>
                            </View>
                            <View style={[styles.ratingContainer2, { paddingBottom: 60 }]}>
                                <View>

                                    <Pressable
                                        style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                        onPress={onPressFilter}
                                    >
                                        <View>
                                            <Text style={styles.loginText}>Apply</Text>
                                        </View>

                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 4
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        paddingVertical: 4,
        height: 30,
        width: 110,
        height: 40,
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

        color: 'white'
    },
    buttonPress: {
        opacity: 0.7,

    },
    titleContainer: {
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 2,
    },
    checkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        marginHorizontal: 6,
        marginVertical: 6,
    },
    checkboxName: {
        fontSize: 16,
    },
    sliderContainer: {
        flexDirection: 'coulmn',
        paddingVertical: 30,
        paddingRight: 30,
        paddingLeft: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,

    },
    ratingContainer2: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderColor: '#cccdb2',
        borderBottomWidth: 1,
    },
    map: {
        padding: 2
    },
    subTitle: {
        color: '#333',
        fontSize: 16,
    },

    header: {
        backgroundColor: Colors.light,
        borderColor: '#cccdb2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    button: {
        paddingVertical: 4,
        height: 30,
        width: 110,
        height: 40,
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
    cencelButton: {
        marginTop: 3,
        marginRight: 5,
        fontSize: 18,

    },
});