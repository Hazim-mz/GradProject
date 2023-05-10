import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";

import HallImage from "../../components/Common/HallImage";
import Services from "../../components/Common/Services";
import EditInfo from "../../components/OwnerHallCom/EditInfo";
import EditRoomInfo from "../../components/OwnerHallCom/EditRoomInfo";
import EditDescriptionInformation from "../../components/OwnerHallCom/EditDescriptionInformation";
import LodingOverlay from "../../components/UI/LodingOverlay";

import { AuthContext } from "../../store/auth-context";
import { GlobalStyles } from "../../constants/styles";
import { FontAwesome5 } from '@expo/vector-icons';

import { db,storage } from '../../config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, where, query, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';
import EditImage from "../../components/OwnerHallCom/EditImage";
import EditLoction from "../../components/OwnerHallCom/EditLoction";




function OwnerEditHall({ route, navigation }) {
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

    const [enteredName, setEnteredName] = useState('');
    const [enteredPrice, setEntredPrice] = useState('');
    const [enteredGuests, setEnteredGuests] = useState('');
    const [services, setServices] = useState(displayedHall.services);
    const [enteredDescription, setEnteredDescription] = useState('');
    const [newEnteredImage, setNewEnteredImage] = useState([]);
    const [undeletedImage, setUndeletedImage] = useState(displayedHall.imageUrl);
    const [newlocationOfHall, setNewLocationOfHall] = useState(displayedHall.locationOfHall);

    const [enteredMenCouncil, setMenCouncil] = useState('');
    const [enteredWomanCouncil, setWomanCouncil] = useState('');
    const [enteredMenDining, setMenDining] = useState('');
    const [enteredWomanenDining, setWomanenDining] = useState('');
    const [enteredMenBathroom, setMenBathroom] = useState('');
    const [enteredWomanBathroom, setWomanBathroom] = useState('');

    const uploadImage = async() => {
        for(var i=0; i<newEnteredImage.length; i++){
            try {
                const response = await fetch(newEnteredImage[i].uri);
                const blobFile = await response.blob();
                const reference = ref(storage, 'HallImage/' + Date.now())
                await uploadBytesResumable(reference, blobFile)
                var file = await getDownloadURL(reference);
                displayedHall.imageUrl.push(file);
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function editInformation() {
        setIsSubmitting(true);
        let nochange = true
        if(undeletedImage.length != displayedHall.imageUrl.length && undeletedImage.length != 0){
            displayedHall.imageUrl = undeletedImage;
            nochange = false;
        }
        if(newEnteredImage.length != 0) {
            await uploadImage();
            nochange = false;
        }
        if (enteredName != displayedHall.name && enteredName != '') {
            displayedHall.name = enteredName;
            nochange = false;
        }
        if (enteredPrice != displayedHall.price && enteredPrice != '') {
            displayedHall.price = enteredPrice;
            nochange = false;
        }
        if (enteredGuests != displayedHall.guests && enteredGuests != '') {
            displayedHall.guests = enteredGuests;
            nochange = false;
        }
            {/*room information*/}
        if (enteredMenCouncil != displayedHall.menCoun && enteredMenCouncil != '') {
            displayedHall.menCoun = enteredMenCouncil;
            nochange = false;
        }    
        if (enteredWomanCouncil != displayedHall.womanCoun && enteredWomanCouncil != '') {
            displayedHall.womanCoun = enteredWomanCouncil;
            nochange = false;
        }
        if (enteredMenDining != displayedHall.manDin && enteredMenDining != '') {
            displayedHall.manDin = enteredMenDining;
            nochange = false;
        }    
        if (enteredWomanenDining != displayedHall.womanDin && enteredWomanenDining != '') {
            displayedHall.womanDin = enteredWomanenDining;
            nochange = false;
        }
        if (enteredMenBathroom != displayedHall.menBath && enteredMenBathroom != '') {
            displayedHall.menBath = enteredMenBathroom;
            nochange = false;
        }    
        if (enteredWomanBathroom != displayedHall.womanBath && enteredWomanBathroom != '') {
            displayedHall.womanBath = enteredWomanBathroom;
            nochange = false;
        }
            {/*room information*/}
        if (services != displayedHall.services) {
            displayedHall.services = services;
            nochange = false;
        }
        if (enteredDescription != displayedHall.description && enteredDescription != '') {
            displayedHall.description = enteredDescription;
            nochange = false;
        }
        if (newlocationOfHall.latitude != displayedHall.locationOfHall.latitude || newlocationOfHall.longitude != displayedHall.locationOfHall.longitude) {
            displayedHall.locationOfHall = newlocationOfHall;
            nochange = false;
        }
        if (nochange) {
            setIsSubmitting(false);
            alert('Error with entered information');
        } else {
            const docRef = doc(db, "Halls", displayedHall.id);

            await updateDoc(docRef, {
                Name: displayedHall.name,
                Price: displayedHall.price,
                Guests: displayedHall.guests,
                imageUrl: displayedHall.imageUrl,
                Services: displayedHall.services,
                MenBathroom: displayedHall.menBath,
                MenCouncil: displayedHall.menCoun,
                MenDining: displayedHall.manDin,
                WomanBathroom: displayedHall.womanBath,
                WomanCouncil: displayedHall.womanCoun,
                WomanDining: displayedHall.womanDin,
                Description: displayedHall.description,
                Location: displayedHall.locationOfHall,
            });
            setIsSubmitting(false);
            navigation.navigate('Home');
            alert('Hall Update successfully');
        }

    };

    //change images
    const [editImagesIsVisible, setEditImagesIsVisible] = useState(false);
    function openEditImages(){
        setEditImagesIsVisible(true);
    }
    function closeEditImages(){
        setEditImagesIsVisible(false);
        setNewEnteredImage([]);
        setUndeletedImage(displayedHall.imageUrl);
    }
    function SaveImage(imagesLocation, undeletedImage){
        closeEditImages();

        if(undeletedImage.length != displayedHall.imageUrl.length){
            setUndeletedImage(undeletedImage);
        }

        if(imagesLocation.length == 0){
            setNewEnteredImage([]);
        }else{
            let tempNewEnteredImage = [] ;
            for(var i=0; i < imagesLocation.length; i++){
                tempNewEnteredImage.push(imagesLocation[i]);
            }
            setNewEnteredImage(tempNewEnteredImage);
        }

    }
    //console.log(undeletedImage, newEnteredImage);

    if (isSubmitting) {
        return <LodingOverlay text={"The hall is now update, wait a second"} />;
    }

    return (
        <View style={styles.container}>

            <EditImage 
                Images={displayedHall.imageUrl} 
                saveImage={SaveImage} 
                visible={editImagesIsVisible} 
                close={closeEditImages}
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

                <Pressable
                    style={({ pressed }) => pressed ? [styles.reportContainer, styles.pressable1] : styles.reportContainer}
                    onPress={openEditImages}
                >
                    <FontAwesome5 name="wrench" size={24} color="white" />
                </Pressable>

                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                        <View style={styles.InfoContainer}>

                            {/* المعلومات الاساسية */}
                            <EditInfo
                                data={displayedHall}
                                setName={setEnteredName}
                                setPrice={setEntredPrice}
                                setGuests={setEnteredGuests}
                            />

                            <View style={styles.line}></View>

                            {/* المعلومات عن الغرف */}
                            <EditRoomInfo
                                setMenCoun={setMenCouncil}
                                setWomenCoun={setWomanCouncil}
                                setMenDining={setMenDining}
                                setWomanDining={setWomanenDining}
                                setMenBath={setMenBathroom}
                                setWomanBath={setWomanBathroom}
                            />

                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>

                                {/* تعريف القاعة  */}
                                <EditDescriptionInformation
                                    description={displayedHall.description}
                                    setDescription={setEnteredDescription}
                                />

                                {/* الخدمات */}
                                <Services
                                    setServices={setServices} services={services}
                                />


                            </View>

                            <View style={styles.line}></View>

                            <View style={styles.descServContainer}>
                                <EditLoction locationOfHall={newlocationOfHall} setLocationOfHall={setNewLocationOfHall}/>
                            </View>

                            <View style={styles.line}></View>

                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                                    onPress={editInformation}
                                >
                                    <View>
                                        <Text style={styles.buttonText}>UPDATE</Text>
                                    </View>

                                </Pressable>
                            </View>


                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScrollView>


        </View>
    );
    
}

export default OwnerEditHall;

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
        minHeight: 40,
        minWidth: 40,
        paddingLeft: 2,
        paddingTop: 4,
        alignItems: 'center',
        right: 2,
        top: 0,
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
    buttonContainer: {
        justifyContent: "center",
        flexDirection: "row"
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
    descServContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        marginHorizontal: 4,
        paddingTop: 8,
        paddingLeft: 6,
    },
    button: {
        height: 55,
        width: '70%',
        backgroundColor: GlobalStyles.colors.primary400,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
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
