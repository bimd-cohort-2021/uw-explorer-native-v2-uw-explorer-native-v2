import React from 'react';
import {Layout, List, ListItem, Text, TopNavigation, Divider, TopNavigationAction, Icon} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

class IMDCourses extends React.Component {

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
                <TopNavigation title="Campuses" alignmment="center" leftControl={this.renderNavigateBack()} />
                <Divider/>
                <Layout style={{flex: 1, padding: 20}}>
                    <Text category='h1'>Campuses</Text>
                    <List data={this.props.route.params.campuses.Campuses}
                          renderItem={({item,index}) => {
                              return (
                                  <ListItem title={item.CampusName}/>
                              )
                          }}/>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default IMDCourses;
