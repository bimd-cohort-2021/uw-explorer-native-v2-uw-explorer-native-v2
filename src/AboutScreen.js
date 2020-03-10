import React from 'react';
import {Layout, Text, TopNavigation, Divider, TopNavigationAction, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

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
                <Layout style={{flex: 1,padding:20}}>
                    <Text category='h1'>About UW Explorer</Text>
                    <Text>
                        Sample application created by UW Bothell faculty and students to demonstrate
                        use of React Native framework to access web services.
                    </Text>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default AboutScreen;
