import React from 'react';
import { connect } from 'react-redux';
import fieldsConfig from './formFields';

const SurveyReview = ({ onCancel, formValues }) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                <div>
                    <lavel>Survey Title</lavel>
                    <div>{formValues.title}</div>
                </div>
            </div>
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyReview);
