import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity, Image, Pressable, } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../Header';
import { journeyServices } from '../../services/Journey';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

export default JoinRideModal = ({ modalVisible, setModalVisible }) => {
    const [tripfrom, settripfrom] = useState('')
    const [tripTo, setTripTo] = useState('')
    const [defaultState, setDefaultState] = useState(true)
    const [loading, setloading] = useState(false)
    const [ratingData, setratingData] = useState([])

    const [data, setdata] = useState([])

    async function handleFind() {
        if (defaultState) {
            setDefaultState(false)
        }
        setloading(true)
        console.log('here', tripfrom, tripTo);
        try {
            const res = await journeyServices.getAllRide(tripfrom, tripTo)
            console.log(res.data);
            setdata(res.data)
            setloading(false)
        } catch (error) {
            console.log(error);
        }

    }

    const navigation = useNavigation()

    function handleNavigation(dataItem) {
        navigation.navigate('DoctorDetail', { tripfrom: tripfrom, tripTo: tripTo, data: dataItem })
        setModalVisible(!modalVisible);
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Header leftIconName header={'Join Ride'} titleMargin={40} isModal setModalVisible={setModalVisible} />
                </View>
                {/* Main Content */}
                <ScrollView style={styles.content}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ height: 70, backgroundColor: colorTheme.borderColor, width: 2, marginRight: 10 }} />
                        <View style={{ width: '90%' }}>
                            <Text style={[styles.smallText, { color: 'black' }]}>Trip From</Text>
                            <View style={[styles.textInput,]}>
                                <TextInput
                                    placeholder='From'
                                    onChangeText={(text) => settripfrom(text)}
                                    value={tripfrom}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 70, backgroundColor: colorTheme.borderColor, width: 2, marginRight: 10 }} />
                        <View style={{ width: '90%' }}>
                            <Text style={[styles.smallText, { color: 'black' }]}>Trip To</Text>
                            <View style={[styles.textInput,]}>
                                <TextInput
                                    placeholder='To'
                                    onChangeText={(text) => setTripTo(text)}
                                    value={tripTo}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleFind()}
                        style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50, width: 80, alignSelf: 'center', marginTop: 10 }}>
                        <Text numberOfLines={2} style={[styles.blueText, { color: "white", padding: 5, alignSelf: 'center' }]}>Find</Text>
                    </TouchableOpacity>

                    {defaultState && <>
                        <LottieView
                            source={require('../../assets/json/ecolottie/VehicleNotFound.json')}
                            autoPlay
                            loop
                            style={{ width: 300, height: 300 }}
                        />
                        <Text style={[styles.bigText, { fontSize: 25, textAlign: 'center' }]}>Find Your Travel Campanion !!!</Text>
                    </>}


                    {loading ?
                        <View style={{ alignSelf: 'center' }}>
                            <LottieView
                                source={require('../../assets/json/ecolottie/loaderimage.json')}
                                autoPlay
                                loop
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                        : <>
                            {data.length === 0 && !defaultState &&
                                <View style={{ alignSelf: 'center' }}>
                                    <LottieView
                                        source={require('../../assets/json/ecolottie/not-found.json')}
                                        autoPlay
                                        loop
                                        style={{ width: 300, height: 300 }}
                                    />
                                    <Text style={[styles.bigText, { fontSize: 25, textAlign: 'center' }]}>No Campanion Found </Text>
                                </View>
                            }
                            {
                                data.map((dat, index) => (
                                    <Pressable
                                        onPress={() => { handleNavigation(dat) }}
                                        key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderColor: colorTheme.borderColor, borderWidth: 1, elevation: 2, borderRadius: 20, padding: 5, marginTop: 10 }}>
                                        {dat.vehicletype === 'car' && <LottieView
                                            source={require('../../assets/json/ecolottie/carani.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 120, height: 120 }}
                                        />}
                                        {dat.vehicletype === 'bike' && <LottieView
                                            source={require('../../assets/json/ecolottie/bikeani.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 120, height: 120 }}
                                        />}
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <MaterialIcons name="location-on" color={'red'} size={30} />
                                                <Text style={[styles.bigText, { textTransform: 'capitalize' }]}>{dat.tripto}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>₹{dat.travelcost}</Text>
                                                <Text>{dat.vehicleNumber}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>{dat.vehicletype}</Text>
                                                <Text>{dat.seatavailable}/{dat.vehiclecapacity}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>{dat.date.length > 10 ? dat.date.substring(0, 10) : dat.date}</Text>
                                                <Text>{dat.time.length > 5 ? dat.time.substring(0, 5) : dat.time}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))
                            }
                        </>

                    }

                    {/* <TouchableOpacity
                        onPress={() => fetchDetails('MH02DR4101')}
                        style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50, width: 80, alignSelf: 'center', marginTop: 10 }}>
                        <Text numberOfLines={2} style={[styles.blueText, { color: "white", padding: 5, alignSelf: 'center' }]}>Test</Text>
                    </TouchableOpacity> */}
                </ScrollView>
                {/* Footer */}
                <View style={styles.footer}>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 5
    },
    content: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
        marginTop: 20
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
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
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colorTheme.borderColor
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
});

