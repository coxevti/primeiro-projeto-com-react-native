import React, {Component} from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Starts,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

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
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const {starts} = this.state;
        return (
            <Container>
                <Header>
                    <Avatar source={{uri: user.avatar}} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                <Starts
                    data={starts}
                    keyExtractor={start => String(start.id)}
                    renderItem={({item}) => (
                        <Starred>
                            <OwnerAvatar
                                source={{uri: item.owner.avatar_url}}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />
            </Container>
        );
    }
}

User.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};
