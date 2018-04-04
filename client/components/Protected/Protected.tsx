import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface ProtectedProps extends RouteComponentProps<any> { }

export const Protected: React.SFC<ProtectedProps> = (props) => {
    console.log('Protected route props: \n' + JSON.stringify(props));
    return (
        <h1>This is a protected route!</h1>
    );
}

export default withRouter(Protected);