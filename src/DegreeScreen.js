import React from 'react';
import {Layout, List, ListItem, Text, TopNavigation, Divider, TopNavigationAction, Icon, Select} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import settings from "../config";

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

class DegreeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {results: [], campusList: [], campus: null, collegeList: [], college: null, departmentList: [], department: []};
        this.handleBack = this.handleBack.bind(this);
        this.handleSelectCampus = this.handleSelectCampus.bind(this);
        this.handleSelectCollege = this.handleSelectCollege.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
    }

    // handleBack - handle click of back arrow in top navigation
    handleBack() {
        this.props.navigation.goBack();
    }

    // renderNavigateBack - render back arrow in top navigation
    renderNavigateBack() {
        return (
            <TopNavigationAction icon={BackIcon} onPress={this.handleBack}/>
        );
    }

    // handleSelectCampus - handle campus selection from dropdown list
    handleSelectCampus(e) {
        this.setState({campus: e});
        this.filterCollege(e.key);
    }

    // handleSelectCollege - handle college selection from dropdown list
    handleSelectCollege(e) {
        this.setState({college: e});
        this.loadDepartments(e);
    }

    // filterCollege - filter original SWS college list into dropdown list format of text and key
    filterCollege(campusShortName) {
        let collegeList = new Array();
        const sourceList = this.props.route.params.colleges.Colleges;
        for (let i in sourceList) {
            if (sourceList[i].CampusShortName.toUpperCase() === campusShortName.toUpperCase()) {
                collegeList.push({text: sourceList[i].CollegeName, key: sourceList[i].CollegeAbbreviation});
            }
        }
        let college = null;
        if (collegeList.length === 1) {
            college = collegeList[0];
            this.loadDepartments(college);
        }
        this.setState({collegeList: collegeList, college: college});
    }

    // handleSelectDepartment - handle department selection from dropdown list
    handleSelectDepartment(e) {
        this.setState({department: e});
        this.loadDegrees(e);
    }

    // filterDepartment - filter original SWS department list into dropdown list format of text and key
    filterDepartment(collegeAbbreviation) {
        let departmentList = new Array();
        const sourceList = this.state.departmentList;
        for (let i in sourceList) {
            departmentList.push({text: sourceList[i].DepartmentFullName, key: sourceList[i].DepartmentAbbreviation});
        }
        let department = null;
        this.setState({departmentList: departmentList, department: department});
    }

    //load campuses at mount
    componentDidMount() {
        this.loadCampuses();
    }

    // loadCampuses - convert original SWS Campus List to dropdown list format of text and key
    loadCampuses() {
        let campusList = new Array();
        let sourceList = this.props.route.params.campuses.Campuses;
        for (let i in sourceList) {
            campusList.push({text: sourceList[i].CampusName, key: sourceList[i].CampusShortName });
        }
        this.setState({campusList: campusList, campus: {text: null}, collegeList: [],});
    }

    // loadDepartments - call web service to return departments unique to current college selection
    loadDepartments(college) {

        var collegeKey = college.key.replace("&", "%26");

        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/department.json?college_abbreviation=" + collegeKey.toLowerCase() + "&year=2020&quarter=winter";
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
                this.setState({departmentList: data.Departments, results:[]});
                this.filterDepartment(null)
            })
            .catch((error) => {
                console.log(error);
            });
    }

   loadDegrees(department) {

        // Initialize call to a web service. The config.json file contains default settings for
        // this application to use rather than hard-code these into component source files.
        let url = settings.sws.baseURL + "/student/v5/degree.json?major_abbr=" + department.key.toLowerCase() + "&year=2020&quarter=winter";
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

                // data.Degrees.sort((a,b) => {return a.Program.localeCompare(b.Program)});
                this.setState({results: data.Degrees});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Degrees" alignmment="center" leftControl={this.renderNavigateBack()} />
                <Divider/>
                <Layout style={{flex: 1, padding: 20}}>
                    <Text category='h1'>Degrees</Text>
                    <Select data={this.state.campusList} selectedOption={this.state.campus}
                            onSelect={this.handleSelectCampus} placeholder={"Select Campus"}/>
                    <Select data={this.state.collegeList} selectedOption={this.state.college}
                            onSelect={this.handleSelectCollege} placeholder={"Select College"}/>
                    <Select data={this.state.departmentList} selectedOption={this.state.department}
                            onSelect={this.handleSelectDepartment} placeholder={"Select Department"}/>
                    <List data={this.state.results}
                          renderItem={({item,index}) => {
                              return (
                                  <ListItem title={item.Title}/>
                              )
                          }}/>
                </Layout>
            </SafeAreaView>
        );
    }
}

export default DegreeScreen;
