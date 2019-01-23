import React from 'react';
import { AutoForm, AutoFields, SubmitField } from 'uniforms-semantic';

const SimpleForm = ({ schema, onSubmit, model = {} }) => (
    <AutoForm
        schema = { schema }
        onSubmit = { onSubmit }
        model = { model }
        label = { true }
        placeholder = { true }
        showInlineError = { true }
    >
        < AutoFields
           omitFields = { ['version'] }
        />
        <SubmitField
            value = "Ship it!"
            className = "blue fluid"
        />
    </AutoForm>
);

export default SimpleForm;
