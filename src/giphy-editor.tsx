import React from 'react';
import {Button, FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { GiphyOptions } from './types';
import { EDITOR_SECTION_HEADING } from "./constants";

export class GiphyEditor extends React.Component<PanelEditorProps<GiphyOptions>, any> {
  componentDidUpdate(prevProps: Readonly<PanelEditorProps>, prevState: Readonly<{}>): void {
    console.log('EDITOR DID UPDATE');
    console.log('PROPS', this.props.options);
    console.log('PREV PROPS', prevProps.options);
  }

  componentDidMount(): void {
    setTimeout(() => {
      console.log('====> TIMEOUT');
      this.props.onOptionsChange({
        ...this.props.options,
        hasNext: true
      })
    }, 3000);
  }

  onTextChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, text: target.value, offset: 0 });
  };

  handleOffsetInc = () => {
    console.log('HANDLE INC');
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      offset: options.offset + 1
    })
  };

  handleOffsetDec = () => {
    console.log('HANDLE DEC');
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      offset: options.offset - 1
    })
  };

  render() {
    console.log('EDITOR PROPS', this.props);
    const { options: { text, offset, hasNext } } = this.props;
    const hasPrev = offset > 0;

    console.log('HAS NEXT', hasNext);

    return (
      <div className="gf-form">
        <div className="section gf-form-group">
          <h5 className="section-heading">{EDITOR_SECTION_HEADING}</h5>
          <FormField label="Text" labelWidth={5} inputWidth={20} type="text" onChange={this.onTextChanged} value={text || ''} />
        </div>
        <div className="section gp-controls">
          <h5 className="section-heading">Choose image</h5>
          <Button icon="fa fa-chevron-left" variant="secondary" size="md" disabled={!hasPrev} onClick={this.handleOffsetDec}/>
          <Button icon="fa fa-chevron-right" variant="secondary" size="md" disabled={!hasNext} onClick={this.handleOffsetInc}/>
        </div>
      </div>
    );
  }
}
