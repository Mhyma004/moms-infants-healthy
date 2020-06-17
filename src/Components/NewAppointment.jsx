import {
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  AsyncStorage,
} from "react-native";
import React, { useState } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default function NewAppointment(props) {
  appointment = [
    ([name, setName] = useState(null)),
    ([address, setAddress] = useState(null)),
    ([date, setDate] = useState(null)),
    ([time, setTime] = useState(null)),
    ([reason, setReason] = useState(null)),
  ];

  onPress = () => {
    if (!name || !address || !date || !time) {
      alert(props.getLocalizedText("fillOutAllFields"));
    } else {
      alert(name);
      //props.setLowerPanelContent("Appointment");
    }
  };

  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      accessible={false}
      style={appStyles.container}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <View>
          <View style={appStyles.TextInput.View}>
            <TextBox
              placeholder={props.getLocalizedText("appointmentName")}
              onChangeText={setName}
              value={name}
              style={appStyles.TextInput.TextInput}
            />
          </View>
          <View style={appStyles.TextInput.View}>
            <TextBox
              placeholder={props.getLocalizedText("appointmentAddress")}
              onChangeText={setAddress}
              value={address}
              style={appStyles.TextInput.TextInput}
            />
          </View>
          <View style={appStyles.TextInput.View}>
            <TextBox
              placeholder={props.getLocalizedText("appointmentDate")}
              onChangeText={setDate}
              value={date}
              style={appStyles.TextInput.TextInput}
            />
          </View>
          <View style={appStyles.TextInput.View}>
            <TextBox
              placeholder={props.getLocalizedText("appointmentTime")}
              onChangeText={setTime}
              value={time}
              style={appStyles.TextInput.TextInput}
            />
          </View>
          <View style={appStyles.TextInput.View}>
            <TextBox
              placeholder={props.getLocalizedText("appointmentReason")}
              onChangeText={setReason}
              value={reason}
              style={appStyles.TextInput.TextInput}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "12%",
        }}
      >
        <Button
          text={props.getLocalizedText("continueButton")}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
}
