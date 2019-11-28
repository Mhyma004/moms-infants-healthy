import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback,
    Keyboard, Image, StyleSheet, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import axios from 'axios';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import { ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
import Helpers from '../components/Helpers';
import { AsyncStorage } from 'react-native';
import Translator from '../components/Translator';

 //url for functions 
 const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';


const SignIn = props => {

    const lang = props.navigation.getParam('language')

    const [phoneNumber, setphoneNumber] = useState('');
    const [code, setCode] = useState('');

    let profile = {
        'Name': '',
        'MiddleName': '',
        'LastName': '',
        'BirthDate': '',
        'PhoneNumber': '',
        'PregnantMonths': '',
        'ChildAge': '',
        'notifications': '',
        'Image': '',
        'Language': ''
    };


    const signInHandler = async () => {

        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone: phoneNumber, code: code });

            console.log(data.token);

            //store the token so user no longer needs to log in
            await AsyncStorage.setItem('token', data.token);
            let result = await AsyncStorage.getItem('token')

            console.log(result);

            // if (result != null){
            //     props.onTapSignIn()
            // }

            //authenticates into firebase
            firebase.auth().signInWithCustomToken(data.token);

            //go to the landing page
            props.navigation.navigate('mainFlow')
            // props.onTapSignIn();

        } catch (error) {
            console.log(error);
            if (error.response.data.error != null) {
                errorMessage = error.response.data.error
                //TODO find a way to translate this
                Alert.alert('Error', errorMessage,
                    [
                        { text: 'Try again' },
                    ],
                    { cancelable: false });
            }
            return;
        }
        console.log(profile['PhoneNumber'])
        // //send all the user data to our database
        // firebase.database().ref('users' + profile['PhoneNumber']).set({
        //     //user data
        //     fistN: profile['Name'],
        //     middleN: profile['MiddleName'],
        //     lastN: profile['LastName'],
        //     dob: profile['BirthDate'],
        //     phone: profile['PhoneNumber'],
        //     pregnant: profile['PregnantMonths'],
        //     childAge: profile['ChildAge'],
        //     notifications: profile['notifications'],
        //     image: profile['Image'],
        //     language: profile['Language']
        // }).then(() => {
        //     console.log("Data sent to the db");
        // }).catch((error) => {
        //     console.log(error);
        // })

    }


    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>

                <Image
                    source={require('../assets/images/mom-and-baby-icon.png')}
                    style={styles.profileIcon}
                />

                <View style={styles.box}>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            style={styles.textInput}
                            placeholder='888-888-8888'
                            onChangeText={setphoneNumber}
                            value={phoneNumber}
                            autoCompleteType={'tel'} //where is this???
                            keyboardType='number-pad'
                            leftIcon={
                                <Icon style={styles.iconStyle}
                                    name='mobile'
                                    size={24}
                                    color='lightgrey'
                                />}
                            inputContainerStyle='none'
                            containerStyle='none'
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            style={styles.textInput}
                            placeholder= {Helpers('code', lang)}
                            onChangeText={setCode}
                            value={code}
                            secureTextEntry
                            keyboardType='number-pad'
                            leftIcon={
                                <Icon style={styles.iconStyle}
                                    name='lock'
                                    size={24}
                                    color='lightgrey'
                                />}
                        />
                    </View>
                </View>

                <TouchableHighlight
                    style={styles.signInButton}
                    onPress={() => signInHandler()}
                    underlayColor={Colors.hoverColor} >
                    <Translator style={styles.labelText} loadText={('Sign In!')} loadLanguage= {lang} />
                </TouchableHighlight>

                <View style={styles.seperator}>
                    <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => props.navigation.navigate('Signup', {language: lang} )}>
                    <Translator style={styles.labelText} loadText={('New mom? Sign Up!')} loadLanguage = {lang} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 200,
    },
    box: {
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        width: '80%',
        height: '20%'
    },
    labelText: {
        fontSize: 15,
        color: Colors.fontColor,
    },
    textInput: {
        fontSize: 20,
        width: '80%',
    },
    profileIcon: {
        marginBottom: 40,
        marginTop: '40%'
    },
    signInButton: {
        marginTop: 100,
        padding: 10,
        backgroundColor: Colors.buttonColor,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    seperator: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        bottom: -50
    },
    iconStyle: {
        paddingRight: 18
    },
    textSignIn: {
        fontSize: 18,
        color: 'black',
    }
});

export default SignIn;