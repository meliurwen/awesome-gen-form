import React from 'react';
import { AutoForm, NestField, TextField, LongTextField, ListField, SubmitField, ErrorsField } from 'uniforms-semantic';
import { Grid } from 'semantic-ui-react';

const EssentialForm = ({ schema, onSubmit, model = {} }) => (
    <AutoForm
        schema = { schema }
        onSubmit = { onSubmit }
        model = { model }
    >
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <TextField name = "slug" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <TextField name = "title" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ListField name = "category" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <NestField name = "sources" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <TextField name = "description" />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <SubmitField
                        value = "Ship it!"
                        className = "blue fluid"
                    />
                    <ErrorsField/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </AutoForm>
);

export default EssentialForm;
