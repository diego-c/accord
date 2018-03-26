import * as React from 'react';
import { ButtonTypes } from '../../../utils/ButtonTypes';
import classes from '../../../scss/components/Buttons/Submit/SubmitButton.scss';
import types from '../../../scss/components/Buttons/ButtonTypes.scss';

interface SubmitButtonProps {
    onSubmit: ((e: React.MouseEvent<HTMLButtonElement>) => void),
    type: ButtonTypes
}
export const SubmitButton: React.SFC<SubmitButtonProps> = props => {

    let cls: Array<string> = [classes.SubmitButton];

    switch (props.type) {
        case ButtonTypes.INFO:
            cls.push(types.ButtonInfo);
            break;
        case ButtonTypes.DANGER:
            cls.push(types.ButtonDanger);
            break;
        case ButtonTypes.SUCCESS:
            cls.push(types.ButtonSuccess);
            break;
        case ButtonTypes.WARNING:
            cls.push(types.ButtonWarning);
            break;
    }

    return (
        <React.Fragment>
            <button
                className={cls.join(' ')}
                onClick={props.onSubmit}>
                {props.children}
            </button>
        </React.Fragment>
    );
}