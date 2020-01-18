import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

export default class User extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('user').name,
    });

    constructor(props) {
        super(props);
        this.state = {
            starts: [],
        };
    }

    async componentDidMount() {
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const response = await api.get(`/users/${user.login}/starred`);
        this.setState({starts: response.data});
    }

    render() {
        const {starts} = this.state;
        return <View />;
    }
}

User.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};
