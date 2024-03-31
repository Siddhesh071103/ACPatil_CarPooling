import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UnderLine from './UnderLine'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { journeyServices } from '../services/Journey';

export default function DoctorDetailCard(props) {
    const [user, setuser] = useState('')
    const [loading, setLoading] = useState(false)

    const date = new Date(props.time);
    const hour = date.getHours();

    useEffect(() => {
        setLoading(true)
        journeyServices.getUserName(props.id).then(res => {
            setuser(res.data)
            setLoading(false)

        })
    }, [])


    return (
        <>
            {loading ? <Text>loading...</Text> :
                <View>
                    <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <MaterialCommunityIcons name="account" color={'gray'} size={30} />
                            <Text style={[styles.smallText, { color: "black", fontWeight: "500", marginLeft: 10 }]}>{user}</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <MaterialCommunityIcons name="star" color={"#EF802F"} size={30} />
                                <Text style={[styles.smallText, { color: "black", fontWeight: "500", marginLeft: 2 }]}>{props.rating}</Text>
                            </View>
                            <Text style={[styles.smallText, { fontSize: 12 }]}>{hour} hour ago</Text>
                        </View>
                    </View>
                    <Text style={[styles.smallText, { fontSize: 12 }]}>
                        {props.review}
                    </Text>
                    <UnderLine marginTop={10} />
                </View>
            }
        </>

    )
}

const styles = StyleSheet.create({})