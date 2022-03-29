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

import { validateEmail } from '../validation';
import { FormStyles } from '../styles/FormStyles';

export default function ConfirmSignUp(props) {

    const [state, setState] = useState({ email: '', confirmationCode: '' });

    const [error, setErrors] = useState({ email: '' });

    async function onSubmit() {
        const { email: username, confirmationCode: code } = state;
        const emailError = validateEmail(state.email);
        if (emailError) setErrors({ email: emailError });
        else {
            try {
                const user = await Auth.confirmSignUp(username, code);
                Alert.alert("Sign Up Successful");
                setState({ confirmationCode: '' });
                props.onStateChange('signIn');
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    }

    if (props.authState === 'confirmSignUp')
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.headertext}>Confirm Sign Up</Text>
                <Text >Email</Text>

                <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) =>
                        setState({ ...state, email: text.toLowerCase() })
                    }
                    placeholder="Enter email"
                    value={state.email}
                />
                <Text style={FormStyles.errortxt}>{error.email}</Text>
                <Text>Confirmation Code</Text>

                <TextInput style={FormStyles.input}
                    onChangeText={(text) => setState({ ...state, confirmationCode: text })}
                    placeholder="Enter confirmation code"
                    value={state.confirmationCode}
                />

                <Button
                    onPress={() => onSubmit()}
                    title="confirm Sign Up"
                    color="black"
                    accessibilityLabel="confirmSignUp"
                />

                <View style={FormStyles.links}>

                    <TouchableOpacity style={FormStyles.button}
                        onPress={() => {
                            props.onStateChange('signIn', {});
                            setState({ email: '', confirmationCode: ''});
                        } }>                       
                        <Text style={FormStyles.btnText}>Back to Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={FormStyles.button}
                        onPress={() => {
                            props.onStateChange('signUp', {});
                            setState({ email: '', confirmationCode: '' });
                        }}>
                        <Text style={FormStyles.btnText}>Back to Sign Up</Text>
                    </TouchableOpacity>



                </View>
            </View >
        );
    else return <></>;
}


