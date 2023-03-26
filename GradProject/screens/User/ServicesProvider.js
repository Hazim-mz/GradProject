import { View, Text, TextInput, Pressable, Keyboard, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import * as Location from 'expo-location';

import { collection, where, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import HallList from '../../components/common/HallList';
import Search from '../../components/homeCom/Search';


import { AuthContext } from "../../store/auth-context";
import ServiceProviderTags from '../../components/ServiceProviderCom/ServiceProviderTags';
import ServicesProviderLists from '../../components/ServiceProviderCom/ServicesProviderLists';
import ServiceProviderList from '../../components/ServiceProviderCom/ServiceProviderList';

const Tags = {
    Sheep: true,
    Photog: false,
    Resto: false,
    Test: false,
};

var screenWidth = Dimensions.get('window').width;

function ServicesProvider({ navigation, route }) {
    const userAccountCtx = useContext(AuthContext);

    const [shepherds, setShepherds] = useState([]);
    const [photogs, setPhotogs] = useState([]);

    //Search Fuction
    const [hallsBeforeSorting, setHallsBeforeSorting] = useState([]);//to show the previous hall before the search
    const [startSearch, setStartSearch] = useState(false);//to show x button to cancel the search
    const [search, setSearch] = useState('');//name of the hall you search for 
    function StartEnterNameOfHall(name) {
        setSearch(name);
    }
    function StartSearch(halls) {

    }
    function CancelSearch() {
        Keyboard.dismiss();
    }

    //call Halls from DB
    useLayoutEffect(() => {
        const query1 = query(collection(db, "ShepherdService"), orderBy("Rate", "desc"));
        onSnapshot(query1, (Shepherds) =>
            setShepherds(Shepherds.docs.map((Shepherd) => ({
                id: Shepherd.id,
                data: Shepherd.data()
            }))
            )
        );

        const query2 = query(collection(db, "PhotogService"), orderBy("Rate", "desc"));
        onSnapshot(query2, (Photogs) =>
            setPhotogs(Photogs.docs.map((Photog) => ({
                id: Photog.id,
                data: Photog.data()
            }))
            )
        );

    }, []);

    const [tags, setTags] = useState(Tags);

    function onPressTagToScroll(index) {
       scroll.scrollTo({x: index * screenWidth, y: 0, animated: true})    
    }

    const [tagActiveByClick, settagActiveByClick] = useState(false);
    const [tagActive, setTagActive] = useState(0);
    function onScrollHandler({nativeEvent}){
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== tagActive && tagActiveByClick == tagActive){
            if(slide == 0 ){
                setTags({
                    Sheep: true,
                    Photog: false,
                    Resto: false,
                    Test: false,
                });
            }
            else if(slide == 1 ){
                setTags({
                    Sheep: false,
                    Photog: true,
                    Resto: false,
                    Test: false,
                });    
            }
            else if(slide == 2){
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: true,
                    Test: false,
                });   
            }
            else if(slide == 3){
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: false,
                    Test: true,
                });   
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        }else if(slide !== tagActive && slide == tagActiveByClick){
            if(slide == 0 ){
                setTags({
                    Sheep: true,
                    Photog: false,
                    Resto: false,
                    Test: false,
                });
            }
            else if(slide == 1 ){
                setTags({
                    Sheep: false,
                    Photog: true,
                    Resto: false,
                    Test: false,
                });    
            }
            else if(slide == 2){
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: true,
                    Test: false,
                });   
            }
            else if(slide == 3){
                setTags({
                    Sheep: false,
                    Photog: false,
                    Resto: false,
                    Test: true,
                });   
            }
            setTagActive(slide);
            settagActiveByClick(slide);
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.searchBar}>
                <View style={styles.searchBar1}>
                    <Search
                        EnteredName={search}
                        StartEnterNameOfHall={StartEnterNameOfHall}
                        startSearch={startSearch}
                        current={shepherds}
                        old={hallsBeforeSorting}
                        SearchFuntion={StartSearch}
                        CancelSearch={CancelSearch}
                    />
                </View>

                <View style={styles.searchBar2}>
                    <ServiceProviderTags tags={tags} setTags={setTags} onPressTagToScroll={onPressTagToScroll} settagActiveByClick={settagActiveByClick}/>
                </View>

            </View>

            <View style={{ flex: 3 }}>
                <View style={styles.hallContainer}>
                    <ServicesProviderLists 
                        tags={tags} 
                        setTags={setTags} 
                        tagActive={tagActive} 
                        tagActiveByClick={tagActiveByClick} 
                        setTagActive={setTagActive}
                        settagActiveByClick={settagActiveByClick}
                        shepherds={shepherds}
                        photogs={photogs}
                    />
                </View>
            </View>
        </View>
    );
}

export default ServicesProvider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        flex: 0.8,
        margin: 12,
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    searchBar1: {
        backgroundColor: '#E8E8E8',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cccdb2',
    },
    map: {
        flex: 1,
        marginTop: 14,
    },
    mapButton: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 4,
        marginRight: 4,
    },
    searchBar2: {
        backgroundColor: '#ECECEC',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
    },
    serviecesContainer: {
        flex: 1,
        marginHorizontal: 2,
    },
    servieceContainer: {
        height: 32,
        width: 90,
        borderWidth: 0.8,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9850b3',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    button: {
        opacity: 0.6,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    FilterContainer: {
        flexDirection: 'row',
    },
    DateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cencelButtonContainer: {
    },
    filterCencelButton: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: 20,
        bottom: -3,
        right: 1,
        padding: 6
    },
    dateCencelButton: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: 20,
        bottom: -20,
        right: 1,
        padding: 6
    },
    cencelButton: {
        marginTop: 3,
        marginRight: 5,
        fontSize: 20,
    },
    hallContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});
