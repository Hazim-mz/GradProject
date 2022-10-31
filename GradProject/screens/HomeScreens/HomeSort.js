import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import Checkbox from 'expo-checkbox';

const initialState = {
    highPrice: false,
    lowPrice: false,
    highGuest: false,
    lowGuest: false,
};
function HomeSort({navigation, route}){
    const [state, setState] = useState(initialState);

    function onPressHandler(){
        navigation.navigate({
            name: 'Home',
            params: { 
                highPrice: state.highPrice,
                lowPrice: state.lowPrice,
                highGuest: state.highGuest,
                lowGuest: state.lowGuest,
            },
            //merge: true,
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
});