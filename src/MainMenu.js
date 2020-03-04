import React from 'react';
import {OverflowMenu, Icon, TopNavigationAction} from '@ui-kitten/components';
import 'react-native-gesture-handler';

const MenuIcon = (style) => (
    <Icon {...style} name='menu-outline' />
);

const data = [
    {
        title: 'About',
    },
    {
        title: 'Menu Item 2',
    },
    {
        title: 'Menu Item 3',
    },
    {
        title: 'Menu Item 4',
    },
];

export class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false}
        this.onItemSelect = this.onItemSelect.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    setMenuVisible(visible) {
        this.setState({visible: visible});
    }

    onItemSelect(index)  {
        this.setMenuVisible(false);
        if (index === 0) {
            this.props.navigation.navigate("About");
        }
    };

    toggleMenu() {
        this.setMenuVisible(!this.state.visible);
    };

    render() {
        return (
            <OverflowMenu
                data={data}
                visible={this.state.visible}
                onSelect={this.onItemSelect}
                onBackdropPress={this.toggleMenu}>
                <TopNavigationAction icon={MenuIcon} onPress={this.toggleMenu}/>
            </OverflowMenu>
        );
    }
};

export default MainMenu;
