import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import firebase from "firebase";
import { NavigationActions } from "react-navigation";
import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // zodiac converter
  const tellSign = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    var sign = '';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18 )){
      sign = 'Aquarius';
    } 
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20 )){
      sign = 'Pisces';
    } 
    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19 )){
      sign = 'Aries';
    } 
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20 )){
      sign = 'Taurus';
    } 
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20 )){
      sign = 'Gemini';
    } 
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22 )){
      sign = 'Cancer';
    } 
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22 )){
      sign = 'Leo';
    } 
    else if ((month == 8 && day >= 22) || (month == 9 && day <= 22 )){
      sign = 'Virgo';
    } 
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22 )){
      sign = 'Libra';
    } 
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21 )){
      sign = 'Scorpio';
    } 
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21 )){
      sign = 'Sagittarius';
    } 
    else {
      sign = 'Capricorn';
    }
    return sign;
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //end of date time picker

  const [singupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({
      ...singupForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setSignupForm({
      ...singupForm,
      password,
    });
  };
  const onChangeTextName = (name) => {
    setSignupForm({
      ...singupForm,
      name,
    });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(singupForm.email, singupForm.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("Users")
            .doc(res.user.uid)
            .set({
              uid: res.user.uid,
              email: res.user.email,
              name: singupForm.name,
              date: date,
              sign: tellSign(date)
            })
            .then(() => {
              console.log("User successfully created!");
              // navigation.navigate("rootTabs", {
              //   screen: "horoscopeHome",
              //   params: { email: res.user.email },
              // });
              navigation.navigate('HoroscopeStack');
            })
            .catch((err) => {
              console.log(err);
              alert("Create account failed, Error:" + err.message);
            });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image source={require('../assets/images/logo.png')} style={styles.image}></Image>
      </View>
      <View style={styles.containerMiddle}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#71738C"
          autoCapitalize="none"
          onChangeText={onChangeTextEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#71738C"
          secureTextEntry
          onChangeText={onChangeTextPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#71738C"
          onChangeText={onChangeTextName}
        />
        <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={showDatepicker}>
          <Text style={styles.buttonTextOutline}>What's your Birthday?</Text>
        </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            textColor="#E8D6CA"
          />
        )}
        
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonTextOutline}>Go to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293766",
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerTop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center', 
    paddingTop: 100,
  },
  containerMiddle: {
    flex: 2,
    justifyContent: "center",
  },
  containerBottom: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#293766",
    borderBottomColor: "#E8D6CA",
    borderBottomWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    color: "#E8D6CA",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#E8D6CA",
    width: 300,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: '#293766',
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonOutline: {
    backgroundColor: "#293766",
    borderWidth: 1,
    borderColor: "#E8D6CA",
    width: 300,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginBottom: 10,
  },
  buttonTextOutline: {
    color: "#E8D6CA",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
});
