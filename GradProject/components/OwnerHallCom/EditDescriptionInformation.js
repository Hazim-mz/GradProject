import { View, Text, Pressable, ScrollView,StyleSheet } from "react-native";
import EditInput from './EditInput';

function EditDescriptionInformation({description,setDescription}){
   
    function editDescription(inputType,enteredValue){
        switch (inputType) {
            case 'description':
            setDescription(enteredValue);
              break;
    }
}
    return(
        <View style={styles.descriptionContainer}>
            <Text style={styles.boldName}>Description: </Text>
            <EditInput 
            placeholder={description}
            onUpdateValue={editDescription.bind(this,'description')}/>
        </View>
    );
}

export default EditDescriptionInformation;

const styles = StyleSheet.create({
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionContainer:{
        minHeight:100,
    },
});