import { View, Text, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";


import {AuthContext} from '../../store/auth-context';

function AdminAccount(){
    const userAccountCtx = useContext(AuthContext);

    return(
        <View>
            <Pressable
                style={({pressed}) => (pressed ? [styles.logoutButtonPress, styles.logoutButton] : styles.logoutButton)}
                onPress={userAccountCtx.logout}
            >
                <View style={styles.logoutContainer}>
                    <Text style={styles.logoutText}>Logout</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default AdminAccount;

const styles = StyleSheet.create({
    logoutContainer:{
        backgroundColor: '#ba3c30',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        height: 40,
        marginHorizontal: 45,
        marginTop: 30
    },
    logoutText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    logoutButton:{
        flex: 1,
    },
    logoutButtonPress:{
        opacity: 0.7,
    },
});