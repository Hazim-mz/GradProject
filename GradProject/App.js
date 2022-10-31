import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

import { GlobalStyles } from './constants/styles';
import Home from './screens/Home';
import HomeSort from './screens/HomeScreens/HomeSort';
import HomeFilter from './screens/HomeScreens/HomeFilter';
import HomeDate from './screens/HomeScreens/HomeDate';
import HallPage from './screens/HallPage';
import Inbox from './screens/Inbox';
import Bookings from './screens/Bookings';
import Account from './screens/Account';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function HomeOverview() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="HallPage"
        component={HallPage}
      />
      <Stack.Screen
        name="HomeSort"
        component={HomeSort}
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="HomeFilter"
        component={HomeFilter}
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="HomeDate"
        component={HomeDate}
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={() => ({
            headerStyle: { backgroundColor: GlobalStyles.colors.primary10 },
            headerTintColor: 'white',
            headerShown: false,
            //tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.primary10,
          })}
        >
          <BottomTabs.Screen
            name="HomeOverview"
            component={HomeOverview}
            options={{
              title: 'Home',
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Inbox"
            component={Inbox}
            options={{
              title: 'Inbox',
              tabBarLabel: 'Inbox',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="mail" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Bookings"
            component={Bookings}
            options={{
              title: 'Bookings',
              tabBarLabel: 'Bookings',
              tabBarIcon: ({ color, size }) => (
                <Foundation name="shopping-bag" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Account"
            component={Account}
            options={{
              title: 'Account',
              tabBarLabel: 'Acco unt',
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

