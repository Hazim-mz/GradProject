import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";

import Button from "../../components/UI/Button";
import { FontAwesome5 } from '@expo/vector-icons';

import Services from "../../components/Common/Services";
import HallImage from "../../components/Common/HallImage";
import OwnerMainInformation from "../../components/OwnerHallCom/OwnerMainInformation";
import DescriptionInformation from "../../components/HallCom/DescriptionInformation";
import ServiecesInformation from "../../components/HallCom/ServiecesInformation";
import RoomInformation from "../../components/HallCom/RoomInformation";
import LodingOverlay from "../../components/UI/LodingOverlay";

import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

import { db } from '../../config';
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';
import EditSpecialPrice from "../../components/OwnerHallCom/EditSpecialPrice";
import OwnerHallComment from "../../components/OwnerHallCom/OwnerHallComment";


function OwnerHallPage({ route, navigation }) {
    const userAccountCtx = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);//for loding if book hall

    //معلومات القاعة
    const displayedHall = {
        id: route.params.hallId,
        name: route.params.hallName,
        description: route.params.hallDescription,
        price: route.params.hallPrice,
        guests: route.params.hallGuests,
        imageUrl: route.params.hallImageUrl,
        services: route.params.hallServices,
        menCoun: route.params.hallMenCoun,
        menBath: route.params.hallMenBath,
        womanCoun: route.params.hallWomanCoun,
        womanBath: route.params.hallWomanBath,
        manDin: route.params.hallManDin,
        womanDin: route.params.hallWomanDin,
        locationOfHall: route.params.locationOfHall,
        locationOfUser: route.params.locationOfUser,
        report: route.params.hallReport,
        rate: route.params.hallRate,
    };

    //go to edit page
    function selectEditHallHandler() {
        navigation.navigate('Edit', {
            hallId: displayedHall.id,
            hallName: displayedHall.name,
            hallDescription: displayedHall.description,
            hallPrice: displayedHall.price,
            hallGuests: displayedHall.guests,
            hallImageUrl: displayedHall.imageUrl,
            hallServices: displayedHall.services,
            hallMenCoun: displayedHall.menCoun,
            hallWomanCoun: displayedHall.womanCoun,
            hallManDin: displayedHall.manDin,
            hallWomanDin: displayedHall.womanDin,
            hallMenBath: displayedHall.menBath,
            hallWomanBath: displayedHall.womanBath,
            locationOfHall: displayedHall.locationOfHall,
            locationOfUser: displayedHall.locationOfUser,
            hallReport: displayedHall.report,
            hallRate: displayedHall.rate,
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable
                        style={({ pressed }) => pressed ? styles.pressable1 : null}
                        onPress={selectEditHallHandler}
                    >
                        <FontAwesome5 name="wrench" size={24} color="black" />
                    </Pressable>
                );

            }
        });
    }, [navigation]);



    const [bookedDates, setBookedDates] = useState([]);//the booked date of hall
    const [reviews, setReviews] = useState([]);//the reviews of the hall
    const [replays, setReplays] = useState([]);//the replay of the owner
    const [specialPrices, setSpecialPrices] = useState([]);//the date with special prices
    useEffect(() => {

        //get the booked date
        const q = query(collection(db, "Reservation"), where("HallsID", "==", displayedHall.id));
        onSnapshot(q, (Reservations) => {
            setBookedDates(Reservations.docs.map((Reservation) => ({
                id: Reservation.id,
                data: Reservation.data()
            }))
            )
        });

        //get the reviews 
        const qq = query(collection(db, "Review"), where("HallsID", "==", displayedHall.id));
        onSnapshot(qq, (Comments) =>
            setReviews(Comments.docs.map((Comment) => ({
                id: Comment.id,
                data: Comment.data()
            }))
            )
        );

        //get the reviews 
        const qqq = query(collection(db, "SpecialPrice"), where("HallsID", "==", displayedHall.id));
        onSnapshot(qqq, (SpecialPrices) =>
            setSpecialPrices(SpecialPrices.docs.map((SpecialPrice) => ({
                id: SpecialPrice.id,
                data: SpecialPrice.data()
            }))
            )
        );

        //get the replay 
        const qqqq = query(collection(db, "ReplayToReview"), where("HallsID", "==", displayedHall.id));
        onSnapshot(qqqq, (SpecialPrices) =>
            setReplays(SpecialPrices.docs.map((SpecialPrice) => ({
                id: SpecialPrice.id,
                data: SpecialPrice.data()
            }))
            )
        );

    }, []);


    //get location of the hall
    function pressLoctionHandler() {
        const tempIos = "googleMaps://app?saddr=" + displayedHall.locationOfUser.latitude + ", " + displayedHall.locationOfUser.longitude + "&daddr=" + displayedHall.locationOfHall.latitude + ", " + displayedHall.locationOfHall.longitude;
        const tempAndroid = "google.navigation:q=" + displayedHall.locationOfHall.latitude + ", " + displayedHall.locationOfHall.longitude;
        Linking.openURL(
            Platform.OS === 'ios'
                ? tempIos
                : tempAndroid,
        );
    }
    //console.log(displayedHall.locationOfHall);

    //change special price
    const [editSpecialPriceIsVisible, setEditSpecialPriceIsVisible] = useState(false);
    function openEditSpecialPrice() {
        setEditSpecialPriceIsVisible(true);
    }
    function closeEditSpecialPrice() {
        setEditSpecialPriceIsVisible(false);
    }

    if (isSubmitting) {
        return <LodingOverlay text={"The price now updating, wait a second"} />;
    }
    return (
        <View style={styles.container}>

            <EditSpecialPrice
                Reservation={bookedDates}
                SpecialPrices={specialPrices}
                hallID={displayedHall.id}
                visible={editSpecialPriceIsVisible}
                close={closeEditSpecialPrice}
                setIsSubmitting={setIsSubmitting}
            />

            <ScrollView
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <HallImage
                        data={displayedHall.imageUrl}
                        style={styles.imageContainer}
                        press={false}
                    />

                </View>


                <View style={styles.InfoContainer}>

                    {/* المعلومات الاساسية */}
                    <OwnerMainInformation
                        data={displayedHall}
                        onPressLocation={pressLoctionHandler}
                        openEditSpecialPrice={openEditSpecialPrice}
                    />

                    <View style={styles.line}></View>

                    {/* المعلومات عن الغرف */}
                    <RoomInformation 
                        menCoun={displayedHall.menCoun} 
                        menBath={displayedHall.menBath} 
                        womanCoun={displayedHall.womanCoun} 
                        womanBath={displayedHall.womanBath} 
                        menDin={displayedHall.manDin}
                        womanDin={displayedHall.womanDin}
                    />

                    <View style={styles.line}></View>

                    <View style={styles.descServContainer}>

                        {/* تعريف القاعة  */}
                        <DescriptionInformation description={displayedHall.description} />

                        <View style={styles.line}></View>

                        {/* الخدمات */}
                        <ServiecesInformation services={displayedHall.services} />

                    </View>

                    <View style={styles.line2}></View>

                    <OwnerHallComment reviews={reviews} replays={replays} hallsID={displayedHall.id} account={userAccountCtx} />

                </View>
            </ScrollView>
        </View>
    );
}

