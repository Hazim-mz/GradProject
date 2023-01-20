import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

import { GlobalStyles } from '../../constants/styles';

import AdminHome from './AdminHome';
import AdminAccount from './AdminAccount';

const BottomTabs = createBottomTabNavigator();

function AdminPage(){
    return(
        <>
            <NavigationContainer>
                <BottomTabs.Navigator
                    screenOptions={() => ({
                        headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
                        headerTintColor: 'white',
                        //tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                        tabBarActiveTintColor: GlobalStyles.colors.primary10,
                    })}
                >
                    <BottomTabs.Screen
                        name="Home"
                        component={AdminHome}
                        options={{
                            title: 'Home',
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" size={size} color={color} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="Account"
                        component={AdminAccount}
                        options={{
                            title: 'Account',
                            tabBarLabel: 'Account',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person" size={size} color={color} />
                            ),
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AdminPage;