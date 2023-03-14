import { View, Text, Button, Modal, Image,StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from "../../constants/styles";
import LodingOverlay from "../UI/LodingOverlay";

import { auth,db,storage } from '../../config'; 
import { doc, updateDoc, where, writeBatch, query, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ChangeImage({userID, image, rule, changeImage, visible, close}){
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
    
            //console.log(result);
    
            if (!result.cancelled) {
              setImages(result);
            }
        };

        const upload = async() => {
            var imagesLocation = '' ;
            const uploadImage = async() => {
                setIsSubmitting(true);
                try {
                    const response = await fetch(images.uri);
                    const blobFile = await response.blob();
                    const reference = ref(storage, 'UserImage/' + Date.now())
                    await uploadBytesResumable(reference, blobFile)
                    var file = await getDownloadURL(reference);
                    imagesLocation = file;
                } catch (e) {
                    console.log(e)
                }
            }

            const uploadHall = async() => {
                await uploadImage();
                if(imagesLocation != '' && Object.keys(images).length !== 0 ){
                    const docRef1 = doc(db, "Users",  userID);
                    
                    await updateDoc(docRef1, {
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