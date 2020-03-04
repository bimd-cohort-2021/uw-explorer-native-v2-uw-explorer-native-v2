import React from 'react';
import { ApplicationProvider, Icon, IconRegistry, Button, Layout, Text, TopNavigation, Divider, TopNavigationAction} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render () {
        const navigation = this.props.navigation;
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Home" alignmment="center" />
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text category='h1'>HOME</Text>
                    <Button title="Details" onPress={() => navigation.navigate("About")}/>
                </Layout>
            </SafeAreaView>
        );
    }
}

class AboutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        this.props.navigation.goBack();
    }

    renderNavigateBack() {
        return (
            <TopNavigationAction icon={BackIcon} onPress={this.handleBack}/>
        );
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="About" alignmment="center" leftControl={this.renderNavigateBack()} />
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text category='h1'>About</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}

const App = () => (
    <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode='none'>
                    <Stack.Screen name="Home" component={HomeScreen}
                    />
                    <Stack.Screen name="About" component={AboutScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    </React.Fragment>
);

export default App;