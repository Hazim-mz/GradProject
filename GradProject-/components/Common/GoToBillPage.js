import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

function GoToBillPage({ hall }) {
    const navigation = useNavigation(); //لانه مب صفحة

    function onPressHallHandler() {
        navigation.navigate('BillPage', {
        });
    }

    if (Object.keys(hall).length !== 0) {
        return (
            <Pressable
                style={({ pressed }) => pressed ? [styles.hallBookedContainer, styles.press] : styles.hallBookedContainer}
                onPress={onPressHallHandler}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: hall.imageUrl[0] }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.hallInformationContainer}>

                        <View style={styles.hallNameContainer}>
                            <Text style={styles.hallName}>
                                {hall.name}
                            </Text>
                        </View>

                        <View style={styles.hallPriceContainer}>
                            <Text style={styles.hallPrice}>
                                {hall.price}
                            </Text>
                        </View>

                    </View>

                </View>
                
                <View style={styles.rowContainer}>
                        <Entypo name="chevron-thin-right" size={25} color="black" />
                </View>
                
            </Pressable>
        );
    }

}

export default GoToBillPage;

const styles = StyleSheet.create({
    hallBookedContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(203, 39, 239, 0.7)',
        height: 55
    },
    press: {
        opacity: 0.5
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        height: 40,
        width: 40,
        borderRadius: 8,
        marginLeft: 2,
    },
    image: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 8,
    },
    hallInformationContainer: {
        height: 40,
        width: 40,
        borderRadius: 8,
    },
    hallNameContainer: {
        flex: 1,
        marginTop: 2,
        marginLeft: 2,
        width: 100,
    },
    hallName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    hallPriceContainer: {
        flex: 1,
        marginLeft: 6,
        width: 100,
    },
    hallPrice: {
        fontSize: 12,
    },
    rowContainer: {
        justifyContent: 'center'
    },
});