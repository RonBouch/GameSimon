
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../utilities/enums';
import { BtnProp } from '../../utilities/types';


const getStyleByColor = (colorNum: number) => {
    switch (colorNum) {
        case Colors.RED:
            return styles.red
        case Colors.BLUE:
            return styles.blue
        case Colors.GREEN:
            return styles.green
        case Colors.YELLOW:
            return styles.yellow
        default:
            break;
    }
}

export const RenderBtn = React.memo((btnData: BtnProp) => {
    const { colorNum, flashedColor, userTurn, checkUserSteps } = btnData
    const flash = flashedColor === colorNum;
    const btnStyle = useMemo(() => getStyleByColor(colorNum), []);
    return <TouchableOpacity style={[btnStyle, flash && { opacity: 0.1 }]} disabled={!userTurn} onPress={() => checkUserSteps(colorNum)} />
})

const styles = StyleSheet.create({
    red: {
        width: '46%',
        backgroundColor: 'red',
        borderTopLeftRadius: 200,
        height: 150,
        margin: 4,
    },
    blue: {
        backgroundColor: 'blue',
        width: '46%',
        borderTopRightRadius: 200,
        height: 150,
        margin: 4,
    },
    green: {
        backgroundColor: 'green',
        width: '46%',
        height: 150,
        margin: 4,
        borderBottomLeftRadius: 200,
    },
    yellow: {
        backgroundColor: 'yellow',
        width: '46%',
        borderBottomRightRadius: 200,
        height: 150,
        margin: 4,
    },
})