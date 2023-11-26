import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Sound from 'react-native-sound'
import { RenderBtn } from '../../components';
import { Colors, SCREENS, SoundByColors } from '../../utilities/enums';
import { setModalVisible } from '../../redux/rootReducer';
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from '../../utilities/types';


Sound.setCategory('Playback');


const HomePage = () => {
    const navigation = useNavigation<StackNavigation>()
    const dispatch = useDispatch();
    const [startGame, setStartGame] = useState(false);
    const [userTurn, setUserTurn] = useState(false);
    const [steps, setSteps] = useState<number[]>([]);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [flashedColor, setFlashedColor] = React.useState(0);

    const Sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

    const playSound = (soundByColor: string) => {
        let sound = new Sound(soundByColor, Sound.MAIN_BUNDLE, error => {
            if (error) console.log(error)
            else {
                sound.play(() => {
                    // Release when it's done so we're not using up resources
                    sound.release();
                });
            }
        });
    }

    const FlashColor = async (key: number) => {
        const onFlash = async (color: number, soundByColor: string) => {
            playSound(soundByColor);
            setFlashedColor(color);
            await Sleep(500);
            setFlashedColor(0);
            // await Sleep(300);
        }

        switch (key) {
            case Colors.RED:
                await onFlash(Colors.RED, SoundByColors.RED);
                break;
            case Colors.BLUE:
                await onFlash(Colors.BLUE, SoundByColors.BLUE);
                break;
            case Colors.GREEN:
                await onFlash(Colors.GREEN, SoundByColors.GREEN);
                break;
            case Colors.YELLOW:
                await onFlash(Colors.YELLOW, SoundByColors.YELLOW);
                break;
            default:
                setFlashedColor(0);
                break;
        }
    };

    const checkUserSteps = async (colorNum: number) => {
        const getSoundByKey = ((Colors[colorNum]) || 'RED') as keyof typeof SoundByColors
        playSound(SoundByColors[getSoundByKey]);

        if (steps[currentSteps] === colorNum) {
            if (steps.length == currentSteps + 1) {
                setUserTurn(false);
                setCurrentSteps(0);
                await Sleep(1000)
                handlingSteps()
            }
            else setCurrentSteps(currentSteps + 1)
        }
        else {
            const modalData = {
                steps: steps.length,
                onSaveData: () => navigation.navigate(SCREENS.ScoresPage)
            }
            dispatch(setModalVisible(modalData))
            setSteps([]);
            setCurrentSteps(0)
            setStartGame(false);
            setUserTurn(false)
        }
    }

    const handlingSteps = async () => {
        const color = Math.floor(Math.random() * 4) + 1;
        if (steps.length > 0) {
            for (let i = 0; i < steps.length; i++) {
                await FlashColor(steps[i])
            }
        }
        steps.push(color)
        await FlashColor(color)
        setUserTurn(true)

    }

    const onStartGame = () => {
        setStartGame(true)
        handlingSteps()

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Simon Game</Text>
            <View style={styles.cardsWrapper}>

                {Object.values(Colors).map((v, i) => {
                    return (<RenderBtn
                        key={i}
                        colorNum={+v}
                        flashedColor={flashedColor}
                        checkUserSteps={(colorNum) => checkUserSteps(colorNum)}
                        userTurn={userTurn}
                    />)
                })}

                <TouchableOpacity style={[styles.startBtn, startGame && { backgroundColor: 'gray' }]} disabled={startGame} onPress={onStartGame}>
                    <Text style={styles.startTxt}>
                        Start
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default HomePage;
const styles = StyleSheet.create({
    cardsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
    },
    title: { fontWeight: 'bold', fontSize: 28, bottom: 40 },
    startBtn: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 4,
        width: 100,
        height: 100,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        left: '32%'
    },
    startTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%'
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

});