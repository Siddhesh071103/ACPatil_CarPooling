import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import { journeyServices } from '../../services/Journey'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown';

export default function AddTaskModal({ modalVisible, setModalVisible }) {
    const [tripFrom, setTripFrom] = useState('')
    const [tripTo, setTripTo] = useState('')
    const [tripDesc, setTripDesc] = useState('')
    const [VehicleNumber, setVehicleNumber] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [typeOfVehicle, setTypeOfVehicle] = useState('')

    const [dateData, setdateData] = useState(new Date())
    const [show, setshow] = useState(false)
    const [text, setText] = useState('')

    const [timeData, setTimeData] = useState(new Date())
    const [showTime, setshowTime] = useState(false)
    const [timeText, setTimeText] = useState('')

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || dateData;
        setdateData(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
        setText(fDate)
        setshow(false)
    }

    function onChangeTime(event, selectedDate) {
        const currentTime = selectedDate || timeData;
        setTimeData(currentTime);

        let tempTime = new Date(currentTime);
        let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
        setTimeText(fTime)
        setshowTime(false)
        console.log('time---->', fTime);
    }


    function hancleSubmit() {
        // BlogServices.PostTask(task,Slider[1])
        journeyServices.bookRide(tripFrom, tripTo, typeOfVehicle, parseInt(vehicleCapacity), VehicleNumber, text, timeText)
        setModalVisible(!modalVisible)
    }

    function convertTripfrom(addr) {
        journeyServices.FetchLatLong(addr).then((response => {
            console.log(response.data.features[0].geometry.coordinates[0]);
            // setTripFrom(`${response.data.features[0].geometry.coordinates[0]},${response.data.features[0].geometry.coordinates[1]},`)
        }))
    }

    function convertTripTo(addr) {
        console.log('inside tripto');
        journeyServices.FetchLatLong(addr).then((response => {
            console.log(response.data.features[0].geometry.coordinates);
            // setTripTo(response.data.features[0].geometry.coordinates)
        }))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            {show && (
                <DateTimePicker
                    testId='dateTimePicker1'
                    value={dateData}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {showTime && (
                <DateTimePicker
                    testId='dateTimePicker2'
                    value={timeData}
                    mode={'time'}
                    // is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                />
            )}
            <View style={styles.container}>
                <ScrollView style={styles.subContainer}>
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{ marginRight: 10 }} />
                        <Text style={styles.bigText}>Add Your Journey Details</Text>
                    </Pressable>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Trip From</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Kandivali...'
                                onChangeText={(text) => setTripFrom(text)}
                                value={tripFrom}

                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Trip To</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Malad...'
                                onChangeText={(text) => setTripTo(text)}
                                value={tripTo}
                            // onKeyPress={(e)=>{handleOnKeyPress(e,tripTo)}}
                            // onSubmitEditing={()=>convertTripTo(tripTo)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Ride Description</Text>
                        <View style={[styles.textInput, { height: 100 }]}>
                            <TextInput
                                placeholder='The Ride ...'
                                onChangeText={(text) => setTripDesc(text)}
                                value={tripDesc}
                                numberOfLines={3}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Vehicle Number</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Enter Vehicle Number'
                                onChangeText={(text) => setVehicleNumber(text)}
                                value={VehicleNumber}

                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Type of vehicle</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Car,Bike,etc..'
                                onChangeText={(text) => setTypeOfVehicle(text)}
                                value={typeOfVehicle}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Vehicle Capacity</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='3 or 4'
                                onChangeText={(text) => setVehicleCapacity(text)}
                                value={vehicleCapacity}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Date</Text>
                        <TouchableOpacity
                            onPress={() => { setshow(true) }}
                            style={{ borderRadius: 10, borderWidth: 1, height: 50, borderColor: colorTheme.borderColor, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ marginLeft: 5 }}>{text === '' ? 'Enter Date' : text}</Text>
                            <MaterialIcons name="date-range" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Journey Time</Text>
                        <TouchableOpacity
                            onPress={() => { setshowTime(true) }}
                            style={{ borderRadius: 10, borderWidth: 1, height: 50, borderColor: colorTheme.borderColor, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 5 }}>{text === '' ? 'Enter Time' : text}</Text>
                            <MaterialIcons name="watch-later" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                    {/* <Text onPress={convertAddresstocorr('Sakinaka')}>click here</Text> */}
                </ScrollView>
                <View style={{
                    width: "100%",
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 1,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"

                }}>
                    <TouchableOpacity
                        style={{ width: "90%", backgroundColor: colorTheme.primaryColor, height: 40, borderRadius: 50, justifyContent: "center" }}
                        onPress={() => hancleSubmit()}
                    >
                        <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center"
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 0,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
})