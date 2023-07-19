import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, Button } from 'react-native-paper';
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, I'm Aravind</Text>
      <Text style={styles.subtitle}>Welcome to my application</Text>
      <Button  mode="contained" style={styles.button} color="#ff8c00"
        onPress={() => navigation.navigate('InputPage')}>
        <Text>Check Your Password Strength</Text>
      </Button >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 64
  }
});


export default HomeScreen;