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
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text category='h1'>About</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default AboutScreen;
