import { View } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

function ServiecesIcon({name,color}){
    if(name == 'Coffee'){
        return(
            <MaterialIcons name="emoji-food-beverage" size={40} color={color} />
        );
    }
    else if(name == 'Incense'){
        return(
            <FontAwesome name="fire" size={40} color={color} />
        );
    }
    else if(name == 'Catering'){
        return(
            <MaterialCommunityIcons name="food-turkey" size={40} color={color} />
        );
    }
    else if(name == 'Valet Parking'){
        return(
            <MaterialIcons name="local-parking" size={40} color={color} />
        );
    }
    else if(name == 'Janitors'){
        return(
            <MaterialCommunityIcons name="broom" size={40} color={color} />
        );
    }
    else if(name == 'Hospitality'){
        return(
            <MaterialCommunityIcons name="hand-coin" size={40} color={color} />
        );
    }   
    else if(name == 'Deserts'){
        return(
            <MaterialCommunityIcons name="candy" size={40} color={color} />
        );
    }
    else{
        return( 
                <View></View>
        );
    }
}

export default ServiecesIcon;