import * as React from 'react';
import classes from '../../scss/containers/Nav/NavItems.scss';

interface NavState {
    isLoggedIn: boolean
}

interface NavProps<T> {
    children: Array<T>
}

export class NavItems extends React.Component<NavProps<React.ReactChild>, NavState> {
    state = {
        isLoggedIn: false
    }

    render() {
        return (
            <div className={classes.NavItems}>
                {this.props.children}
            </div>
        )
    }
}