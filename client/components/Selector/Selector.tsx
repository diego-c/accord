import * as React from 'react';
import classes from '../../scss/components/Selector/Selector.scss';

interface SelectorProps {
    switch: ((e: React.MouseEvent<HTMLSpanElement>) => void),
    activeBorderColor?: string
}
export const Selector: React.SFC<SelectorProps> = props => {
    return (
        <div className={classes.Selector}>
            <span
                style={{ borderBottom: props.activeBorderColor ? props.activeBorderColor : '#ccc' }}
                onClick={props.switch}>
                {props.children}
            </span>
        </div>
    )
}