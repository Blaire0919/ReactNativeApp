import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity, Alert, FlatList,
    ScrollView,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { FormStyles } from '../styles/FormStyles';
import { DataStore } from '@aws-amplify/datastore';
import { Transaction } from '../models/index';

export default function Display(props) {

    const initialState = {
        item: "",
        price: 0.00,
        qty: 0,
        totalprice: 0.00,
        sellername: "",
        sellercontacts: ""
    };


    const [formState, updateFormState] = useState({});
    const [transactions, updateTransactions] = useState({});
    const [showPicker, updateShowPicker] = useState(false);

    useEffect(() => {
        try {
            fetchTransactions();
            const subscription = DataStore.observe(Transaction).subscribe(() => fetchTransactions());
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log(error.message);
        }
    });

    async function fetchTransactions() {
        try {
            const transactions = await DataStore.query(Transaction);
            updateTransactions(transactions);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function onSubmit() {
        try {
            await Auth.signOut();
            props.onStateChange('signIn');
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    async function createTransaction() {
        try {
            formState.price = parseFloat(formState.price);
            formState.qty = parseInt(formState.qty);
            formState.totalprice = formState.price * formState.qty;

            await DataStore.save(new Transaction({ ...formState }));
            console.log(
                formState.item,
                formState.price,
                formState.qty,
                formState.totalprice,
                formState.sellername,
                formState.sellercontacts);
            updateFormState(initialState);
            Alert.alert("GUMAGANA");

        } catch (error) {
            console.log(error.message);
        }
    }

    async function onDisplay() {
        try {
            const models = await DataStore.query(Transaction);
            console.log("GUMAGANA \n" + models);
        } catch (error) {
            Alert.alert("HINDI GUMAGANA \n" + error.message);
        }
    }


    if (props.authState === 'display')
        return (
            <View style={FormStyles.home}>
                <ScrollView style={FormStyles.scrollView}>

                    <TouchableOpacity style={FormStyles.btnSignOut}
                        onPress={() => { onSubmit() }}>
                        <Text style={FormStyles.txtSignOut}>Sign Out</Text>
                    </TouchableOpacity>

                    <Text style={FormStyles.headertext} >Transaction Board</Text>

                    <Text> Item Name </Text>
                    <TextInput
                        style={FormStyles.input}
                        onChangeText={(text) =>
                            updateFormState({ ...formState, item: text })}
                        placeholder="Enter item name"
                        value={formState.item}
                    />

                    <Text> Price </Text>
                    <TextInput
                        style={FormStyles.input}
                        onChangeText={(number) =>
                            updateFormState({ ...formState, price: number })}
                        placeholder="Enter price"
                        keyboardType="number-pad"
                        value={formState.price}
                    />

                    <Text> Quantity </Text>
                    <TextInput
                        style={FormStyles.input}
                        onChangeText={(number) =>
                            updateFormState({ ...formState, qty: number })
                        }
                        placeholder="Enter quantity"
                        keyboardType="number-pad"
                        value={formState.qty}
                    />

                    <Text> Seller Name  </Text>
                    <TextInput
                        style={FormStyles.input}
                        onChangeText={(text) =>
                            updateFormState({ ...formState, sellername: text })}
                        placeholder="Enter seller name"
                        value={formState.sellername}
                    />

                    <Text> Seller Contacts </Text>
                    <TextInput
                        style={FormStyles.input}
                        onChangeText={(text) =>
                            updateFormState({ ...formState, sellercontacts: text })}
                        placeholder="Enter seller contacts"
                        value={formState.sellercontacts}
                    />

                    <View style={FormStyles.links}>
                        <Button onPress={() => createTransaction()}
                            title="Create Transaction"
                            color="green"
                            accessibilityLabel="create"
                        />

                        <Button onPress={() => onDisplay()}
                            title="Display"
                            color="black"
                            accessibilityLabel="display"
                        />
                    </View>

                    <Text>Transaction Log</Text>

                    {transactions.map(row => (
                        <View>
                            <Text>{row.id} </Text>
                            <Text>{formState.item}</Text>
                            <Text>{formState.price}</Text>
                            <Text>{formState.qty}</Text>
                            <Text>{formState.totalprice}</Text>
                            <Text>{formState.sellername} </Text>
                            <Text>{formState.sellercontacts}</Text>

                        </View>
                    ))}

                </ScrollView>
            </View >
        );
    else return <></>;
}