/*
*
*  Jess adding a new comment!!!! Changes made ready to upload!
*
 */


import React from 'react';
import { ApplicationProvider, IconRegistry, Spinner, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeScreen from "./src/HomeScreen";
import AboutScreen from "./src/AboutScreen";
import CampusScreen from "./src/CampusScreen";
import DepartmentScreen from "./src/DepartmentScreen";
import IMDCourses from "./src/IMDCourses";
import DegreeScreen from "./src/DegreeScreen";
import settings from "./config";
import {SafeAreaView} from "react-native-web";

const Stack = createStackNavigator();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campuses: null,
            colleges: null,
            departments: null,
            degrees: null,
            loadingFlag: -2,
        };
    }

    componentDidMount() {
        this.loadCampuses();
        this.loadColleges();
    }

    loadCampuses() {
        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/campus.json";

        // Add a header containing a custom header used by the proxy to authenticate this call
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };

        

        // Call SWS web service and process results using promises that handle the asynchronous
        // aspects of the call-- that is the code waits on the previous code as completed through
        // the "then" phrases. Note that "fetch" makes the AJAX call to the web service.
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                // Update the state of this component so that the data retrieved will be rendered
                this.setState({ campuses: data, loadingFlag: this.state.loadingFlag+1 });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    loadCourses() {
        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/course.json?year=2020&quarter=spring&future_terms=0&curriculum_abbreviation=B+IMD&course_number=&course_title_starts=&course_title_contains=&page_size=20";

        // Add a header containing a custom header used by the proxy to authenticate this call
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };



        // Call SWS web service and process results using promises that handle the asynchronous
        // aspects of the call-- that is the code waits on the previous code as completed through
        // the "then" phrases. Note that "fetch" makes the AJAX call to the web service.
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                // Update the state of this component so that the data retrieved will be rendered
                this.setState({ courses: data, loadingFlag: this.state.loadingFlag+1 });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    loadColleges() {
        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/college.json";

        // Add a header containing a custom header used by the proxy to authenticate this call
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };

        // Call SWS web service and process results using promises that handle the asynchronous
        // aspects of the call-- that is the code waits on the previous code as completed through
        // the "then" phrases. Note that "fetch" makes the AJAX call to the web service.
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                // Update the state of this component so that the data retrieved will be rendered
                this.setState({ colleges: data, loadingFlag: this.state.loadingFlag+1  });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider mapping={mapping} theme={lightTheme}>
                    {(this.state.loadingFlag >= 0)?(
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="Home" headerMode='none'>
                                <Stack.Screen name="Home" component={HomeScreen}/>
                                <Stack.Screen name="About" component={AboutScreen}/>
                                <Stack.Screen name="Campus" component={CampusScreen}
                                              initialParams={this.state}/>
                                <Stack.Screen name="Department" component={DepartmentScreen}
                                              initialParams={this.state}/>
                                <Stack.Screen name="Degree" component={DegreeScreen}
                                              initialParams={this.state}/>
                                <Stack.Screen name="IMD" component={IMDCourses}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    ):(
                        <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Loading ALL THE THINGS!!!!!...</Text>
                            <Spinner/>
                        </SafeAreaView>
                        )}
                </ApplicationProvider>
            </React.Fragment>
        );
    }
}

export default App;
