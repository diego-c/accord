import * as React from 'react';
import classes from '../../scss/containers/Nav/NavLogo.scss';

interface NavLogoProps {
    title: string
}

export const NavLogo: React.SFC<NavLogoProps> = ({ title }) => (
    <span className={classes.NavLogo}>{title}</span>
);