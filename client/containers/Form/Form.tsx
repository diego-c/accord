import * as React from 'react';
import { Grid } from 'material-ui';

export class Form extends React.Component {

    render() {
        return (
            <Grid container justify="center">
                <Grid item xl={6}>
                    <h1>hi</h1>
                </Grid>
                <Grid item xl={6}>
                    <h1>there</h1>
                </Grid>
            </Grid>
        )
    }
}