import * as React from 'react';
import { Tabs, Tab, AppBar } from 'material-ui';
// import classes from '../../scss/containers/Nav/Navbar.scss';
import classes from '../../scss/containers/Nav/NavLogo.scss';
import { asyncComponent } from '../AsyncComponent/AsyncComponent';
import { Link, Route } from 'react-router-dom';
import { Home } from '../../components/Home/Home';
import { About } from '../../components/About/About';

const SignUpComponent = asyncComponent(() => import('../Auth/SignUp').then((module: any) => module.default));

const SignInComponent = asyncComponent(() => import('../Auth/SignIn').then((module: any) => module.default));

const HomeLink: React.SFC = props => (
    <Link {...props} to="/" />
);

const SignUpLink: React.SFC = props => (
    <Link {...props} to="/signup" />
);
const SignInLink: React.SFC = props => (
    <Link {...props} to="/signin" />
);

const AboutLink: React.SFC = props => (
    <Link {...props} to="/about" />
);

export class Navbar extends React.Component {
    state = {
        value: 0
    }

    handleTabs = (_: React.ChangeEvent<{}>, value: number) => {
        this.setState({ value })
    }

    render() {
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
                        <Tab label="Sign Up" component={SignUpLink} />
                        <Tab label="Sign In" component={SignInLink} />
                        <Tab label="About" component={AboutLink} />
                    </Tabs>
                </AppBar>
                {
                    this.state.value === 0 &&
                    <Route path="/" exact component={Home} />
                }
                {
                    this.state.value === 1 &&
                    <Route path="/signup" exact component={SignUpComponent} />

                }
                {
                    this.state.value === 2 &&
                    <Route path="/signin" exact component={SignInComponent} />

                }
                {
                    this.state.value === 3 &&
                    <Route path="/about" exact component={About} />

                }
            </React.Fragment>
        )
    }
}