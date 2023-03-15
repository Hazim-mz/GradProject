import { View, Text, TextInput, ScrollView, Button, Image, Modal, Pressable, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { AuthContext } from '../../store/auth-context';
import { auth, db, storage } from '../../config';
import { addDoc, collection } from 'firebase/firestore';

import { Colors, GlobalStyles } from '../../constants/styles';
import LodingOverlay from '../../components/UI/LodingOverlay';
import Services from '../../components/common/Services';
import EditRoomInfo from '../../components/OwnerHallCom/EditRoomInfo';

const initialServices = [
    { name: 'Coffee', isAvailable: false },
    { name: 'Incense', isAvailable: false },
    { name: 'Catering', isAvailable: false },
    { name: 'Valet Parking', isAvailable: false },
    { name: 'Janitors', isAvailable: false },
    { name: 'Hospitality', isAvailable: false },
    { name: 'Deserts', isAvailable: false }
];
async function uploadImageAsync(uri) {
    try {
        const response = await fetch(uri);
        const blobFile = await response.blob();
        const reference = ref(getStorage(), "random-image-name.jpg")
        await uploadBytesResumable(reference, blobFile)
        return await getDownloadURL(reference);
     }catch (e) {
        console.log(e)
   }}
function MyHall({ LocationOfUser, setIsSubmitting, visible, colse }) {
    const userAccountCtx = useContext(AuthContext);
    //Services
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [guests, setGuests] = useState('');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState(initialServices);
    const [locationOfHall, setLocationOfHall] = useState(LocationOfUser);
    const [menCouncil, setMenCouncil] = useState('');
    const [womanCouncil, setWomanCouncil] = useState('');
    const [menDining, setMenDining] = useState('');
    const [womanDining, setWomanDining] = useState('');
    const [menBathroom, setMenBathroom] = useState('');
    const [womanBathroom, setWomanBathroom] = useState('');

    //get Location og the user
    const [locationOfUser, setLocationOfUser] = useState(LocationOfUser);
    var tempLatitude;
    var tempLongitude;

    //images
    const [images, setImages] = useState([]);
    const [imagesLocation, setImagesLocation] = useState([]);

    //select images
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1
        });

        //console.log(result.selected[0].uri);

        if (!result.cancelled) {
            setImages(result.selected);
        }
    };

    //upload images
    const upload = async () => {
        const uploadImage = async () => {
            setIsSubmitting(true);
            for(var i=0; i<images.length; i++){
                try {
                    const response = await fetch(images[i].uri);
                    const blobFile = await response.blob();
                    const reference = ref(storage, 'HallImage/' + Date.now())
                    await uploadBytesResumable(reference, blobFile)
                    var file = await getDownloadURL(reference);
                    imagesLocation.push(file);
                } catch (e) {
                    console.log(e)
                }
            }

        }
        const uploadHall = async () => {

            await uploadImage();
            if (images.length == imagesLocation.length) {
                const HallID = await addDoc(collection(db, "Halls"), {
                    OwnerEmail: userAccountCtx.email,
                    OwnerID: userAccountCtx.userID,
                    Name: name,
                    Price: price,
                    WeekendPrice: '',
                    Guests: guests,
                    imageUrl: imagesLocation,
                    Description: description,
                    Services: services,
                    Location: locationOfHall,
                    Report: 0,
                    Rate: 0,
                    MenCouncil: menCouncil,
                    WomanCouncil: womanCouncil,
                    MenDining: menDining,
                    WomanDining: womanDining,
                    MenBathroom: menBathroom,
                    WomanBathroom: womanBathroom,
                    isBlocked: false,
                }).
                    then(() => {
                        setName('');
                        setPrice('');
                        setGuests('');
                        setImagesLocation([]);
                        setImages([]);
                        setDescription('');
                        setServices(initialServices);
                        setMenCouncil('');
                        setWomanCouncil('');
                        setMenDining('');
                        setWomanDining('');
                        setMenBathroom('');
                        setWomanBathroom('');
                        setLocationOfHall({ latitude: locationOfUser.latitude, longitude: locationOfUser.longitude });
                        setIsSubmitting(false);
                        alert("Hall Add successsfilly");
                    })
                colse();
            } else {
                alert("Error occurred while upload the Hall");
                setIsSubmitting(false);

            }
        }
        if (name != '' && price != '' && guests != '' && description != '' && menCouncil != '' && womanCouncil != '' &&
            menDining != '' && womanDining != '' && menBathroom != '' && womanBathroom != '' && images.length != 0) {
            uploadHall();
        } else {
            alert("Please Fill In All Information");
        }
    }

    return (
        <Modal visible={visible} animationType="fade">
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.backButtonContainer}>
                        <Pressable
                            style={({ pressed }) => (pressed ? [styles.backButton, styles.press] : styles.backButton)}
                            onPress={colse}
                        >
                            <MaterialCommunityIcons name="close" size={30} color="black" />
                        </Pressable>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Name of Hall : </Text>
                        <TextInput
                            style={styles.textInput1}
                            placeholder="Hall Name"
                            placeholderTextColor='#a3a2a2'
                            onChangeText={newName => setName(newName)}
                            defaultValue={name}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Price of Hall :
                            <Text style={{ fontSize: 9 }}> (*after that you can change price for some days)</Text>
                        </Text>
                        <TextInput
                            style={styles.textInput1}
                            placeholder="Hall Price"
                            placeholderTextColor='#a3a2a2'
                            onChangeText={newPrice => setPrice(newPrice)}
                            defaultValue={price}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Number of guests : </Text>
                        <TextInput
                            style={styles.textInput1}
                            placeholder="# Guests Number"
                            placeholderTextColor='#a3a2a2'
                            onChangeText={newGuest => setGuests(newGuest)}
                            defaultValue={guests}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={{ flex: 1, marginTop: 5 }}>
                        <Text style={styles.label}>Uplode image : </Text>
                        <Button title="Choose Pictures" onPress={pickImage} />
                        <View style={styles.imageInfoContainer}>
                            {
                                images[0] == null ?
                                    <Text style={styles.imageText}>No image is selected</Text>
                                    :
                                    <View style={styles.imageInfoContainer}>
                                        <ScrollView
                                            style={styles.imageInfoContainer2}
                                            scrollEventThrottle={16}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            {
                                                images.map((images, index) => (
                                                    <View style={styles.imageContainer} key={index}>
                                                        <Image
                                                            key={index}
                                                            source={{ uri: images.uri }}
                                                            style={styles.image1}
                                                        />
                                                    </View>
                                                ))
                                            }

                                        </ScrollView>
                                    </View>
                            }
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Description of hall: </Text>
                        <TextInput
                            style={styles.textInput1}
                            placeholder="Description"
                            placeholderTextColor='#a3a2a2'
                            onChangeText={newDescription => setDescription(newDescription)}
                            defaultValue={description}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Location of hall: </Text>
                        <View style={styles.mapContainer}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                initialRegion={{
                                    longitude: locationOfUser.longitude,
                                    latitude: locationOfUser.latitude,
                                    longitudeDelta: 0.2,
                                    latitudeDelta: 0.2,
                                }}
                                onPress={(e) => {
                                    tempLongitude = e.nativeEvent.coordinate.longitude;
                                    tempLatitude = e.nativeEvent.coordinate.latitude;
                                    setLocationOfHall({ longitude: tempLongitude, latitude: tempLatitude });
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: locationOfHall.latitude, longitude: locationOfHall.longitude }}
                                //draggable={true}
                                >
                                </Marker>
                            </MapView>
                        </View>
                    </View>

                    <View style={styles.line}></View>
                    <Services
                        setServices={setServices} services={services} />
                    <View style={styles.line}></View>
                    <EditRoomInfo
                        setMenCoun={setMenCouncil}
                        setWomenCoun={setWomanCouncil}
                        setMenBath={setMenBathroom}
                        setWomanBath={setWomanBathroom}
                        setMenDining={setMenDining}
                        setWomanDining={setWomanDining}
                        MCplaceHolder="1"
                        WCplaceHolder="1"
                        MBplaceHolder="1"
                        WBplaceHolder="1"
                    />
                    <View style={styles.line}></View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                            onPress={upload}
                        >
                            <View>
                                <Text style={styles.buttonText}>Add Hall</Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

