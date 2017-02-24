/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2016
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import React from 'react'
import {IntlProvider, FormattedMessage} from 'react-intl'
import {TextField} from 'ap-components-react/dist/ap-components-react'
//import Codemirror from 'react-codemirror'
import {CHARACTER_LIMITS} from '../constants/constants.js'

import EditorControl from './editor-control.jsx'

export default class TextareaControl extends EditorControl {
  constructor(props) {
    super(props);
    this.state = {
      controlValue: EditorControl.joinNewlines(props.valueAccessor(props.control.name))
    };
    this.getControlValue = this.getControlValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {

    this.setState({
      controlValue: evt.target.value
    });
  }

  getControlValue() {
    if (this.props.control.valueDef.isList) {
      return EditorControl.splitNewlines(this.state.controlValue);
    }
    else {
      return [this.state.controlValue];
    }
  }

  render() {
    return (
      <TextField
        type="textarea"
        id={this.getControlID()}
        placeholder={this.props.control.additionalText}
        onChange={this.handleChange}
        value={this.state.controlValue}
        rows={4}
        maxCount={CHARACTER_LIMITS.NODE_PROPERTIES_DIALOG_TEXT_AREA}
        maxLength={CHARACTER_LIMITS.NODE_PROPERTIES_DIALOG_TEXT_AREA}/>
    );
  }
}


TextareaControl.propTypes = {
  control: React.PropTypes.object
};
