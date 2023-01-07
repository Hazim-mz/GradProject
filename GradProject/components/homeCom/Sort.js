import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from 'expo-checkbox';

const initialState = {
    highPrice: false,
    lowPrice: false,
    highGuest: false,
    lowGuest: false,
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
            const highGuestHalls = Halls.sort((a, b) => {
                return b.data.Guests - a.data.Guests;
            });
            SortHalls.bind(this, highGuestHalls);
        }
        else if(state.lowGuest) {
            const lowGuestHalls = Halls.sort((a, b) => {
                return a.data.Guests - b.data.Guests;
            });
            SortHalls.bind(this, lowGuestHalls);
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
