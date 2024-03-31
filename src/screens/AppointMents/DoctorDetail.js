import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UnderLine from '../../components/UnderLine'
import DoctorRenameCard from '../../components/DoctorRenameCard'
import { journeyServices } from '../../services/Journey'
import LiveLocationModal from '../../components/Modal/LiveLocationModal'
import ReviewScreen from '../../components/Modal/ReviewModal'

export default function DoctorDetail({ navigation, route }) {
    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [search, setSearch] = useState('')
    const [textShown, setTextShown] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [lengthMore, setLengthMore] = useState(false)
    const [loading, setloading] = useState(true)
    const [tripFrom, setTripFrom] = useState([])
    const [tripTo, setTripTo] = useState([])
    const [reviewModal, setreviewModal] = useState(false)
    const [data, setdata] = useState(route.params.data)
    const [dataRating, setdataRating] = useState([])
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }
    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4)
    }, [])



    // function fetchDetails() {
    //     console.log(route.params.address);

    //     journeyServices.FetchRtoDetails(route.params.address).then(res => {
    //         console.log(res.data.pageProps.rcDetailsResponse.errors);
    //         console.log(res.data.pageProps.rcDetailsResponse.data.webSections[0].message.title)
    //         setdriverDetails({ ...driverDetails, carImage: res.data.pageProps.rcDetailsResponse.data.webSections[0].imageUrl, driverName: res.data.pageProps.rcDetailsResponse.data.webSections[0].message.title, vehicleName: res.data.pageProps.rcDetailsResponse.data.webSections[0].message.subtitle })
    //         setloading(false)
    //     })
    // }

    useEffect(() => {
        async function fetchLat(params) {
            journeyServices.FetchLatLong(data.tripfrom).then(res => {
                setTripFrom(res.data.features[0].geometry.coordinates)
            })

            journeyServices.FetchLatLong(data.tripto).then(res => {
                setTripTo(res.data.features[0].geometry.coordinates)
            })
        }

        async function fetchRating(params) {
            setloading(true)
            journeyServices.GetRating(data.user).then(res => {
                console.log('rating-->', res.data);
                setdataRating(res.data)
                setloading(false)
            });
        }
        fetchLat()
        fetchRating()
    }, [])

    return (
        <View style={styles.container}>
            {modalVisible
                ?
                <LiveLocationModal modalVisible={modalVisible} setModalVisible={setModalVisible} tripFromLoc={tripFrom} TripToLoc={tripTo} />
                : null
            }
            {reviewModal
                ?
                <ReviewScreen modalVisible={reviewModal} setModalVisible={setreviewModal} rideId={data._id} driverId={data.user} />
                : null
            }
            <ScrollView >
                <View style={[styles.subContainer, { marginTop: 2, marginBottom: 10 }]}>
                    <Header header={"Journey Details"} leftIconName={"chevron-back"} rightIconName={"share-social-outline"} />
                </View>
                <View style={{ padding: 10, marginTop: 10, borderWidth: 1, width: '95%', alignSelf: 'center', borderRadius: 10, backgroundColor: 'white', elevation: 2, borderColor: colorTheme.borderColor }}>
                    <View style={{ margin: 15, flexDirection: "row", height: 100, justifyContent: 'center', alignItems: "center", }}>
                        <Image source={require('../../assets/img/car.jpg')} resizeMode='contain' style={styles.image} />
                        <View style={{ width: "60%", marginLeft: 16, height: 100, }}>
                            <Text style={styles.bigText}>Ride from {data.tripfrom} to {data.tripto}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.smallText, { marginTop: 1 }]}>Vehicle({data.vehicletype})</Text>
                                <Text style={[styles.smallText, { marginTop: 1 }]}>Seat Available({data.seatavailable})</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                                    <MaterialIcons name="date-range" color={colorTheme.primaryColor} size={25} />
                                    <Text style={styles.smallText}>{data.date}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                                    <MaterialIcons name="watch-later" color={colorTheme.primaryColor} size={25} />
                                    <Text style={styles.smallText}>{data.time}</Text>
                                </View>
                            </View>
                            <Pressable style={{ marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} onPress={() => { }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                        <View style={{}} key={index}>
                                            <MaterialCommunityIcons name={"star"} size={20} color={"#EF802F"} />
                                        </View>
                                    ))}
                                    <Text>4.5</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ height: 'auto', }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="account-group" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: 'center' }]}>75+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Passengers</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="bag-checked" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>5+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Years Exp.</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="star" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>3.9+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Rating</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="comment-processing" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>4</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Review</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.bigText}>About</Text>
                            <Text
                                style={styles.smallText}
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 2}
                            >
                                {data.description}
                            </Text>
                            {lengthMore ? <Text
                                onPress={toggleNumberOfLines}
                                style={{ lineHeight: 21, marginTop: 0, color: blueText.color, textDecorationLine: 'underline', textAlign: 'right' }}>{textShown ? 'Read Less...' : 'Read More...'}</Text> : null}
                        </View>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ height: "auto" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.bigText}>Address</Text>
                            <Pressable onPress={() => { setModalVisible(true) }}>
                                <Text style={styles.blueText}>View on Map</Text>
                            </Pressable>
                        </View>
                        <UnderLine marginTop={5} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={styles.bigText}>Reviews</Text>
                            <View style={{ flexDirection: "row" }}>
                                <MaterialCommunityIcons name="pencil-plus" color={colorTheme.primaryColor} size={25} />
                                <Text onPress={() => { setreviewModal(true) }} style={styles.blueText}>add review</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={styles.textInput}>
                                <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
                                <TextInput
                                    placeholder='Search in reviews'
                                    onChangeText={setSearch}
                                    value={search}
                                    style={{ height: 48, width: "92%" }}
                                />
                            </View>
                        </View>
                        <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={{ width: 100, height: 30, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, flexDirection: "row" }}>
                                <FontAwesome name="sliders" color="black" size={20} />
                                <Text style={[styles.smallText, { fontWeight: '500', marginLeft: 5, marginRight: 5 }]}>Filter</Text>
                                <MaterialCommunityIcons name="menu-down" color="black" size={20} />
                            </TouchableOpacity>
                            {[1, 2, 3].map((num, index) => {
                                return (
                                    <TouchableOpacity style={{ width: 100, height: 30, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5 }} key={index}>
                                        <Text style={[styles.smallText, { fontWeight: '500' }]}>Filter</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                        <UnderLine marginTop={10} />
                        {
                            loading ? <Text>Loading....</Text> :
                                dataRating.map((dat, index) => (
                                    <DoctorRenameCard key={index} name={"Dale Thiel"} rating={dat.rating} time={dat.date} review={dat.review} id={dat.passenger} />
                                ))
                        }
                    </View>
                </View>
            </ScrollView >
            <View style={{
                width: "100%",
                height: 60,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                // backgroundColor:'white',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }} onPress={() => navigation.navigate('SelectAppointmentPackage')}>
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Book Ride</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        // marginTop: 10,
    },
    subContainer: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 20
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colorTheme.borderColor
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
        height: 48,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
})