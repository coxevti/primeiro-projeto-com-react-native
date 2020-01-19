import React, {Component} from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Loading,
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
            loading: false,
            page: 1,
        };
    }

    async componentDidMount() {
        this.load();
    }

    load = async (page = 1) => {
        const {starts} = this.state;
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const response = await api.get(`/users/${user.login}/starred`, {
            params: {
                page,
            },
        });
        this.setState({
            starts: page >= 2 ? [...starts, ...response.data] : response.data,
            page,
            loading: false,
        });
    };

    loadMore = async () => {
        const {page} = this.state;
        const nextPage = page + 1;
        this.load(nextPage);
    };

    render() {
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const {starts, loading} = this.state;
        return (
            <Container>
                <Header>
                    <Avatar source={{uri: user.avatar}} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                {loading ? (
                    <Loading />
                ) : (
                    <Starts
                        data={starts}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.loadMore}
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
                )}
            </Container>
        );
    }
}

User.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};
