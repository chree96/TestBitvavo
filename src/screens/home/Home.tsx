import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './Home.styles';

const Home: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default Home;
