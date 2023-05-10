import { View, Text, TextInput, Pressable, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import HallList from '../Common/HallList';

import { GlobalStyles } from '../../constants/styles';
import { AuthContext } from "../../store/auth-context";
import BillView from './BillView';

var screenWidth = Dimensions.get('window').width - 16;

function CategorysLists({ tags, setTags, tagActive, tagActiveByClick, setTagActive, settagActiveByClick, bookedHalls, canceledHalls, LocationOfUser, deleateReservations }) {
    const userAccountCtx = useContext(AuthContext);
    const navigation = useNavigation(); //لانه مب صفحة
    function onPressHandler() {
        navigation.navigate('Home');
    }

    function onScrollHandler({ nativeEvent }) {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== tagActive && tagActiveByClick == tagActive) {
            if (slide == 0) {
                setTags({
                    New: true,
                    History: false,
                    Canceled: false,
                });
            }
            else if (slide == 1) {
                setTags({
                    New: false,
                    History: true,
                    Canceled: false,
                });
            }
            else if (slide == 2) {
                setTags({
                    New: false,
                    History: false,
                    Canceled: true,
                });
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        } else if (slide !== tagActive && slide == tagActiveByClick) {
            if (slide == 0) {
                setTags({
                    New: true,
                    History: false,
                    Canceled: false,
                });
            }
            else if (slide == 1) {
                setTags({
                    New: false,
                    History: true,
                    Canceled: false,
                });
            }
            else if (slide == 2) {
                setTags({
                    New: false,
                    History: false,
                    Canceled: true,
                });
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                ref={re => scroll = re}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollHandler}
            >
                <View>
                    {
                        Object.keys(userAccountCtx.hall).length !== 0?
                            <View style={{width: screenWidth+16}}>
                                <BillView />
                            </View>
                        :
                            <View style={{ flex: 1 }}>

                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>Book Hall Now</Text>
                                </View>

                                <Pressable
                                    style={({ pressed }) => (pressed ? styles.buttonPress : null)}
                                    onPress={onPressHandler}
                                >
                                    <View style={styles.noBook}>
                                        <FontAwesome name="plus" size={140} color="black" />
                                    </View>
                                </Pressable>    

                            </View>
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <HallList Halls={bookedHalls} LocationOfUser={LocationOfUser} booking={true} deleateReservations={deleateReservations} />
                </View>

                <View style={{ flex: 1 }}>
                    <HallList Halls={canceledHalls} LocationOfUser={LocationOfUser}/>
                </View>
            </ScrollView>
        </View>
    );

}

export default CategorysLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 12
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    noBook:{
        margin: 8,
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'dashed',
        width: screenWidth,
        height: 350,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.05,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPress:{
        opacity: 0.6,
    },
});
