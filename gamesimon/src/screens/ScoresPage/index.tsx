import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ScoreT } from '../../utilities/types';

const ScoresPage = () => {
    const { scoresData } = useSelector((state: RootState) => state.rootReducer)

    const RenderScore = ({ item }: { item: ScoreT }) => {
        return (
            <View style={styles.scoreCon}>
                <Text style={styles.scoreTxt}>
                    Name: {item.name}
                </Text>
                <Text style={styles.scoreTxt}>
                    Score: {item.score}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Results</Text>
            <View style={styles.flatlistCon}>
                {!!scoresData.length && <FlatList
                    data={scoresData}
                    renderItem={(item) => <RenderScore {...item} />}
                    keyExtractor={item => item.date}
                />}
            </View>
        </SafeAreaView>


    );
};

export default ScoresPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
    },
    flatlistCon: {
        width: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 20

    },
    scoreCon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: '#E5F2F2',
        padding: 10,
    },
    scoreTxt: {
        fontWeight: 'bold',
        fontSize: 18,

    },

});