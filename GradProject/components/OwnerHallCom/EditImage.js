import { View, Text, Alert, Modal, SafeAreaView, FlatList, Pressable, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import { Colors, GlobalStyles } from '../../constants/styles';

import { db } from '../../config'; 
import { doc, updateDoc } from 'firebase/firestore';

function EditImage({ Images, saveImage, visible, close }){
    
    const [images, setImages] = useState(Images);
    const [newimages, setNewImages] = useState([]);
    const [undeletedImage, setUndeletedImage] = useState(Images);

    function closePage(){
        setImages(Images);
        setUndeletedImage(Images);
        setNewImages([]);
        close();
    }

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });


        //console.log(result);
        if (!result.cancelled) {
          setImages((pre)=> [...pre, result.uri]);
          setNewImages((pre)=> [...pre, result.uri]);
        }
    };

    function deleteImage(imageUrl){
        setImages(images.filter(item => item !== imageUrl));
        setNewImages(newimages.filter(item => item !== imageUrl));
        setUndeletedImage(undeletedImage.filter(item => item !== imageUrl));
    }

    function renderImage(itemData){
        if(images.length % 2 == 0){
            if(images[images.length - 2] == itemData.item){
                return (
                    <View >
                        <View style={styles.imageContainer}>
                            <Image 
                                style={styles.image}
                                source={{uri: itemData.item}}
                            />
                            <Pressable
                                style={({ pressed }) => pressed ? [styles.deleteContainer, styles.press] : styles.deleteContainer}
                                onPress={deleteImage.bind(this, itemData.item)}
                            >
                                <MaterialCommunityIcons name="delete" size={24} color="red" />
                            </Pressable>
                        </View>
                        <Pressable
                            style={({pressed}) => (pressed ? styles.buttonPress : null)}
                            onPress={pickImage}
                        >
                            <View style={styles.addNewImageColumnContainer}>
                                <FontAwesome name="plus" size={60} color="black" />
                            </View> 
                        </Pressable>
                    </View>
                );
            }else{
                return (
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{uri: itemData.item}}
                        />
                        <Pressable
                            style={({ pressed }) => pressed ? [styles.deleteContainer, styles.press] : styles.deleteContainer}
                            onPress={deleteImage.bind(this, itemData.item)}
                        >
                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                        </Pressable>
    
                    </View> 
                );

            }
        }else{
            if(images[images.length - 1] == itemData.item){
                return (
                    
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.imageContainer}>
                            <Image 
                                style={styles.image}
                                source={{uri: itemData.item}}
                            />
                            <Pressable
                                style={({ pressed }) => pressed ? [styles.deleteContainer, styles.press] : styles.deleteContainer}
                                onPress={deleteImage.bind(this, itemData.item)}
                            >
                                <MaterialCommunityIcons name="delete" size={24} color="red" />
                            </Pressable>
                        </View>
                        <Pressable
                            style={({pressed}) => (pressed ? styles.buttonPress : null)}
                            onPress={pickImage}
                        >
                            <View style={styles.addNewImageRowContainer}>
                                <FontAwesome name="plus" size={60} color="black" />
                            </View> 
                        </Pressable>
                    </View>
                );
            }else{
                return (
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{uri: itemData.item}}
                        />
                        <Pressable
                            style={({ pressed }) => pressed ? [styles.deleteContainer, styles.press] : styles.deleteContainer}
                            onPress={deleteImage.bind(this, itemData.item)}
                        >
                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                        </Pressable>
    
                    </View> 
                );
            }
            
        }

    }


    return(
        <Modal visible={visible} animationType="slide">
            <SafeAreaView style={styles.safeAreaViewcontainer}>
                <FlatList 
                    style={{flex: 1,}}
                    data={images}
                    keyExtractor={(item) => item}
                    renderItem={renderImage}
                    numColumns={2}
                />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                            onPress={saveImage.bind(this, newimages, undeletedImage)}
                        >
                            <View style={styles.editContainer}>
                                <Text style={styles.editText}>Save</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            style={({pressed}) => (pressed ? [styles.buttonPress, styles.button] : styles.button)}
                            onPress={closePage}
                        >
                            <View style={styles.closeContainer}>
                                <Text style={styles.closeText}>Cancel</Text>
                            </View>
                        </Pressable>
                    </View>
            </SafeAreaView>
        </Modal>
    );
}
export default EditImage;

const styles = StyleSheet.create({
    safeAreaViewcontainer:{
        flex: 1,
    },
    imageContainer:{
        height: 210,
        width: 160,
        borderRadius: 5,
        borderWidth: 2,
        margin: 12,
    },
    image:{
        height:'100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 2,
    },
    deleteContainer: {
        position: 'absolute',
        minHeight: 40,
        minWidth: 40,
        paddingLeft: 4,
        paddingTop: 8,
        alignItems: 'center',
        right: 0,
        bottom: 0,
    },
    press: {
        opacity: 0.7
    },
    addNewImageColumnContainer:{
        height: 210,
        width: 160,
        margin: 12,
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',    
    },
    addNewImageRowContainer:{
        height: 210,
        width: 160,
        margin: 12,
        borderRadius: 5,
        borderWidth: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',    
    },
    buttonContainer:{
        height: 120,
        width: '100%',
        flexDirection: 'row',
    },
    editContainer:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary10,
        marginVertical: 30,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        height: 50,
    },
    editText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    closeContainer:{
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 30,
        marginHorizontal: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
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