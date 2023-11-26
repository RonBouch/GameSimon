import { NavigationProp } from "@react-navigation/native";

export type BtnProp = {
    colorNum: number,
    flashedColor: number,
    userTurn: boolean,
    checkUserSteps: (colorNum: number) => void
}
export type ScoreT = {
    date: string;
    name: string;
    score: number;
}

export type StoreT = {
    isModalVisible: any;
    scoresData: ScoreT[]
}
export type ModalT = {
    isModalVisible: any;
}

export type RootStackParam = {
    HomePage: undefined;
    ScoresPage: undefined;
};

export type StackNavigation = NavigationProp<RootStackParam>;


export type RouterProps = {
    navigation: NavigationProp<any, any>;
}