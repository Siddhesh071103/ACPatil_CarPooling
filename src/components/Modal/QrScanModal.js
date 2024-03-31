import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { colorTheme } from '../../constant'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const QrScanModal = ({ modalVisible, setModalVisible }) => {
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <View style={styles.Qr}></View>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Scan Your Qr Here</Text>
            </View>
        </Modal>
    )
}

export default QrScanModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Qr: {
        height: 220,
        width: 220,
        borderWidth: 1,
        marginBottom: 30
    }
})