import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../firebase/firebaseConfig'; // Adjust path as needed



export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginHovered, setLoginHovered] = useState(false);
  const [isSignupHovered, setSignupHovered] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/signup'); // navigate to your main app screen
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert("Login Failed", err.message);
        console.error("Firebase Login Error:", err.message);
      } else {
        Alert.alert("Login Failed", "An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Pressable
        style={[styles.button, isLoginHovered && styles.buttonHover]}
        onPress={handleLogin}
        onHoverIn={() => setLoginHovered(true)}
        onHoverOut={() => setLoginHovered(false)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={[styles.secondaryButton, isSignupHovered && styles.secondaryButtonHover]}
        onPress={() => router.push('/signup')}
        onHoverIn={() => setSignupHovered(true)}
        onHoverOut={() => setSignupHovered(false)}
      >
        <Text style={styles.secondaryButtonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
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
  secondaryButton: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 999,
    backgroundColor: '#ccc',
  },
  secondaryButtonHover: {
    backgroundColor: '#b0b0ff',
  },
  secondaryButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
});
