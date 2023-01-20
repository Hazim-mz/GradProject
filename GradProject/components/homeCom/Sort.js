import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from 'expo-checkbox';

const initialState = {
    highPrice: false,
    lowPrice: false,
    highGuest: false,
    lowGuest: false,
    nearLocation: false,
    farLocation: false,
};

function Sort({Halls, SortHalls, visible, close}){
    const [state, setState] = useState(initialState);

    useEffect(() => {

        if(state.highPrice) {
            const highPriceHalls = Halls.sort((a, b) => {
                return b.data.Price - a.data.Price;
            });
            SortHalls.bind(this, highPriceHalls);
        }
        else if(state.lowPrice) {
            const lowPriceHalls = Halls.sort((a, b) => {
                return a.data.Price - b.data.Price;
            });
            SortHalls.bind(this, lowPriceHalls);
        }

        if(state.highGuest) {
            //1-if(highPrice), 2-else if(lowPrice), 3-Do
            const highGuestHalls = Halls.sort((a, b) => {
                return b.data.Guests - a.data.Guests;
            });
            SortHalls.bind(this, highGuestHalls);
        }
        else if(state.lowGuest) {
            //1-if(highPrice), 2-else if(lowPrice), 3-Do
            const lowGuestHalls = Halls.sort((a, b) => {
                return a.data.Guests - b.data.Guests;
            });
            SortHalls.bind(this, lowGuestHalls);
        }

        if(state.farLocation) {
            //1-if(highPrice && highGuest), 2-else if(highPrice && lowGuest), 3-else if(lowPrice && highGuest), 4-else if(lowPrice && lowGuest)
            //5-if(highPrice), 6-else if(lowPrice), 7-else if(highGuest), 8-else if(lowGuest) 9- Do
            const farLocationHalls = Halls.sort((a, b) => {
                return (b.data.Location.latitude - a.data.Location.latitude)+(b.data.Location.longitude - a.data.Location.longitude);
            });
            SortHalls.bind(this, farLocationHalls);
        }
        else if(state.nearLocation) {
            //1-if(highPrice && highGuest), 2-else if(highPrice && lowGuest), 3-else if(lowPrice && highGuest), 4-else if(lowPrice && lowGuest)
            //5-if(highPrice), 6-else if(lowPrice), 7-else if(highGuest), 8-else if(lowGuest) 9- Do
            const nearLocationHalls = Halls.sort((a, b) => {
                return (a.data.Location.latitude - b.data.Location.latitude)+(a.data.Location.longitude - b.data.Location.longitude);
            });
            SortHalls.bind(this, nearLocationHalls);
        }
    }, [state]);

    function onPress(){
        setState(initialState);
        close();
    }

    return(
        <Modal visible={visible} animationType="slide">
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


                    <Text style={styles.checkTitle}>Loction:</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={state.farLocation}
                            onValueChange={value =>
                                setState({
                                    ...state,
                                    farLocation: value,
                                    nearLocation: !value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>Far</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={state.nearLocation}
                            onValueChange={value =>
                                setState({
                                    ...state,
                                    nearLocation: value,
                                    farLocation: !value,
                                })
                            }
                        />
                        <Text style={styles.checkboxName}>Near</Text>
                    </View>
                </View>
                <Button
                    onPress={onPress}
                    title="Save"
                />
            </View>
        </Modal>
    );
}
export default Sort;

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
});
