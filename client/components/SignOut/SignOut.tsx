import * as React from 'react';
import { connect } from 'react-redux';
import { State, User } from '../../redux/types/types';
import { CircularProgress } from 'material-ui';

interface SignOutProps {
    user: User | null
}

interface SignOutState {
    auth: boolean
}

class SignOut extends React.PureComponent<SignOutProps, SignOutState> {
    state = {
        auth: false
    }

    componentDidUpdate() {
        if (Boolean(this.props.user)) {
            this.setState({
                auth: true
            })
        }
    }

    render() {
        const { auth } = this.state;
        return auth ? <h1>Sign out: delete user data and redirect to /</h1> : <CircularProgress />
    }
}

const mapStateToProps = (state: State) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SignOut);

