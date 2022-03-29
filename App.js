import React from 'react';
import { Text, View, Button } from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Authenticator } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';
//to duplicate a line use shift+alt+arrowdown
import SignUp from './src/components/SignUp';
import SignIn from './src/components/SignIn';
import ConfirmSignUp from './src/components/ConfirmSignUp';
import SignedIn from './src/components/SignedIn';
import ForgetPassword from './src/components/ForgetPassword';
import Display from './src/components/Display';
import { FormStyles } from './src/styles/FormStyles';

Amplify.configure(awsconfig);

console.disableYellowBox = true;

export default function App() {
  return (
    <View style={FormStyles.container}>
      <Authenticator
        usernameAttributes="email"
        hideDefault={true}
        authState="signIn"
        onStateChange={(authState) => console.log('authState ...', authState)}>
        <SignIn />
        <SignedIn />
        <Display />
        <SignUp />
        <ConfirmSignUp />
        <ForgetPassword />

      </Authenticator>
    </View>
  );
}
