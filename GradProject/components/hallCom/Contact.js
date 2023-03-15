import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, Pressable, ScrollView, Alert, KeyboardAvoidingView, Image, Platform, StyleSheet } from "react-native";


function Contact({ owner, contact }) {

    const [image, setImage] = useState('https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png');
    const [name, setName] = useState('');
    useEffect(() => {
        if (owner.length != 0) {
            setImage(owner[0].data.imageUrl);
            setName(owner[0].data.Name);
        }
    }, [owner])
    return (
        <View style={styles.contactContainer}>
            <View style={styles.contactInformationTitle}>
                <Text style={styles.boldName}>Contact with owner :</Text>
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Pressable
                        style={({ pressed }) => (pressed ? [styles.press, styles.contactInformation] : styles.contactInformation)}
                        onPress={contact}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image}/>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.text1}>
                                <Text style={styles.boldName}>{name}</Text>
                            </View>
                            <View style={styles.text2}>
                                <Text style={styles.normalName}>Talk To Hall Owner</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Contact;

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 3,
        height: 100,
    },
    contactInformationTitle: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        borderBottomRightRadius: 0,
        paddingTop: 8,
        paddingLeft: 6,
    },
    contactInformation: {
        height: 50,
        width: '80%',
        borderRadius: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    press: {
        opacity: 0.7,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        marginLeft: 10,
    },
    text1: {
    },
    text2: {
        marginTop: 3,
        marginLeft: 10
    },
    boldName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    normalName: {
        fontSize: 13,
        textAlign: 'center',
    },
});