import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Component } from 'react';
import firebase from "firebase";
import "@firebase/firestore";

const Stack = createStackNavigator();

class ImageLoader extends Component {
    // animation for icon
    state = {
      opacity: new Animated.Value(0),
    }
  
    onload = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onload}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.5,1],
                  })
                }
              ]
            },
            this.props.style,
          ]}
        />
      )
    }
  }
  

export default function horoscopeHome( {navigation}) {
  const [userInfo, setUserInfo] = useState();
  const [sign, setSign] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState();
  const [imgPath, setImagePath] = useState("");

  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        const userSign = userData.sign;
        if (userSign == "Aquarius"){
          setImagePath(require('../assets/images/Aquarius.png'));
        } else if (userSign == "Gemini") {
          setImagePath(require('../assets/images/Gemini.png'));
        } else if (userSign == "Pisces") {
          setImagePath(require('../assets/images/Pisces.png'));
        } else if (userSign == "Aries") {
          setImagePath(require('../assets/images/Aries.png'));
        } else if (userSign == "Taurus") {
          setImagePath(require('../assets/images/Taurus.png'));
        } else if (userSign == "Gemini") {
          setImagePath(require('../assets/images/Gemini.png'));
        } else if (userSign == "Cancer") {
          setImagePath(require('../assets/images/Cancer.png'));
        } else if (userSign == "Leo") {
          setImagePath(require('../assets/images/Leo.png'));
        } else if (userSign == "Virgo") {
          setImagePath(require('../assets/images/Virgo.png'));
        } else if (userSign == "Libra") {
          setImagePath(require('../assets/images/Libra.png'));
        } else if (userSign == "Scorpio") {
          setImagePath(require('../assets/images/Scorpio.png'));
        } else if (userSign == "Sagittarius") {
          setImagePath(require('../assets/images/Sagittarius.png'));
        } else {
          setImagePath(require('../assets/images/Capricorn.png'));
        }
        setSign(userSign);
        setUserInfo(userData);
        setTimeout(() => {
          setLoading(false);
        }, 600);
        
        const horoscopes = firebase.firestore().collection("horoscopes").doc(userSign);

        horoscopes.get().then(function (scope) {
          if (scope.exists) {
            const horoscopeData = scope.data();
            const description = horoscopeData.desc;
            setDesc(description);
            setTimeout(() => {
              setLoading(false);
            }, 600);
            
          } else {
            setLoading(false);
            console.warn("Horoscope does not exist!");
          }
        });
      } else {
        setLoading(false);
        console.warn("User not found");
      }
    });
  };

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    });

    return isFocused;
  }, [userInfo, loading, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#FFBA7E" />
      </View>
    );
  }
  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <ImageLoader source={imgPath} style={styles.image}></ImageLoader>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.title}>{sign}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View All Horoscopes</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293766',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
      flex: 5,
      alignItems: 'center', 
      justifyContent: 'center',
  },
  bottom: {
      flex: 7,
      paddingHorizontal: 20,
  },
  title: {
      color: "#FFBA7E",
      fontSize: 60,
      letterSpacing: 2,
      textAlign: "center",
      paddingBottom: 10,
  },
  desc: {
      fontSize: 14,
      color: "#E8D6CA",
      letterSpacing: 1,
      textAlign: "center",
      lineHeight: 20,
  },
  buttonContainer: {
      flex: 1.5,
  },
  button: {
      backgroundColor: "#E8D6CA",
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: 12,
      width: 300
  },
  buttonText: {
      color: '#293766',
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: '600',
      textAlign: 'center',
  }
});