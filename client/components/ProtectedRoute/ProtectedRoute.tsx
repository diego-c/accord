import * as React from 'react';
import { RouteProps, Redirect, Route } from "react-router";

/**
 * The "protectedComponent" prop needs to be specified instead of 
 * the "component" prop from the Route component
 * because typescript currently doesn't support
 * destructuring assignment, renaming AND type annotation for 
 * an object property at the same time.
 * 
 * See https://github.com/Microsoft/TypeScript/issues/7576#issuecomment-370196012
 */

interface ProtectedRouteProps {
    isAuth: boolean
    routeProps: RouteProps,
    Component: React.SFC<any> | React.ComponentClass<any>
}
export const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({ isAuth, Component, routeProps: { location, path } }) => {
    console.log('In protected route: ' + path);
    console.log('Is Auth: ' + JSON.stringify(isAuth));
    return <Route path={path} render={(ownProps) => (
        isAuth ? (
            <Component {...ownProps} />
        ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: location }
                }} />
            )
    )} />
}