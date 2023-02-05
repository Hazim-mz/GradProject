import { View, TextInput, Pressable, Text, Keyboard, StyleSheet} from "react-native";
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';

function Search({EnteredName, StartEnterNameOfHall, startSearch, halls, oldHalls,SearchFuntion, CancelSearch}){
    function Search(){
        if(EnteredName != ''){
            Keyboard.dismiss();
            if(halls >= oldHalls){
                const newHalls = halls.filter(item =>{
                    const itemData = item.data.Name ? item.data.Name.toUpperCase() : ''.toUpperCase()
                    const textData = EnteredName.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
            SearchFuntion(newHalls);
            }
            else{
                const newHalls = oldHalls.filter(item =>{
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
                        <FontAwesome name="search" size={20} color="black" />
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
        borderWidth: 1,
        borderRadius: 8,
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
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
        backgroundColor: '#2069d6',
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
  
