import React from 'react';
import {Button, Layout, Text, TopNavigation, Divider, TopNavigationAction, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import MainMenu from "./MainMenu";

const MenuIcon = (style) => (
    <Icon {...style} name='menu-outline' />
);

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNavigate() {
        return (
            <MainMenu navigation={this.props.navigation}/>
        );
    }


    render () {
        const navigation = this.props.navigation;
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Home" alignmment="center" leftControl={this.renderNavigate()}/>
                <Divider/>
                <Layout style={{flex: 1,padding:20}}>
                    <Text category='h1'>UW Explorer</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;
