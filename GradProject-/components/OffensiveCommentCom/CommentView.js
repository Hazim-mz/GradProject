import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";

import { Colors, GlobalStyles } from "../../constants/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { EvilIcons, MaterialCommunityIcons, AntDesign, Fontisto } from "@expo/vector-icons";

function CommentView({ id, comment, hallsID, rate, userID, userImage, userName, Halls, Ignore, Delete }) {

    var hall = Halls.filter(item => item.id === hallsID);

    return (
        <View>
            {
                hall != 0 ?
                    <View style={styles.cardi}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.dirc}>
                                <Ionicons name="person-outline" size={24} color={GlobalStyles.colors.primary10} />
                                <Text style={styles.textspace}>{userName}</Text>
                            </View>
                            <View style={styles.dirc}>
                                <Fontisto name="commenting" size={22} color={GlobalStyles.colors.primary10} />
                                <Text style={styles.textspace}>" {comment} "</Text>
                            </View>
                            <View style={styles.dirc}>
                                <MaterialCommunityIcons name="town-hall" size={24} color={GlobalStyles.colors.primary10} />
                                <Text style={styles.textspace}>{hall[0].data.Name}</Text>
                            </View>
                            <View style={styles.buttonspace}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button1,
                                        styles.green,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={Ignore.bind(this, id)}
                                >
                                    <View>
                                        <Text style={styles.buttonText}>Ignore</Text>
                                    </View>
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button1,
                                        styles.red,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={Delete.bind(this, id)}
                                >
                                    <View>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </View>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                    :
                    <View></View>
            }
        </View>
    );
}

export default CommentView;

const styles = StyleSheet.create({
    noOwnercontainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noOwnerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        flex: 1
    },
    cardi: {
        backgroundColor: Colors.light,
        marginRight: 2,
        marginLeft: 15,
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
        paddingRight: 10,
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
    buttonspace: {
        flexDirection: "row",
        justifyContent: 'center',
        // backgroundColor: "black",
    },
    Allspace: {
        flex: 4,
    },
    green: {
        backgroundColor: "green",
    },
    red: {
        backgroundColor: "red",
    },
    button1: {
        marginLeft: 15,
        padding: 2,
        height: 45,
        width: "30%",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
