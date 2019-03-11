import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';

class StreamForm extends Component {

  renderInput = ({input, label, meta}) =>{
    
    // Set the appropiate semantic-ui classes depending if there's errors in the fields
    const className = (meta.error && meta.touched) ? "field error" : "field";
    return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off"/>
      {this.renderError(meta)}
    </div>
    );
  } 


  // Print divs with errors if user submits empty fields
  renderError = ({touched, error}) =>{
    if(touched && error){
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // Create or Edit, depending on the prop function passed
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter title"/>
        <Field name="description" component={this.renderInput} label="Enter description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}


//Redux-Form constantly checks and validates the form inputs
const validate = (formValues) => {
  const errors = {};
  if(!formValues.title){
    errors.title = 'You must enter a title';
  }
  if(!formValues.description){
    errors.description = 'You must enter a description';
  }

  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
