import * as React from 'react';
import { Tabs, Tab, Typography, AppBar } from 'material-ui';
import classes from '../../scss/containers/Nav/Navbar.scss';
import { asyncComponent } from '../AsyncComponent/AsyncComponent';
import { Link, Route } from 'react-router-dom';

const TabContainer: React.SFC = props => (
    <Typography color="primary" component="h1">
        {props.children}
    </Typography>
);

const SignUpComponent = asyncComponent(() => import('../Auth/SignUp').then((module: any) => module.default));

const SignInComponent = asyncComponent(() => import('../Auth/SignIn').then((module: any) => module.default));

const SignUpLink: React.SFC = props => (
    <Link {...props} to="/signup" />
);
const SignInLink: React.SFC = props => (
    <Link {...props} to="/signin" />
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
                    className={classes.AppBar}
                >
                    <span>
                        Accord
                    </span>
                    <Tabs
                        onChange={this.handleTabs}
                        value={this.state.value}
                        centered
                        fullWidth={false}
                    >
                        <Tab label="Sign Up" component={SignUpLink} />
                        <Tab label="Sign In" component={SignInLink} />
                        <Tab
                            className={classes.AboutTab}
                            label="About"
                        />
                    </Tabs>
                </AppBar>
                {
                    this.state.value === 0 &&
                    <TabContainer>
                        <Route path="/signup" exact component={SignUpComponent} />
                    </TabContainer>
                }
                {
                    this.state.value === 1 &&
                    <TabContainer>
                        <Route path="/signin" exact component={SignInComponent} />
                    </TabContainer>
                }
            </React.Fragment>
        )
    }
}