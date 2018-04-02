import * as React from 'react';
import { Tabs, Tab, AppBar } from 'material-ui';
import { SignUp } from '../Auth/SignUp';
import { SignInWrapper } from '../Auth/SignIn';
import classes from '../../scss/containers/Nav/NavLogo.scss';
import { Link, Route } from 'react-router-dom';
import { Home } from '../../components/Home/Home';
import { About } from '../../components/About/About';

interface NavbarState {
    value: number
}

interface NavbarProps {
    isAuthenticated: boolean
}

const HomeLink: React.SFC = props => (
    <Link {...props} to="/" />
);

const SignUpLink: React.SFC = props => (
    <Link {...props} to="/signup" />
);
const SignInLink: React.SFC = props => (
    <Link {...props} to="/signin" />
);

const SignOutLink: React.SFC = props => (
    <Link {...props} to="/signout" />
);

const AboutLink: React.SFC = props => (
    <Link {...props} to="/about" />
);

export class Navbar extends React.Component<NavbarProps, NavbarState> {
    state = {
        value: 0
    }

    handleTabs = (_: React.ChangeEvent<{}>, value: number) => {
        this.setState({ value })
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <React.Fragment>
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
                        <Tab label="Accord" component={HomeLink} className={classes.NavLogo} />
                        {
                            isAuthenticated ?
                                (
                                    <Tab label="Sign out" component={SignOutLink} />
                                ) : (
                                    <React.Fragment>
                                        <Tab label="Sign Up" component={SignUpLink} />
                                        <Tab label="Sign In" component={SignInLink} />
                                    </React.Fragment>
                                )
                        }

                        <Tab label="About" component={AboutLink} />
                    </Tabs>
                </AppBar>
                {
                    this.state.value === 0 &&
                    <Route path="/" exact component={Home} />
                }
                {
                    this.state.value === 1 &&
                    <Route path="/signup" exact component={SignUp} />

                }
                {
                    this.state.value === 2 &&
                    <Route path="/signin" exact component={SignInWrapper} />

                }
                {
                    this.state.value === 3 &&
                    <Route path="/about" exact component={About} />

                }
            </React.Fragment>
        )
    }
}