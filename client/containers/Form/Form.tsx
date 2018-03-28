import * as React from 'react';
import { Tabs, Tab, Typography, AppBar } from 'material-ui';

const TabContainer: React.SFC = props => (
    <Typography color="primary" component="h1">
        {props.children}
    </Typography>
)
export class Form extends React.Component {
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
                        centered
                        fullWidth={false}
                    >
                        <Tab label="Sign Up" />
                        <Tab label="Sign In" />
                    </Tabs>
                </AppBar>
                {
                    this.state.value === 0 &&
                    <TabContainer>
                        Sign up!!
                    </TabContainer>
                }
                {
                    this.state.value === 1 &&
                    <TabContainer>
                        Sign in!!
                    </TabContainer>
                }
            </React.Fragment>
        )
    }
}