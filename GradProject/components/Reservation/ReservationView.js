import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { GlobalStyles } from "../../constants/styles";



function ReservationView({ id, date, hallsID, userID, price, users, ownerID }) {

    var user = users.filter(item => item.id === userID);
    //console.log(user);
    let selfbook = false ;
    if(user[0].id == ownerID){
        selfbook = true;
    }
    return (
        <View>
            {
                user.length != 0 ?
                    selfbook ?
                        <View style={styles.cardi}>
                            <Text style={styles.textspace}>Self Book</Text>
                        </View>
                    :
                        <View style={styles.cardi}>
                            <View>
                                <View style={styles.dirc}>
                                    <Ionicons name="person" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{user[0].data.Name}</Text>
                                </View>
                                <View style={styles.dirc}>
                                    <Ionicons name="calendar" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{date}</Text>
                                </View>
                                <View style={styles.dirc}>
                                    <FontAwesome5 name="money-bill-wave" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{price}</Text>
                                </View>
                            </View>
                            <View style={styles.conatct}>
                                <Button
                                    title="Contact Customer"
                                    color="#841584"
                                    accessibilityLabel="Learn more about this purple button" />
                            </View>
                            <View style={styles.dirc}></View>
                        </View>
                :
                    <View></View>
            }
        </View>
    );
}

export default ReservationView;

const styles = StyleSheet.create({
    cardi: {
        flexDirection: "row",
        margin: "2%",
        borderWidth: 1,
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        paddingLeft: 3,
    },

    dirc: {
        flexDirection: "row",
        margin: 3,

    },
    textspace: {
        color: "black",
        fontSize: 16,
        //fontWeight: "bold",
        margin: 5,
    },

    button: {
        margin: 10,
        height: 55,
        width: "95%",
        backgroundColor: GlobalStyles.colors.primary800,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.7,
    },
    conatct: {
        marginLeft: 40,
        marginTop: 90,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});