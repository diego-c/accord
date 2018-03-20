import * as React from 'react';
import { signUpProps, SignUp } from '../../containers/Auth/SignUp';

export const MainLayout: React.SFC<signUpProps> = props => {
    return (
        <SignUp isSignedIn={props.isSignedIn} />
    )
}   