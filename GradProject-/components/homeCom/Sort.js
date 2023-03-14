import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';

import { Colors, GlobalStyles } from "../../constants/styles";

const initialState = {
    highPrice: false,
    lowPrice: false,
    highGuest: false,
    lowGuest: false,
    nearLocation: false,
    farLocation: false,
};

function Sort({ Halls, SortHalls, visible, close }) {
    const [state, setState] = useState(initialState);

    useEffect(() => {

        if (state.highPrice) {
            const highPriceHalls = Halls.sort((a, b) => {
                return b.data.Price - a.data.Price;
            });
            SortHalls.bind(this, highPriceHalls);
        }
        else if (state.lowPrice) {
            const lowPriceHalls = Halls.sort((a, b) => {
                return a.data.Price - b.data.Price;
            });
            SortHalls.bind(this, lowPriceHalls);
        }

        if (state.highGuest) {
            //1-if(highPrice), 2-else if(lowPrice), 3-Do
            const highGuestHalls = Halls.sort((a, b) => {
                return b.data.Guests - a.data.Guests;
            });
            SortHalls.bind(this, highGuestHalls);
        }
        else if (state.lowGuest) {
            //1-if(highPrice), 2-else if(lowPrice), 3-Do
            const lowGuestHalls = Halls.sort((a, b) => {
                return a.data.Guests - b.data.Guests;
            });
            SortHalls.bind(this, lowGuestHalls);
        }

        if (state.nearLocation) {
            //1-if(highPrice && highGuest), 2-else if(highPrice && lowGuest), 3-else if(lowPrice && highGuest), 4-else if(lowPrice && lowGuest)
            //5-if(highPrice), 6-else if(lowPrice), 7-else if(highGuest), 8-else if(lowGuest) 9- Do
            const nearLocationHalls = Halls.sort((a, b) => {
                return (a.data.Location.latitude - b.data.Location.latitude) + (a.data.Location.longitude - b.data.Location.longitude);
            });
            SortHalls.bind(this, nearLocationHalls);
        }
    }, [state]);

    function onPress() {
        setState(initialState);
        close();
    }

    return (
        <View>
            <Modal isVisible={visible}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={styles.container}>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <Text style={styles.checkboxName}>Sort</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Pressable
                                onPress={close}
                            >
                                <Text style={styles.cencelButton}>X</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <FontAwesome name="money" size={24} color={GlobalStyles.colors.primary10} />
                            <Text style={styles.checkboxName}>High price</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Checkbox
                                style={styles.checkbox}
                                value={state.highPrice}
                                color={GlobalStyles.colors.primary10}
                                onValueChange={value =>
                                    setState({
                                        ...state,
                                        highPrice: value,
                                        lowPrice: false,
                                        highGuest: false,
                                        lowGuest: false,
                                        nearLocation: false,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <FontAwesome name="money" size={24} color={GlobalStyles.colors.primary10} />
                            <Text style={styles.checkboxName}>Low price</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Checkbox
                                style={styles.checkbox}
                                value={state.lowPrice}
                                color={GlobalStyles.colors.primary10}
                                onValueChange={value =>
                                    setState({
                                        ...state,
                                        lowPrice: value,
                                        highPrice: false,
                                        highGuest: false,
                                        lowGuest: false,
                                        nearLocation: false,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <MaterialCommunityIcons
                                name="account-group-outline"
                                size={24} color=
                                {GlobalStyles.colors.primary10}
                            />
                            <Text style={styles.checkboxName}>High Gusets</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Checkbox
                                style={styles.checkbox}
                                value={state.highGuest}
                                color={GlobalStyles.colors.primary10}
                                onValueChange={value =>
                                    setState({
                                        ...state,
                                        highGuest: value,
                                        lowGuest: false,
                                        highPrice: false,
                                        lowPrice: false,
                                        nearLocation: false,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <MaterialCommunityIcons
                                name="account-group-outline"
                                size={24} color=
                                {GlobalStyles.colors.primary10}
                            />
                            <Text style={styles.checkboxName}>Low Gusets</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Checkbox
                                color={GlobalStyles.colors.primary10}
                                style={styles.checkbox}
                                value={state.lowGuest}
                                onValueChange={value =>
                                    setState({
                                        ...state,
                                        lowGuest: value,
                                        highGuest: false,
                                        highPrice: false,
                                        lowPrice: false,
                                        nearLocation: false,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <View style={styles.TextContanier}>
                            <Ionicons
                                name="ios-location-outline"
                                size={24} color=
                                {GlobalStyles.colors.primary10}
                            />
                            <Text style={styles.checkboxName}>Nearest to me</Text>
                        </View>
                        <View style={styles.checkBoxToEnd}>
                            <Checkbox
                                style={styles.checkbox}
                                value={state.nearLocation}
                                color={GlobalStyles.colors.primary10}
                                onValueChange={value =>
                                    setState({
                                        ...state,
                                        nearLocation: value,
                                        lowGuest: false,
                                        highGuest: false,
                                        highPrice: false,
                                        lowPrice: false,
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                            onPress={onPress}
                        >
                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Save</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                            onPress={close}
                        >
                            <View style={styles.closeContainer}>
                                <Text style={styles.closeText}>Close</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </View>
    );
}
export default Sort;

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        backgroundColor: 'white',
        width: '113%',
        paddingTop: 4,
        borderRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        marginBottom: -18,
        marginLeft: -20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 25
    },
    loginContainer: {
        marginRight: 8,
        height: 40,
        width: 90,
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
    closeContainer: {
        marginLeft: 8,
        height: 40,
        width: 90,
        borderRadius: 4,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button: {
        height: 70
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 2,
    },
    checkContainer: {
        marginTop: 500,
        backgroundColor: 'white',
        width: '100%',
        height: 290,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'flex-start',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    checkTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#cccdb2',
        backgroundColor: 'white',
        minHeight: 45,
        marginTop: 3,
        paddingLeft: 10
    },
    cencelButton: {
        marginTop: 3,
        marginRight: 5,
        fontSize: 20,
    },
    checkbox: {
        marginHorizontal: 6,
        marginVertical: 6,
        borderRadius: 50,
        padding: 2
    },
    checkboxName: {
        fontSize: 16,
        marginLeft: 15
    },
    checkBoxToEnd: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    TextContanier: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
