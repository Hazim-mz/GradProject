import { View } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

function ServiecesIcon({name}){
    if(name == 'teaBoy'){
        return(
            <MaterialIcons name="emoji-food-beverage" size={40} color="black" />
        );
    }
    else if(name == 'Incense'){
        return(
            <FontAwesome name="fire" size={40} color="black" />        
        );
    }
    else if(name == 'Cooking'){
        return(
            <MaterialCommunityIcons name="food-turkey" size={40} color="black" />
        );
    }
    else{
        return( 
                <View></View>
        );
    }
}

export default ServiecesIcon;