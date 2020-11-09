import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import horoscopeHome from './screens/horoscopeHome';
import Login from "./screens/Login";
import Signup from "./screens/Signup";

import firebase from "firebase";
import "@firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAI-4LnlQp1exoRPp493XzvPtL5RqQJuYA",
  authDomain: "horoscope-e13c7.firebaseapp.com",
  databaseURL: "https://horoscope-e13c7.firebaseio.com",
  projectId: "horoscope-e13c7",
  storageBucket: "horoscope-e13c7.appspot.com",
  messagingSenderId: "401432367694",
  appId: "1:401432367694:web:2f0ff3d063f3c4b62b691f",
  measurementId: "G-V2HTZR15S6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();
const HoroscopeStack = createStackNavigator();

const DailyHoroscopeNav = () => {
  return (
    <HoroscopeStack.Navigator>
      <HoroscopeStack.Screen name="horoscopeHome" component={horoscopeHome} options={{
          title: 'Your Daily Horoscope',
          headerStyle: {
            backgroundColor: '#293766',
            shadowColor: 'transparent',
          },
          headerTintColor: '#8C9FE1',
          headerTitleStyle: {
            fontWeight: '200',
            letterSpacing: 1,
            fontSize: 16,
          },
        }} />
    </HoroscopeStack.Navigator>
  );
};

{/* <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="horoscopeHome" component={horoscopeHome} 
        options={{
        title: 'Your Daily Horoscope',
        headerStyle: {
          backgroundColor: '#293766',
          shadowColor: 'transparent',
        },
        headerTintColor: '#8C9FE1',
        headerTitleStyle: {
          fontWeight: '200',
          letterSpacing: 1,
          fontSize: 14,
        },
      }}/>
    </Stack.Navigator>
  </NavigationContainer> */}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => {
          console.log("logout");
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Signout successfull!");
              props.navigation.closeDrawer();
            })
            .catch((err) => alert(err.message));
        }}
      />
    </DrawerContentScrollView>
  );
};


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={Login}/>
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen
        name="HoroscopeStack"
        component={DailyHoroscopeNav}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}