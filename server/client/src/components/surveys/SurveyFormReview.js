import React from 'react';
import { connect } from 'react-redux';
import fieldsConfig from './formFields';
import * as actions from '../../actions';

const SurveyReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = fieldsConfig.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>{reviewFields}</div>
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(
    mapStateToProps,
    actions
)(SurveyReview);
