import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import { Auth } from 'aws-amplify';

import { FormStyles } from '../styles/FormStyles';

export default function SignIn(props) {

    const [state, setState] = useState({ email: '', password: '' });
    const [error, setErrors] = useState({ email: '', password: '' });

    async function onSubmit() {
        try {
            const user = await Auth.signIn({
                username: state.email, password: state.password
            });
            Alert.alert("Sign In successfully!");
            props.onStateChange('signedIn');
            setState({ email:'', password:'' });
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    if (props.authState === 'signIn')
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.headertext}>Sign in to your account</Text>

                <Text >Email</Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) =>
                        setState({ ...state, email: text.toLowerCase() })}
                    placeholder="Enter email"
                    value={state.email}
                />
                <Text style={FormStyles.errortxt}>{error.email}</Text>

                <Text>Password</Text>
                <TextInput style={FormStyles.input}
                    onChangeText={(text) => setState({ ...state, password: text })}
                    placeholder="Enter password"
                    value={state.password}
                    secureTextEntry={true}
                />
                <Text style={FormStyles.errortxt}>{error.password}</Text>

                <Button
                    onPress={() => onSubmit()}
                    title="Sign In"
                    color="black"
                    accessibilityLabel="signIn"
                />

                <View style={FormStyles.links}>

                    <TouchableOpacity style={FormStyles.button}
                        onPress={() => {
                            props.onStateChange('forgetPassword');
                            setState({ email: '', password: '' });
                        }}>

                        <Text style={FormStyles.btnText}>forget Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={FormStyles.button}
                        onPress={() => {
                            props.onStateChange('signUp');
                            setState({ email: '', password: '' });
                        }}>
                        <Text style={FormStyles.btnText}>SignUp </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    else return <></>;
}