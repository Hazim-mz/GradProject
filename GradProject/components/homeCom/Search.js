import { View, TextInput, Pressable, Text, Keyboard, StyleSheet} from "react-native";
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import {Colors, GlobalStyles} from '../../constants/styles'
function Search({ EnteredName, StartEnterNameOfHall, startSearch, current, old, SearchFuntion, CancelSearch }){
    function Search(){
        if(EnteredName != ''){
            Keyboard.dismiss();
            if(current >= old){
                const newHalls = current.filter(item =>{
                    const itemData = item.data.Name ? item.data.Name.toUpperCase() : ''.toUpperCase()
                    const textData = EnteredName.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
            SearchFuntion(newHalls);
            }
            else{
                const newHalls = old.filter(item =>{
                    const itemData = item.data.Name ? item.data.Name.toUpperCase() : ''.toUpperCase()
                    const textData = EnteredName.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
                SearchFuntion(newHalls);
            }
        }
    }
    return(
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.search} 
                    onChangeText={newName => StartEnterNameOfHall(newName)}
                    defaultValue={EnteredName}
                    placeholder='search'
                />
                {
                    startSearch 
                    ?
                        <Pressable
                            onPress={CancelSearch}
                            style={styles.cencelButtonContainer}
                        >
                            <Text style={styles.cencelButton}>X</Text>
                        </Pressable>
                    :
                        <View></View>

                }
                <Pressable
                    onPress={Search}
                >
                    <View style={styles.searchButton}>
                        <FontAwesome name="search" size={24} color={GlobalStyles.colors.primary10} />
                    </View>
                </Pressable>
            </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    searchBar1:{
        backgroundColor:'#E8E8E8',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 1,
        flexDirection: 'row',
    },
    searchContainer:{
        flex: 6,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 20,
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent:"center"
    },
    search:{
        flex: 6,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        height: '100%',
        fontSize: 18,
    },
    searchButton:{
        flex: 6,
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        height: 15,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cencelButtonContainer:{
    },
    cencelButton:{
        margin: 7,
        fontSize: 20,
    },
    map:{
        flex: 1,
        marginTop: 14,
    }
});
  
