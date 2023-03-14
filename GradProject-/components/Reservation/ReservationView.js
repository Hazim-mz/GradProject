import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { Colors, GlobalStyles } from "../../constants/styles";



function ReservationView({ id, date, hallsID, userID, price, users, ownerID, ContactWithUser }) {

    var user = users.filter(item => item.id === userID);
    //console.log(user);
    let selfbook = false;
    if (user.length != 0) {
        if (user[0].id == ownerID) {
            selfbook = true;
        }
    }
    return (
        <View style={styles.container}>
            {
                user.length != 0 ?
                    selfbook ?
                        <View style={styles.cardi}>
                            <View style={{ width: '100%' }}>
                                <View style={styles.dirc}>
                                    <Ionicons name="person-outline" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>Booked by owner</Text>
                                </View>
                                <View style={styles.dirc}>
                                    <FontAwesome name="calendar-check-o" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{date}</Text>
                                </View>
                                <View style={[styles.dirc, {borderBottomWidth: 0}]}>
                                    <FontAwesome name="money" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{price}</Text>
                                </View>
                            </View>
                        </View>

                        :
                        <View style={styles.cardi}>
                            <View style={{ width: '100%' }}>
                                <View style={styles.dirc}>
                                    <Ionicons name="person-outline" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{user[0].data.Name}</Text>
                                </View>
                                <View style={styles.dirc}>
                                    <FontAwesome name="calendar-check-o" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{date}</Text>
                                </View>
                                <View style={styles.dirc}>
                                    <FontAwesome name="money" size={24} color={GlobalStyles.colors.primary10} />
                                    <Text style={styles.textspace}>{price}</Text>
                                </View>
                                <Button
                                    title="Contact Customer"
                                    color="#841584"
                                    accessibilityLabel="Learn more about this purple button" 
                                    onPress={ContactWithUser.bind(this, user)}
                                />
                            </View>
                        </View>
                    :
                    <View></View>
            }
        </View>
    );
}

export default ReservationView;

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardi: {
        backgroundColor: Colors.light,
        marginRight: 2,
        marginTop: 12,
        width: '90%',
        marginHorizintal: 30,
        flexDirection: 'row',
        minHeight: 100,
        padding: 8,
        borderRadius: 20,
        shadowOffset: { width: -3, height: -3 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    dirc: {
        flexDirection: "row",
        margin: 3,
        borderBottomWidth: 1,
        borderColor: '#cccdb2',
        alignItems: 'center'
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