import * as React from 'react';
import { Tabs, Tab, AppBar } from 'material-ui';
import classes from '../../scss/containers/Nav/NavLogo.scss';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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

interface NavbarState {
    value: string
}

interface NavbarProps extends RouteComponentProps<any> {
    isAuth: boolean
}

const Routes = ['/', '/signup', '/signin', '/about'];

class Navbar extends React.Component<NavbarProps, NavbarState> {
    state = {
        value: '/'
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
        return (
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
                    <Tab
                        label="Sign Up"
                        value="/signup"
                        component={SignUpLink} />

                    <Tab
                        label="Sign In"
                        value="/signin"
                        component={SignInLink} />

                    <Tab
                        label="About"
                        value="/about"
                        component={AboutLink} />
                </Tabs>
            </AppBar>
        )
    }
}

export default withRouter(Navbar);