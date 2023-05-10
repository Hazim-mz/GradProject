import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../config';
import { collection, where, query, onSnapshot, getDocs } from 'firebase/firestore';

import MessageList from '../../components/InboxCom/MessageList';
import GoToLoginPage from "../../components/Common/GoToLoginPage";
import { GlobalStyles } from '../../constants/styles';
import { AuthContext } from "../../store/auth-context";
import GoToBillPage from "../../components/Common/GoToBillPage";

function ServiceProviderPage({ navigation, route }) {
    const userAccountCtx = useContext(AuthContext);

    const [goToLoginPageIsVisible, setGoToLoginPageIsVisible] = useState(false);
    function openLoginPage() {
        setGoToLoginPageIsVisible(true);
    }
    function closeLoginPage() {
        setGoToLoginPageIsVisible(false);
    }

    const displayedService = {
        id: route.params.id,
        name: route.params.name,
        serviceProviderEmail: route.params.serviceProviderEmail,
        serviceProviderID: route.params.serviceProviderID,
        price: route.params.price,
        imageUrl: route.params.imageUrl,
        serviceNumber: route.params.ServiceNumber
    };

    const bookService = async () => {
        if (!userAccountCtx.isAuthenticated) {
            openLoginPage();
        }
        else {
            if (displayedService.serviceNumber == 1) {
                if (Object.keys(userAccountCtx.hall).length != 0) {
                    if(Object.keys(userAccountCtx.services.service1).length != 0){
                        userAccountCtx.hall.price = Number(userAccountCtx.hall.price) - Number(userAccountCtx.services.service1.price);
                    }
                    userAccountCtx.services.service1 = displayedService;
                    userAccountCtx.hall.price = Number(userAccountCtx.hall.price) + Number(displayedService.price);
                }
                userAccountCtx.addHall(userAccountCtx);
            }
            else if (displayedService.serviceNumber == 2) {
                if (Object.keys(userAccountCtx.hall).length != 0) {
                    if(Object.keys(userAccountCtx.services.service2).length != 0){
                        userAccountCtx.hall.price = Number(userAccountCtx.hall.price) - Number(userAccountCtx.services.service2.price);
                    }
                    userAccountCtx.services.service2 = displayedService;
                    userAccountCtx.hall.price = Number(userAccountCtx.hall.price) + Number(displayedService.price);
                }
                userAccountCtx.addHall(userAccountCtx);
            }
            else if (displayedService.serviceNumber == 3) {
                if (Object.keys(userAccountCtx.hall).length != 0) {
                    if(Object.keys(userAccountCtx.services.service3).length != 0){
                        userAccountCtx.hall.price = Number(userAccountCtx.hall.price) - Number(userAccountCtx.services.service3.price);
                    }
                    userAccountCtx.services.service3 = displayedService;
                    userAccountCtx.hall.price = Number(userAccountCtx.hall.price) + Number(displayedService.price);
                }
                userAccountCtx.addHall(userAccountCtx);
            }
            else if (displayedService.serviceNumber == 4) {
                if (Object.keys(userAccountCtx.hall).length != 0) {
                    if(Object.keys(userAccountCtx.services.service4).length != 0){
                        userAccountCtx.hall.price = Number(userAccountCtx.hall.price) - Number(userAccountCtx.services.service4.price);
                    }
                    userAccountCtx.hall.price = Number(userAccountCtx.hall.price) + Number(displayedService.price);
                }
                userAccountCtx.services.service4 = displayedService;
                userAccountCtx.addHall(userAccountCtx);
            }
        }
    }
    return (
        <View style={styles.container}>
            <GoToLoginPage isVisible={goToLoginPageIsVisible} close={closeLoginPage} />

            <Text style={styles.bookText}>{displayedService.id}</Text>
            <Text style={styles.bookText}>{displayedService.name}</Text>
            <Text style={styles.bookText}>{displayedService.serviceProviderEmail}</Text>
            <Text style={styles.bookText}>{displayedService.serviceProviderID}</Text>
            <Text style={styles.bookText}>{displayedService.price}</Text>

            <Pressable
                style={({ pressed }) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                onPress={bookService}
            >
                <View style={styles.bookContainer}>
                    <Text style={styles.bookText}>book</Text>
                </View>
            </Pressable>
            {
                userAccountCtx.isAuthenticated ?
                    Object.keys(userAccountCtx.hall).length !== 0 ?
                        <GoToBillPage hall={userAccountCtx.hall} />
                    :
                        <></>
                :
                    <></>
            }
        </View>

    );
}

export default ServiceProviderPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookContainer: {
        backgroundColor: 'white',
        marginTop: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 120
    },
    bookText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button: {
        flex: 1
    },
    buttonPress: {
        opacity: 0.7,
    },
});