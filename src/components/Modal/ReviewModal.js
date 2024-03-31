import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { journeyServices } from '../../services/Journey';

const StarRating = ({ rating, onRate }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            {stars.map((star, index) => (
                <TouchableOpacity key={index} onPress={() => onRate(star)} style={{ marginRight: 10 }}>
                    <Text style={{ fontSize: 30, color: star <= rating ? '#ffc629' : '#c8c7c8' }}>★</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ReviewScreen = ({ modalVisible, setModalVisible, rideId, driverId }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    function handleSubmit() {
        journeyServices.AddRating(rideId, driverId, rating, feedback).then(
            res => {
                console.log('review---->', res.data);
                setModalVisible(false);

            }
        )
    }

    const handleRating = (rating) => {
        setRating(rating);
    };

    const handleFeedback = (text) => {
        setFeedback(text);
    };

    const submitReview = () => {
        console.log('Rating:', rating);
        console.log('Feedback:', feedback);
        setModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, alignItems: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 63 }}>Rate Your Ride</Text>
                        <StarRating rating={rating} onRate={handleRating} />
                        <TextInput
                            placeholder='Your feedback...'
                            placeholderTextColor='gray'
                            onChangeText={handleFeedback}
                            value={feedback}
                            style={{
                                borderWidth: 1,
                                borderRadius: 15,
                                textAlignVertical: 'top',
                                padding: 5,
                                fontSize: 16,
                                borderRadius: 10,
                                height: 100,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 20,
                                paddingHorizontal: 10,
                            }}
                            multiline
                        />
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ReviewScreen;