export default MyHall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    backButtonContainer: {
        height: 50,
        marginTop: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },
    backButtonText: {
        fontSize: 16,
        color: 'white'
    },
    press: {
        opacity: 0.8,
    },
    label: {
        marginBottom: 5,
        marginTop: 8
    },
    textInput1: {
        height: 45,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginRight: 5,
        borderRadius: 20,
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 0,
        justifyContent: "center"
    },
    imageInfoContainer: {
        height: 250,
        justifyContent: 'center'
    },
    imageInfoContainer2: {
        height: 250,
    },
    imageText: {
        textAlign: 'center',
        fontSize: 16,
    },
    imageContainer: {
        height: 150,
        width: 150,
        marginHorizontal: 6,
        marginVertical: 45,
    },
    image1: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mapContainer: {
        flex: 1,
        height: 280,
        width: 350,
        marginVertical: 4,
        alignSelf: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    serviecesContainer: {
        flex: 1,
        height: 150,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
    },
    line: {
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal: 30,
        margintop: 4,
        marginBottom: 6,
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        margin: 4,
    },
    checkboxText: {
        textAlign: 'center',
        fontSize: 10,
    },
    button: {
        height: 55,
        width: '70%',
        borderRadius: 10,
        backgroundColor: Colors.blue,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'center'
    }
});

