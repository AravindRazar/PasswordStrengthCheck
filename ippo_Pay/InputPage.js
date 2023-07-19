import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Paragraph } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function InputPage() {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };


  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleButtonClick = () => {
    // Call the `minimumStepsToMakePasswordStrong` function here
    const requiredSteps = minimumStepsToMakePasswordStrong(password);
    setResponse(`Required Steps: ${requiredSteps}`);
  };

  
  const handleSaveClick = async () => {
    try {
      // Send a POST request to your backend server with the username and password
      await axios.post('/api/save', { username, password, response });

      // Display a success toast message
      Toast.show({
        type: 'success',
        text1: 'Record Saved',
        position: 'bottom',
      });
    } catch (error) {
      console.log('Save Error:', error);
      // Handle any error that occurred during the save process
      // You can display an error toast message or perform other actions
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleButtonClick} style={styles.button}>
        Check Password Strength
      </Button>
      <Button mode="contained" onPress={handleSaveClick} style={styles.button}>
        Save Record
      </Button>
      <Paragraph style={styles.response}>{response}</Paragraph>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    input: {
      width: '100%',
      marginBottom: 16,
    },
    button: {
      width: '100%',
      marginBottom: 16,
    },
    response: {
      fontSize: 18,
    },
  });

function minimumStepsToMakePasswordStrong(password) {
    let requiredSteps = 0;
    
    // Check password length
    if (password.length < 6) {
      requiredSteps = 6 - password.length;
    }
    
    // Check for missing character types
    const characterTypes = {
      lowerCase: /[a-z]/,   //lowercase
      upperCase: /[A-Z]/,    //uppercase 
      digit: /[0-9]/      //digits
    };
    
    let missingTypes = 0;
    //check for any values in characterTypes is missing in password
    for (const type of Object.values(characterTypes)) {
      if (!type.test(password)) {
        missingTypes++;
      }
    }
    
    //In some cases requiredSteps higher than missing types ie ex "aa1" has 
    //missing types count 1 but required steps is 3 and vice versa so we 
    //get the max.
    requiredSteps = Math.max(requiredSteps, missingTypes);
    
    // Check for consecutive characters
    const consecutiveCharsRegex = /(.)\1{2}/g;
    const consecutiveCharsCount = (password.match(consecutiveCharsRegex) || []).length;
    
    //Again check the same bw requiredSteps and consecutive chars
    requiredSteps = Math.max(requiredSteps, consecutiveCharsCount);
    return requiredSteps;
  } 