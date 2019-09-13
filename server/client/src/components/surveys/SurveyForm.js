import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import fieldsConfig from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                {fieldsConfig.map(({ label, name }) => (
                    <Field key={name} type="text" component={SurveyField} name={name} label={label} />
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    fieldsConfig.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
