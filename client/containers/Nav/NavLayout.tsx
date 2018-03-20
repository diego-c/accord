import * as React from 'react';
import { NavItems } from './NavItems';
import { NavItem } from '../../components/NavItem/NavItem';
import accordLogo from '../../img/accord-logo.svg';

export class NavLayout extends React.Component {
    render() {
        return (
            <NavItems>
                <NavItem>
                    <img
                        src={accordLogo}
                        alt="accord-logo"
                        style={{ width: '5rem', height: '5rem', display: 'inline-block', marginRight: '1rem' }} />

                    <a href="#">Accord</a>
                </NavItem>
                <NavItem content="Login" />
                <NavItem content="Sign Up" />
            </NavItems >
        )
    }
}