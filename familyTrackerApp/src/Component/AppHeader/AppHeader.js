import React, { Component } from 'react';
import {
    Text,
} from 'react-native';

import { Header, Left, Drawer, Button, Icon, Right, Body, Title } from 'native-base';
import SideBar from '../SideBar/SideBar';


export default class AppHeader extends Component {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        // openDrawer = () => {
        //     this.drawer._root.open()
        // };
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent
                        onPress={() => this.props.openDrawer()}
                    >
                        <Drawer
                            ref={(ref) => { this.drawer = ref; }}
                            content={<SideBar navigator={this.navigator} />}
                            onClose={() => this.closeDrawer()} >
                        </Drawer>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>SDCC Wallet</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='bulb' />
                    </Button>
                </Right>
            </Header>
        );
    }
}

module.exports = AppHeader;