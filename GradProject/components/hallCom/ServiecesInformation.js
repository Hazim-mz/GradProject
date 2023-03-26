import { View, Text, ScrollView, StyleSheet } from "react-native";
import ServiecesIcon from "./ServiecesIcon";
import { GlobalStyles } from '../../constants/styles'

function ServiecesInformation({ services }) {
    return (
        <View style={styles.serviecesContainer}>
            <Text style={styles.boldName}>Servieces: </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.serviecesContainer}
            >
                {
                    services.map((service, index) => (
                        <View key={index}>
                            {
                                service.isAvailable ?
                                    <View
                                        style={styles.serviecesInformation}
                                    >
                                        <View>
                                            <ServiecesIcon name={service.name} color={GlobalStyles.colors.primary10} />
                                            <Text style={styles.boldName2}>{service.name}</Text>
                                        </View>
                                    </View>
                                    :
                                    <></>
                            }
                        </View>

                    ))
                }
            </ScrollView>
        </View>
    );
}

export default ServiecesInformation;

const styles = StyleSheet.create({
    boldName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldName2: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    serviecesContainer: {
        flex: 1,
        height: 170,
    },
    serviecesInformation: {
        flex: 1,
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        shadowColor: 'black',
        borderRightWidth: 1,
        borderColor: '#cccdb2',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.15,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

});