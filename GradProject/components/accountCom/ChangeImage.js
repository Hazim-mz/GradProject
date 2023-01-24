import { View, Text, Button, Modal, Image,StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from "../../constants/styles";
import LodingOverlay from "../UI/LodingOverlay";

import { auth,db,storage } from '../../config'; 
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ChangeImage({userID, image, changeImage, visible, close}){
        const [isSubmitting, setIsSubmitting] = useState(false);
        const navigation = useNavigation();

        function closePage(){
            setImages({});
            close();
        }
        //images
        const [images, setImages] = useState({});

        //select images
        const pickImage = async() => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
    
            console.log(result);
    
            if (!result.cancelled) {
              setImages(result);
            }
        };

        const upload = async() => {
            var imagesLocation = '' ;
            const uploadImage = async() => {
                setIsSubmitting(true);
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
                    xhr.open("GET", images.uri, true);
                    xhr.send(null);
                });
                //2-set metadata of image 

                const metadata = {
                    contentType: 'image/jpeg'
                };

                //3-upload image on store

                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'UserImage/' + Date.now());
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
                            imagesLocation= downloadURL;
                            //setImagesLocation(current => [...current, downloadURL]);
                        });
                    }
                );
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('hi');
                    }, 5000);
                }); 
            }

            const uploadHall = async() => {
                await uploadImage();
                if(imagesLocation != '' && Object.keys(images).length !== 0 ){
                    const docRef = doc(db, "Users",  userID);

                    await updateDoc(docRef, {
                        imageUrl: imagesLocation
                    });
                    setImages(imagesLocation);
                }else{
                    alert("Error occurred while upload the Image");
                }
                setIsSubmitting(false);
                changeImage(imagesLocation);
                closePage();
            }

            uploadHall();
        }

    return(
        <Modal visible={visible} animationType="slide">
            {
                isSubmitting ?
                
                    <LodingOverlay text={"please wait a second"}/>
                :
                    <View style={styles.container}>
                        <View style={styles.black1}>

                        </View>

                        <View style={styles.imageContainer}>
                            {
                                Object.keys(images).length !== 0 ?
                                    <Image 
                                        source={{uri: images.uri}}
                                        style={styles.image}
                                    />
                                :
                                    <Image 
                                        source={{uri: image}}
                                        style={styles.image}
                                    />
                            }
                        </View>

                        <View style={styles.black2}>
                            {
                                Object.keys(images).length !== 0 ?
                                    <Pressable
                                        style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                        onPress={upload}
                                    >
                                        <View style={styles.editContainer}>
                                            <Text style={styles.editText}>Apply</Text>
                                        </View>
                                    </Pressable>
                                :
                                    <Pressable
                                        style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                        onPress={pickImage}
                                    >
                                        <View style={styles.editContainer}>
                                            <Text style={styles.editText}>Edit</Text>
                                        </View>
                                    </Pressable>
                            }

                            <Pressable
                                style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                                onPress={closePage}
                            >
                            <View style={styles.closeContainer}>
                                <Text style={styles.closeText}>close</Text>
                            </View>
                            </Pressable>

                        </View>
                    </View>
            }
        </Modal>
    );
}
export default ChangeImage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    black1:{
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.9
    },
    imageContainer:{
        flex: 3,
    },
    image:{
        width: '100%',
        height: '100%',
    },
    black2:{
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.9,
        flexDirection: 'row',
    },
    editContainer:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
        marginTop: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer:{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 70,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary10,
    },
    button:{
        flex: 1
    },
    buttonPress:{
        opacity: 0.7,
    },
});