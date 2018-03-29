import * as React from 'react';

type AsyncComponentState = {
    Component: React.ComponentClass | React.SFC | null
}

export const asyncComponent = (getComponent: () => Promise<React.ComponentClass | React.SFC>) => {

    return class extends React.Component<{}, AsyncComponentState> {

        constructor(props: any) {
            super(props);
            this.state = {
                Component: null
            }
        }

        componentDidMount() {
            getComponent()
                .then(Component => {
                    this.setState({ Component });
                })
        }

        render() {
            const { Component } = this.state;

            return Component ? <Component {...this.props} /> : null
        }
    }
}