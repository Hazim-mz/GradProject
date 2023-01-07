import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image,StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

import ServiecesIcon from '../../components/hallCom/ServiecesIcon';
import LodingOverlay from '../../components/UI/LodingOverlay';

import { auth,db,storage } from '../../config'; 
import { addDoc, collection } from 'firebase/firestore';

//const initialServices = {
    //teaBoy: false,
    //incense: false,
    //cooking: false,
//};
const initialServices = [
    {name:'teaBoy', isAvailable: false},
    {name:'Incense', isAvailable: false},
    {name:'Cooking', isAvailable: false}
];

function Inbox({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    //Services
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [guests, setGuests] = useState('');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState(initialServices);
    const [locationOfHall, setLocationOfHall] = useState({
        latitude: -1,
        longitude: -1
    });

    //get Location og the user
    const [locationOfUser, setLocationOfUser] = useState({
        latitude: -1,
        longitude: -1
    });
    useEffect(() => {
        (async () => {
            setIsSubmitting(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            //console.log(location);
            setLocationOfUser({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setLocationOfHall({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setIsSubmitting(false);
        })();
    }, [locationOfUser]);
    var tempLatitude;
    var tempLongitude;

    //images
    const [images, setImages] = useState([]);
    const [imagesLocation, setImagesLocation] = useState([]);

    //select images
    const pickImage = async() => {
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
    const upload = async() => {

        const uploadImage = async() => {
            setIsSubmitting(true);
            for(var n =0 ; n < images.length; n++){
                //1-convert image into blob image

                const blobImage = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    xhr.onload = function() {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function() {
                        reject(new TypeError("Ntwork request failed"));
                    };
                    xhr.responseType = "blob";
                    //xhr.open("GET", image, true);
                    xhr.open("GET", images[n].uri, true);
                    xhr.send(null);
                });
                //2-set metadata of image 

                const metadata = {
                    contentType: 'image/jpeg'
                };

                //3-upload image on store

                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'HallImage/' + Date.now());
                const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',(snapshot) => 
                    {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    },//failure 
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    },//success
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            imagesLocation.push(downloadURL);
                            //setImagesLocation(current => [...current, downloadURL]);
                        });
                    }
                );

            }//end of loop
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(imagesLocation.length);
                }, 5000);
            }); 
        }
        const uploadHall = async() => {
            await uploadImage();
            if(imagesLocation && name && price && guests){
                const HallID = await addDoc(collection(db, "Halls"), {
                    OwnerEmail: '??',
                    Name: name,
                    Price: price,
                    Guests: guests,
                    imageUrl: imagesLocation,
                    Description: description,
                    Services: services,
                    Location: locationOfHall
                }).
                then(()=>{
                    setName('');
                    setPrice('');
                    setGuests('');
                    setImagesLocation([]);
                    setImages([]);
                    setDescription('');
                    setServices(initialServices);
                    setLocationOfHall({latitude: locationOfUser.latitude, longitude: locationOfUser.longitude});
                    setIsSubmitting(false);
                    alert("Hall Add successsfilly");
                })
                navigation.navigate('Home');
            }else{
                alert("Please wait");
            }
        }
        uploadHall();
    }


    if(isSubmitting){
        return <LodingOverlay text={"Get your Loction"}/>;
    }

    return(
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{flex: 1}}>
                    <Text style={styles.label}>Name of Hall : </Text>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Hall Name"
                        onChangeText={newName => setName(newName)}
                        defaultValue={name}
                    />
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Price of Hall : 
                        <Text style={{fontSize: 6}}> (*after that you can change price for some days)</Text>
                    </Text>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Hall Price"
                        onChangeText={newPrice => setPrice(newPrice)}
                        defaultValue={price}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Number of guests : </Text>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="# Guests Number"
                        onChangeText={newGuest => setGuests(newGuest)}
                        defaultValue={guests}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{flex: 1}}>
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
                                                source={{uri:images.uri}}
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

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Description of hall: </Text>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Description"
                        onChangeText={newDescription => setDescription(newDescription)}
                        defaultValue={description}
                    />
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Location of hall: </Text>
                    <View style={styles.mapContainer}>
                        <MapView 
                            provider={PROVIDER_GOOGLE}
                            style={styles.map} 
                            initialRegion={{
                                longitude: locationOfUser.longitude,
                                latitude: locationOfUser.latitude,
                                longitudeDelta: 0.5,
                                latitudeDelta: 0.5,
                            }}
                            onPress={(e)=>{
                                tempLongitude= e.nativeEvent.coordinate.longitude;
                                tempLatitude = e.nativeEvent.coordinate.latitude;
                                setLocationOfHall({longitude: tempLongitude, latitude: tempLatitude});
                            }}
                        >
                            <Marker
                                coordinate={{latitude: locationOfHall.latitude, longitude: locationOfHall.longitude}}
                                //draggable={true}
                            >
                            </Marker>
                        </MapView>
                    </View>
                </View>

                <Text style={styles.label}>Services : </Text>
                <View style={{flex: 1}}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.serviecesContainer}
                    >
                        <View style={styles.iconContainer}>
                            <ServiecesIcon name={'teaBoy'}/>
                            <Text>Tea Boy</Text>
                            <View style={styles.checkboxContainer}>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        //value={services.teaBoy}
                                        value={services[0].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'teaBoy') {
                                                        return {...obj, isAvailable: value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>Yes</Text>
                                </View>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        //value={! services.teaBoy}
                                        value={! services[0].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'teaBoy') {
                                                        return {...obj, isAvailable: !value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>No</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.iconContainer}>
                            <ServiecesIcon name={'Incense'}/>
                            <Text>Incense</Text>
                            <View style={styles.checkboxContainer}>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={services[1].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'Incense') {
                                                        return {...obj, isAvailable: value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>Yes</Text>
                                </View>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={! services[1].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'Incense') {
                                                        return {...obj, isAvailable: !value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>No</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.iconContainer}>
                            <ServiecesIcon name={'Cooking'}/>
                            <Text>Cooking</Text>
                            <View style={styles.checkboxContainer}>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={services[2].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'Cooking') {
                                                        return {...obj, isAvailable: value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>Yes</Text>
                                </View>
                                <View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={! services[2].isAvailable}
                                        onValueChange={value =>
                                            setServices(current =>
                                                current.map(obj => {
                                                    if (obj.name === 'Cooking') {
                                                        return {...obj, isAvailable: !value};
                                                    }
                                          
                                                    return obj;
                                                }),
                                            )
                                        }
                                    />
                                    <Text style={styles.checkboxText}>No</Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View>
                    <Button title='Sumbit' onPress={upload}/>
                </View>
            </ScrollView>
        </View>
    );
}

export default Inbox;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },
    label:{
        marginBottom:  2,
    },
    textInput1:{
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
        padding: 2,
        marginBottom: 6,
    },
    imageInfoContainer:{
        height:250,
        justifyContent: 'center'
    },
    imageInfoContainer2:{
        height:250,
    },
    imageText:{
        textAlign: 'center',
        fontSize: 16,
    },
    imageContainer:{
        height: 150,
        width: 150,
        marginHorizontal: 6,
        marginVertical: 45,
    },
    image1:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mapContainer:{
        flex: 1,
        height: 280,
        width: 350,
        marginVertical: 4,
        alignSelf: 'center'
    },
    map:{
        width: '100%',
        height: '100%',
    },
    serviecesContainer:{
        flex: 1,
        height:150,
    },
    iconContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
    },
    checkboxContainer:{
        flexDirection: 'row',
    },
    checkbox:{
        margin: 4,
    },
    checkboxText:{
        textAlign: 'center',
        fontSize:10,
    },
});