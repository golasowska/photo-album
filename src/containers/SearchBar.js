import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'What photos are you looking for?';
  }
  if (values.title && values.title.search(/\s/) > 0) {
    errors.title = 'Please, enter a single word.';
  }
  return errors;
}

class SearchBar extends React.Component {
  handleFormSubmit = values => {
    this.props.downloadGallery(values.title);
    values.title = '';
  };

  renderTextField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <fieldset className="form-group">
        <div>
          <input
            {...input}
            placeholder={label}
            className="form-control"
            type={type}
          />{' '}
          {touched && error && <div className="text-help">{error}</div>}
        </div>
      </fieldset>
    );
  };

  render() {
    return (
      <div className="mt-3 mt-md-5 d-inline-block col-md-6">
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Field
            name="title"
            type="text"
            component={this.renderTextField}
            label="I would like to see the photos of..."
          />
          <button type="submit" className="btn btn-info">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, Actions)(
  reduxForm({ form: 'searchBar', validate: validate })(SearchBar)
);
