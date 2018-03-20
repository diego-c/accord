import * as React from 'react';
import classes from '../../scss/components/NavItem/NavItem.scss';

interface NavItemProps {
    children?: JSX.Element[],
    content?: React.ReactChild | string
}
export const NavItem = ({ children, content }: NavItemProps): JSX.Element => {

    if (children) {
        return (
            <div className={[classes.NavItem, classes.NavLogo].join(' ')}>
                {children}
            </div>
        )
    }

    return (
        <div className={classes.NavItem}>
            <a href="#">{content}</a>
        </div>
    )
}