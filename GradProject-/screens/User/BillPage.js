import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from 'react';
import { Octicons, Entypo } from '@expo/vector-icons';

import { AuthContext } from "../../store/auth-context";

import { db } from '../../config';
import { collection, where, query, onSnapshot, getDocs } from 'firebase/firestore';
import { GlobalStyles } from "../../constants/styles";

function BillPage({ navigation, route }) {
    const userAccountCtx = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.bookText}>{userAccountCtx.hall.name}</Text>
            
            <Text style={styles.bookText}>service1: </Text>
            {Object.keys(userAccountCtx.services.service1).length != 0 ? <Text style={styles.bookText}>{userAccountCtx.services.service1.name}</Text> : <></>}
            <Text style={styles.bookText}>service2: </Text>
            {Object.keys(userAccountCtx.services.service2).length != 0 ? <Text style={styles.bookText}>{userAccountCtx.services.service2.name}</Text> : <></>}
            <Text style={styles.bookText}>service3: </Text>
            {Object.keys(userAccountCtx.services.service3).length != 0 ? <Text style={styles.bookText}>{userAccountCtx.services.service3.name}</Text> : <></>}
            <Text style={styles.bookText}>service4: </Text>
            {Object.keys(userAccountCtx.services.service4).length != 0 ? <Text style={styles.bookText}>{userAccountCtx.services.service4.name}</Text> : <></>}

        </View>
    );
}

export default BillPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
});