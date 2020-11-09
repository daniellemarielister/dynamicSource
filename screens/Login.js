import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import firebase from "firebase";

const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChangeTextEmail = (email) => {
    setLoginForm({
      ...loginForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setLoginForm({
      ...loginForm,
      password,
    });
  };

  const loginHandler = () => {
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate("HoroscopeStack");
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
          value={loginForm.email}
          onChangeText={onChangeTextEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#71738C"
          value={loginForm.password}
          secureTextEntry
          onChangeText={onChangeTextPassword}
        />
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonTextOutline}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
