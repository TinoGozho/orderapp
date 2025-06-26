import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // 

const restaurantList = ['Ocean Grill', 'Pasta Palace', 'Burger Bay'];

export default function SignupScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Waiter'); // must match picker values
  const [restaurant, setRestaurant] = useState(restaurantList[0]);

  const [isCreateHovered, setCreateHovered] = useState(false);
  const [isLoginHovered, setLoginHovered] = useState(false);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, you can update user profile with userType/restaurant here using Firebase User metadata or Firestore.

      Alert.alert('Success', `Signed up as ${userType} at ${restaurant}`);
      // Reset fields (optional)
      setEmail('');
      setPassword('');
      setUserType('Waiter');
      setRestaurant(restaurantList[0]);

      router.replace('../index'); // Navigate to main screen
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Text style={styles.label}>User Type</Text>
      <Picker
        selectedValue={userType}
        onValueChange={(itemValue) => setUserType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Waiter" value="Waiter" />
        <Picker.Item label="Chef" value="Chef" />
        <Picker.Item label="Manager" value="Manager" />
      </Picker>

      <Text style={styles.label}>Select Restaurant</Text>
      <Picker
        selectedValue={restaurant}
        onValueChange={(itemValue) => setRestaurant(itemValue)}
        style={styles.picker}
      >
        {restaurantList.map((name) => (
          <Picker.Item key={name} label={name} value={name} />
        ))}
      </Picker>

      <Pressable
        style={[styles.button, isCreateHovered && styles.buttonHover]}
        onPress={handleSignup}
        onHoverIn={() => setCreateHovered(true)}
        onHoverOut={() => setCreateHovered(false)}
        accessibilityRole="button"
        accessibilityLabel="Create account"
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Text style={styles.label}>Already have an account?</Text>
      <Pressable
        style={[styles.button, isLoginHovered && styles.buttonHover]}
        onPress={() => router.push('../index')}
        onHoverIn={() => setLoginHovered(true)}
        onHoverOut={() => setLoginHovered(false)}
        accessibilityRole="button"
        accessibilityLabel="Go to login"
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'blue',
  },
  label: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 999,
    color: 'blue',
  },
  picker: {
    borderWidth: 1,
    marginBottom: 12,
    width: '50%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 999,
    color: 'blue',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 999,
    backgroundColor: '#ccc',
  },
  buttonHover: {
    backgroundColor: '#b0b0ff',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
});
