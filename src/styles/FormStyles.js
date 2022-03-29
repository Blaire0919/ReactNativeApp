import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const FormStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: windowWidth,
        justifyContent: 'center',
        padding: 10,

    },
    headertext: {
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 1,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 10,
    },
    errortxt: {
        color: 'red',
        fontSize: 10,
        marginBottom: 20,
        padding: 5,
    },
    btnText: {
        textTransform: 'uppercase',
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: 'lightgray',
        borderRadius: 8,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    home: {
        flex: 1,
        height: '100%',
        width: windowWidth,
        justifyContent: 'center',
        padding: 10,
    },
    btnSignOut: {
        alignItems: "flex-end",
        backgroundColor: "white",
        padding: 1,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 10,
    },
    txtSignOut: {
        textTransform: 'uppercase',
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    item: {
        padding: 20,
        fontSize: 15,
        marginTop: 5,
        color: "black",
    },
    search: {
        height: 40,
        width: 215,
        borderWidth: 1,
        padding: 10,
        borderColor: 'lightgray',
        borderRadius: 8,
    },
    btnfile: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: 'blue',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      btncancel: {
        backgroundColor: '#fff',
        color: 'blue',
      },
      selectedImage: {
        width: 100,
        height: 100,
        marginTop: 10,
      },
      cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },


});
