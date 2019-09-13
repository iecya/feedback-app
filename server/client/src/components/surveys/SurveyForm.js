import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
    fieldsConfig = [
        { name: 'title', label: 'Survey Title' },
        { name: 'subject', label: 'Subject Line' },
        { name: 'body', label: 'Email Body' },
        { name: 'emails', label: 'Recipient List' }
    ];

    renderFields() {
        return (
            <div>
                {this.fieldsConfig.map(({ label, name }) => (
                    <Field
                        key={name}
                        type="text"
                        component={SurveyField}
                        name={name}
                        label={label}
                    />
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        console.log(values)
                    )}
                >
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
