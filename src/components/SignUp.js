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
import { validateEmail, validatePassword } from '../validation';
import { FormStyles } from '../styles/FormStyles';

export default function SignUp(props) {

    const [state, setState] = useState({ email: '', password: '' });
    const [error, setErrors] = useState({ email: '', password: '' });

    async function onSubmit() {
        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);
        if (emailError || passwordError)
            setErrors({ email: emailError, password: passwordError });
        else {
            try {
                const user = await Auth.signUp({
                    username: state.email, password: state.password,
                });
                Alert.alert("create user successfully!");
                props.onStateChange('confirmSignUp', user);
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    }

    if (props.authState === 'signUp')
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.headertext}>Sign Up</Text>

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
                    title="Create Account"
                    color="black"
                    accessibilityLabel="signUp"
                />

                <View style={FormStyles.links}>
                    <TouchableOpacity style={FormStyles.button}
                        onPress={() => {
                            props.onStateChange('signIn', {});
                            setState({ email: '', password: '' });
                        }}>

                        <Text style={FormStyles.btnText}>Back to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    else return <></>;

}

