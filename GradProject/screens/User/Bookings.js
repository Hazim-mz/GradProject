import { View, Text, Button, StyleSheet } from "react-native";
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from "../../store/auth-context";


function Bookings({navigation}){
    const userAccountCtx = useContext(AuthContext);

    function onPress(){
        navigation.navigate("LoginOverview");
    }
    //console.log(userAccountCtx);
    if(! userAccountCtx.isAuthenticated){
        return(
            <View style={styles.container}>
                <Text>Login First To See Your Booked Halls</Text>
                <Button title="Login" onPress={onPress}/>
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <Text>Welcome {userAccountCtx.email}</Text>
                <Button title="Login" onPress={onPress}/>
            </View>
        );
    }
}

export default Bookings;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
});
  
