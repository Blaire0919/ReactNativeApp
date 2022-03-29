import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button, TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    Image,
} from 'react-native';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { FormStyles } from '../styles/FormStyles';
import { DataStore, syncExpression } from '@aws-amplify/datastore';
import { launchImageLibrary } from 'react-native-image-picker';
import { Transaction } from '../models/index';
import Video from 'react-native-video';

DataStore.configure({
    syncExpressions: [
        syncExpression(Transaction, () => {
            return post => post.status('eq', 'active');
        }),
    ]
});

const initialState = {
    item: '',
    price: 0.00,
    qty: 0,
    totalprice: 0.00,
    sellername: '',
    sellercontacts: '',
    status: 'active',
    image: '',
};

const trans_id = { transId: '', stats: '', };
const imgurl = { url: '' };

export default function SignedIn(props) {
    const [formState, updateFormState] = useState({});
    const [product, setTransact] = useState({});

    //for search filter state
    const [fdata, setFiltered] = useState({});
    const [text, setSearched] = useState();

    //for image and video
    const [asset, setAsset] = useState(null);
    const [progressText, setProgressText] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const sfilter = text => {
        if (text) {
            const data = product.filter(prod => {
                const prodName = prod.prodname ? prod.prodname.toUpperCase() : '';
                const txtsearch = text.toUpperCase();
                console.log(prodName);
                return prodName.indexOf(txtsearch) > -1;
            });
            setFiltered(data);
            setSearched(text);
        } else {
            setFiltered(product);
            setSearched(text);
        }
    };

    async function onSignOut() {
        try {
            await Auth.signOut();
            props.onStateChange('signIn');
        } catch (error) {
            Alert.alert(error.message);
        }
    }


    async function onDisplay() {
        try {
            const res = await DataStore.query(Transaction, stats =>
                stats.status('eq', 'active'),
            );
            await DataStore.configure({
                syncExpressions: [
                    syncExpression(Transaction, () => {
                        return post => post.status('eq', 'active');
                    }),]
            });
            setTransact(res);
        } catch (error) {
            Alert.alert("HINDI GUMAGANA \n" + error.message);
        }
    }

    async function onDelete() {
        const updatestats = await DataStore.query(Transaction, trans_id.transId);
        try {
            await DataStore.save(Transaction.copyOf(updatestats, update => {
                update.Status = 'inactive';
            })
            );
            console.log(trans_id.transId);
            Alert.alert("Delete", "Delete Successful!",
                [{
                    text: "Cancel", onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => DataStore.configure({
                        syncExpressions: [syncExpression(Transaction, () => {
                            return post => post.Status('eq', 'active')
                        }),
                        ]
                    }),
                }]);
            updateFormState(initialState);
        } catch (error) { console.log(error.message); }
    }

    async function createTransaction() {
        try {
            formState.price = parseFloat(formState.price);
            formState.qty = parseInt(formState.qty);
            formState.totalprice = formState.price * formState.qty;
            formState.status = 'active';
            console.log('dumaan sa create transaction');
            await DataStore.save(new Transaction({
                prodname: formState.item,
                price: formState.price,
                qty: formState.qty,
                totalprice: formState.totalprice,
                sellername: formState.sellername,
                sellercontacts: formState.sellercontacts,
                status: formState.status,
                image: imgurl.url,
            }));

            await DataStore.configure({
                syncExpressions: [syncExpression(Transaction, () => {
                    return post => post.status('eq', 'active');
                }),]
            });
            Alert.alert("Successful", "Transaction created successfully!",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }]);
            updateFormState(initialState);
        } catch (error) {
            console.log(error.message);
        }
    }

    const selectimg = async () => {
        await launchImageLibrary({ mediaType: 'mixed' }, result => {
            if (!result.assets) {
                Alert.alert(result.errorMessage);
                return;
            }
            setAsset(result.assets[0]);
            console.log('ASSET: ');
            console.log(result.assets[0]);

        });
    };

    const fetchResourceFromURI = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log('dumaan sa fetchResourcefrom URI');
        return blob;
    };

    const uploadResource = async () => {
        if (isLoading) return;
        setisLoading(true);
        const img = await fetchResourceFromURI(asset.uri);
        imgurl.url = asset.uri;
        return Storage.put(asset.fileName, img, {
            level: 'public',
            contentType: asset.type,
            progressCallback(uploadProgress) {
                setProgressText(
                    `Progress: ${Math.round(
                        (uploadProgress.loaded / uploadProgress.total) * 100,
                    )} %`,
                );
                console.log(
                    `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
                );
            },
        })
            .then(res => {
                setProgressText('Upload Done: 100%');
                setAsset(null);
                setisLoading(false);
                Storage.get(res.key)
                    .then(result =>
                        console.log("RESULTA: " + result),
                createTransaction())
            .catch(err => {
                setProgressText('Upload Error');
                console.log(err);
            });
    })
            .catch (err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log(err);
    });
};

if (props.authState === 'signedIn')
    return (
        onDisplay(),
        <View style={FormStyles.home}>
            <TouchableOpacity style={FormStyles.btnSignOut} onPress={() => { onSignOut() }}>
                <Text style={FormStyles.txtSignOut}>Sign Out</Text>
            </TouchableOpacity>

            <ScrollView style={FormStyles.scrollView}>

                <Text style={FormStyles.headertext} >Transaction Board</Text>
                <Text> Item Name </Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) => updateFormState({ ...formState, item: text })}
                    placeholder="Enter item name"
                    value={formState.item}
                />
                <Text> Price </Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(number) => updateFormState({ ...formState, price: number })}
                    placeholder="Enter price:"
                    keyboardType="number-pad"
                    value={formState.price}
                />
                <Text> Quantity </Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(number) => updateFormState({ ...formState, qty: number })
                    }
                    placeholder="Enter quantity:"
                    keyboardType="number-pad"
                    value={formState.qty}
                />
                <Text> Seller Name  </Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) => updateFormState({ ...formState, sellername: text })}
                    placeholder="Enter seller name:"
                    value={formState.sellername}
                />
                <Text> Seller Contacts </Text>
                <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) => updateFormState({ ...formState, sellercontacts: text })}
                    placeholder="Enter seller contacts:"
                    value={formState.sellercontacts}
                />

                <View style={FormStyles.cont}>
                    <TouchableOpacity onPress={selectimg}>
                        <Text style={FormStyles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
                    </TouchableOpacity>
                    {asset ? (
                        asset.type.split('/')[0] === 'image' ? (
                            <Image
                                style={FormStyles.selectedImage}
                                source={{ uri: asset?.uri ?? '' }}
                            />
                        ) : (
                            <Video
                                style={FormStyles.selectedImage}
                                source={{ uri: asset?.uri ?? '' }}
                            />
                        )
                    ) : null}
                    {asset && (
                        <>
                            <TouchableOpacity onPress={() => setAsset(null)}>
                                <Text style={FormStyles.btncancel}>Remove Selected Image</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={{ marginBottom: 20, }} />

                <View style={FormStyles.links}>
                    <Button onPress={() => uploadResource()}
                        title="Create Transaction"
                        color="green"
                        accessibilityLabel="create"
                    />
                </View>

                <Text>{progressText}</Text>

                <View style={{ marginBottom: 50, }} />

                <View style={{
                    borderRadius: 8, borderWidth: 1,
                    borderColor: 'black', padding: 10,
                }}>
                    <Text style={FormStyles.headertext} >Transaction Log</Text>

                    <View style={{ marginBottom: 10, }} />

                    <View style={FormStyles.links}>
                        <Text style={{ textAlignVertical: 'center', }}> Search </Text>
                        <TextInput
                            style={FormStyles.search}
                            placeholder="Search..."
                            onChangeText={text => sfilter(text)}
                        />

                    </View>

                    <View style={{ marginBottom: 10, }} />

                    <FlatList
                        data={fdata}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                keyExtractor={item => item.id}
                                onPress={() => {
                                    trans_id.transId = item.id;
                                    trans_id.stats = item.status;
                                    Alert.alert("Transaction Log",
                                        'Product: ' + item.prodname + '\nPrice: ' + item.price
                                        + '\nQty:' + item.qty + '\nTotal Price: ' + item.totalprice
                                        + '\n\nSeller:' + item.sellername
                                        + '\nContact: ' + item.sellercontacts,
                                        [{
                                            text: "Delete", onPress: () => onDelete(), style: "delete"
                                        },
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ])
                                }}>

                                <View style={{ backgroundColor: 'gray', marginTop: 10, borderColor: "black", borderRadius: 10, borderWidth: 1, padding: 10 }}>
                                    <Image
                                        style={FormStyles.selectedImage}
                                        source={{uri:item.image}}
                                    />
                                    <Text>Product Name: {item.prodname}</Text>
                                    <Text>Price: {item.price}</Text>
                                    <Text>Quantity: {item.qty}</Text>
                                    <Text style={{ marginBottom: 5 }} >
                                        Total: {item.totalprice}</Text>
                                    <Text>Seller: {item.sellername}</Text>
                                    <Text>Contact No.: {item.sellercontacts}</Text>
                                </View>

                            </TouchableHighlight>
                        )}
                    />
                </View>
            </ScrollView >
        </View >
    );
else return <></>;
}