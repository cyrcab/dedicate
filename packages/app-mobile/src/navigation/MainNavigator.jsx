import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const HomeRoute = () => <Text>Home</Text>;



const MainNavigator = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,

    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default MainNavigator;
