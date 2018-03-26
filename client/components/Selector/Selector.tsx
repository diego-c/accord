import * as React from 'react';
import classes from '../../scss/components/Selector/Selector.scss';

interface SelectorProps {
    switch: ((e: React.MouseEvent<HTMLSpanElement>) => void),
    active: boolean
}
export const Selector: React.SFC<SelectorProps> = props => {
    const cls: Array<string> = [classes.Selector];

    if (props.active) {
        if (props.children === 'Login') {
            cls.push(classes.Active1);
        } else {
            cls.push(classes.Active2);
        }
    }

    if (props.children === 'Sign Up') {
        cls.push(classes.SelectorLeft);
    } else {
        cls.push(classes.SelectorRight)
    }

    return (
        <div
            className={cls.join(' ')}
            onClick={props.switch}>
            <span>
                {props.children}
            </span>
        </div>
    )
}