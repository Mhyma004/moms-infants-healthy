import React from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import appStyles from './AppStyles';
import Button from "./Button";





export default class SignUpInfo extends React.Component {

    state = {fullName: '', dob: ''};

    setFullName = (fullName) => {
        this.setState({fullName: fullName});
        AsyncStorage.setItem('name', fullName);
    };

    setDob = (dob) => {
        this.setState({dob: dob})
        AsyncStorage.setItem('dob', dob);
    };

    onPress = () => {
        if (!this.state.fullName || !this.state.dob) {
            alert(this.props.getLocalizedText("fillOutAllFields"))
        } else if (!this.isValidDate(this.state.dob)){
            alert(this.props.getLocalizedText("invalidDate"))
        } else {
            this.props.setUserInfo({fullName: this.state.fullName, dob: this.state.dob});
            this.props.getNextScreen();
        }
    };

    isValidDate = (date) => {
        let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
        return regex.test(date);
    };

    componentDidMount() {
        AsyncStorage.getItem('name').then((value) => {
          if (value !== null && value !== ''){
          // saved input is available
          this.setState({ fullName: value }); // Note: update state with last entered value
        }
        }).done();
        AsyncStorage.getItem('dob').then((value) => {
            if (value !== null && value !== ''){
            // saved input is available
            this.setState({ dob: value }); // Note: update state with last entered value
          }
          }).done();
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        let titleText = this.state.fullName ? this.props.getLocalizedText("cool") : this.props.getLocalizedText("greatToMeetYou");
        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>
                            {titleText}
            
                            <Text style={appStyles.titlePink}>
                                {this.state.fullName ? this.state.fullName.split(' ')[0] : ''}
                            </Text>
                            
                        </Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            <View style={appStyles.TextInput.View}>
                                <TextBox placeholder={this.props.getLocalizedText("fullName")} onChangeText={this.setFullName} value= {this.state.fullName} style={appStyles.TextInput.TextInput}/>
                            </View>
                            <TextInputMask 
                                placeholder={this.props.getLocalizedText("dob")} 
                                type={'datetime'}
                                options={{
                                  format: 'MM/DD/YYYY',
                                  validator: function(value, settings) {
                                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
                                    return regex.test(value);
                                  }  //This validator function is read by isValid(), still to be used
                                  
                                }} 
                                style={appStyles.TextInputMask}
                                value={this.state.dob}
                                onChangeText = {this.setDob}
                                ref={(ref) => this.motherDOB = ref}
                                />
                            
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'
                    }}>
                        <Button text={this.props.getLocalizedText("continueButton")} onPress={this.onPress}/>
                    </View>
            </TouchableOpacity>
        );
    }
}