export default OwnerHallPage;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pressable1: {
        opacity: 0.7
    },
    imageContainer: {
        flex: 1,
        width: 375,
        height: 282,
        overflow: 'hidden',

    },
    reportContainer: {
        position: 'absolute',
        minHeight: 55,
        minWidth: 60,
        backgroundColor: 'black',
        opacity: 0.7,
        marginRight: 26,
        paddingLeft: 2,
        paddingTop: 4,
        alignItems: 'center',
        right: 2,
        top: 0,
        borderWidth: 1,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
    },
    reportTextContainer: {
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    reportText: {
        color: 'white',
        marginBottom: 2,
    },
    InfoContainer: {
        flex: 1,
    },
    mainInfoContainer: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderRadius: 3,
        backgroundColor: 'white',
        flexDirection: 'column',

    },
    line: {
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        margintop: 4,
        marginBottom: 6,
    },
    line2: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginRight: 60,
        marginLeft: 4,
    },
    boldName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    normalName: {
        fontSize: 12,
        textAlign: 'center',
    },
    contactContainer: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 3,
    },
    contactInformationTitle: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        borderBottomRightRadius: 0,
        paddingTop: 8,
        paddingLeft: 6,
    },
    descServContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        marginHorizontal: 4,
        paddingTop: 8,
        paddingLeft: 6,
    },
    commentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        marginHorizontal: 4,
        paddingTop: 8,
        paddingLeft: 6,
        minHeight: 180,
    },
    textIput1: {
        color: GlobalStyles.colors.primary700,
        borderWidth: 2,
        borderColor: '#dfa4f5',
        marginTop: 4,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        minHeight: 100,
        maxHeight: 150,
        textAlignVertical: 'top',
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingContainer2: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
    },
});