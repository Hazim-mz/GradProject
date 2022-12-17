import { View, Text, ScrollView,StyleSheet } from "react-native";
import ServiecesIcon from "./ServiecesIcon";

function ServiecesInformation({services}){
    return(
        <View style={styles.serviecesContainer}>
            <Text style={styles.boldName}>Servieces: </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.serviecesContainer}
            >
                {
                    services.map((service, index) =>(
                        <View 
                            key={index}
                            style={service.isAvailable ? [styles.serviecesInformation, styles.backgroundColor1] : [styles.serviecesInformation, styles.backgroundColor2]}
                        >
                            <ServiecesIcon name={service.name}/>
                            <Text style={styles.boldName2}>{service.name}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default ServiecesInformation;

const styles = StyleSheet.create({
    boldName:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign:'center',
    },
    serviecesContainer:{
        flex: 1,
        height:170,
    },
    serviecesInformation:{
        flex: 1,
        height:120,
        width: 120,
        marginTop:20,
        marginHorizontal:20,
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.15,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', 
    },
    backgroundColor1:{
        backgroundColor: '#3af06a',
    },
    backgroundColor2:{
        backgroundColor: '#f73e6c',
    },
});