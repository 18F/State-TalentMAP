import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import TextEditorSubmit from '../../TextEditorSubmit';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
// import InteractiveElement from '../../InteractiveElement';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(props.initialText),
      editorStateCopy: createEditorStateWithText(props.initialText),
    };

    this.onChange = (editorState) => {
      this.setState({
        editorState,
      });
      this.props.onChangeText(this.state.editorState.getCurrentContent().getPlainText());
    };

    this.focus = () => {
      this.editor.focus();
    };

    this.submit = () => {
      // set our primary state and copied state to match
      this.setState({ editorStateCopy: this.state.editorState });
      this.props.onSubmitText(this.state.editorState.getCurrentContent().getPlainText());
    };

    this.cancel = () => {
      // reset our state back to a copy we made when we rendered
      this.setState({
        editorState: this.state.editorStateCopy,
      });
      this.props.cancel();
    };
  }

  render() {
    const { readOnly, hideButtons, spellCheck } = this.props;
    const shouldDisplayButtons = !readOnly && !hideButtons;
    return (
      <div>
        <div
          className={readOnly ? '' : 'editor'}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={(element) => { this.editor = element; }}
            readOnly={readOnly}
            spellCheck={spellCheck}
          />
        </div>
        {
          shouldDisplayButtons ?
            <TextEditorSubmit submit={this.submit} cancel={this.cancel} /> :
            null
        }
      </div>
    );
  }
}

TextEditor.propTypes = {
  readOnly: PropTypes.bool,
  initialText: PropTypes.string,
  onSubmitText: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  hideButtons: PropTypes.bool,
  onChangeText: PropTypes.func,
  spellCheck: PropTypes.bool,
};

TextEditor.defaultProps = {
  readOnly: false,
  initialText: '',
  cancel: EMPTY_FUNCTION,
  hideButtons: false,
  onChangeText: EMPTY_FUNCTION,
  spellCheck: true,
};
