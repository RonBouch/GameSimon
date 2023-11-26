import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addScore, setModalVisible } from "../../redux/rootReducer";
import Icon from 'react-native-vector-icons/FontAwesome';


const ModalComponent = () => {
    const { isModalVisible, } = useSelector((state: RootState) => state.rootReducer)
    const { steps } = isModalVisible
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    const onPressSave = () => {
        const scoreData = {
            date: new Date().toString(),
            name,
            score: steps
        }
        dispatch(addScore(scoreData))
        setName('')
        dispatch(setModalVisible(false))
        isModalVisible.onSaveData && isModalVisible.onSaveData()
    }

    const renderModal = () => {
        return (
            <View style={s.modalCon}>
                <TouchableOpacity onPress={() => dispatch(setModalVisible(false))} style={s.closeIcon}>
                    <Icon name="close" size={24} color={'#4FB5B5'} />
                </TouchableOpacity>

                <Text style={s.title}>Your score is: {steps}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Enter Name"
                    onChangeText={e => setName(e)}
                    value={name}
                />
                <TouchableOpacity style={s.saveBtn} onPress={onPressSave}>
                    <Text style={s.saveTxt}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <React.Fragment>
            {!!isModalVisible && <View style={s.bkg} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={!!isModalVisible}
                onRequestClose={() => {
                    dispatch(setModalVisible(false))
                }}>
                {!!isModalVisible ? renderModal() : <View />}
            </Modal>
        </React.Fragment>
    )
}

export default React.memo(ModalComponent);
const s = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4FB5B5'
    },
    saveTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    saveBtn: {
        backgroundColor: '#4FB5B5',
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 40,
        marginTop: 10,
    },
    input: {
        marginTop: 10,
        fontSize: 16,
        width: 160,
        borderWidth: 1,
        borderRadius: 20,
        color: 'black',
        alignSelf: 'center',
        borderColor: '#4FB5B5',
        padding: 10

    },
    modalCon: {
        backgroundColor: 'white',
        borderWidth: 2,
        height: 200,
        borderRadius: 30,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        top: 240,
    },
    closeIcon: {
        position: 'absolute',
        top: 14,
        left: 20,
    },



    bkg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(112,112,112,0.7)'
    }
})