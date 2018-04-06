import * as React from 'react';
import { Tabs, Tab, AppBar, CircularProgress } from 'material-ui';
import classes from '../../scss/containers/Nav/NavLogo.scss';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { State, User } from '../../redux/types/types';
import { connect } from 'react-redux';

const HomeLink = (props: any) => {
    return (
        <Link {...props} to="/" />
    )
}

const SignUpLink = (props: any) => {
    return (
        <Link {...props} to="/signup" />
    )
}

const SignInLink = (props: any) => {
    return (
        <Link {...props} to="/signin" />
    )
}

const AboutLink = (props: any) => {
    return (
        <Link {...props} to="/about" />
    )
}

const SignOutLink = (props: any) => {
    return (
        <Link {...props} to="/signout" />
    )
}

interface NavbarState {
    value: string,
    loading: boolean
}

interface NavbarProps extends RouteComponentProps<any> {
    user: User | null
}

const Routes = ['/', '/signup', '/signin', '/about', '/signout'];

class Navbar extends React.PureComponent<NavbarProps, NavbarState> {
    state = {
        value: '/',
        loading: true
    }

    componentDidUpdate() {
        if (Boolean(this.props.user)) {
            this.setState({
                loading: false
            })
        }
    }

    componentDidMount() {
        if (!Routes.includes(this.props.location.pathname)) {
            this.setState({ value: '/signin' });
        } else {
            this.setState({ value: this.props.location.pathname });
        }
    }

    handleTabs = (_: React.ChangeEvent<{}>, value: string) => {
        this.setState({ value });
    }

    render() {
        const { loading } = this.state;

        return loading ? <CircularProgress /> : (
            <AppBar
                position="sticky"
                color="primary"
            >
                <Tabs
                    onChange={this.handleTabs}
                    value={this.state.value}
                    fullWidth={true}
                    centered
                >
                    <Tab
                        label="Accord"
                        className={classes.NavLogo}
                        value="/"
                        component={HomeLink} />
                    {
                        Boolean(this.props.user) ? (
                            <Tab
                                label="Sign Out"
                                value="/signout"
                                component={SignOutLink} />
                        ) : (
                                <React.Fragment>
                                    <Tab
                                        label="Sign Up"
                                        value="/signup"
                                        component={SignUpLink} />

                                    <Tab
                                        label="Sign In"
                                        value="/signin"
                                        component={SignInLink} />
                                </React.Fragment>
                            )
                    }

                    <Tab
                        label="About"
                        value="/about"
                        component={AboutLink} />
                </Tabs>
            </AppBar>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(withRouter(Navbar) as React.ComponentClass<any>);