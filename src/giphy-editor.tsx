import React from 'react';
import {Button, FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { GiphyOptions } from './types';
import {EDITOR_PAGINATOR_HEADING, EDITOR_SEARCH_TIMEOUT, EDITOR_TEXT_HEADING, GIPHY_API_KEY} from "./constants";

export class GiphyEditor extends React.Component<PanelEditorProps<GiphyOptions>, any> {
  timeout: number = 0;

  componentDidMount(): void {
    this.search();
  }

  componentDidUpdate(prevProps: Readonly<PanelEditorProps>, prevState: Readonly<{}>): void {
    const {options: { text, offset } } = this.props;
    const {options: { text: prevText, offset: prevOffset } } = prevProps;

    if (offset !== prevOffset || text !== prevText) {
      this.search();
    }
  }

  componentWillUnmount(): void {
    clearTimeout(this.timeout);
  }

  search = () => {
    const { options, onOptionsChange} = this.props;

    if (!options.text) {
      return;
    }

    onOptionsChange({
      ...options,
      isLoading: true,
    },
      () => {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${options.text}&api_key=${GIPHY_API_KEY}&limit=2&offset=${options.offset}`)
          .then((response) => {
            return response.json();
          })
          .then((jsonData) => {
            const { data, pagination } = jsonData;
            let url = undefined;
            let hasNext = false;

            if (data.length) {
              url = data[0].images.original.url;
              hasNext = pagination.count > 1;
            }

            const newOptions = {
              ...this.props.options,
              url,
              isLoading: false,
              hasNext,
            };
            onOptionsChange(newOptions);
          })
      });
  };

  /**
   * Handles typing in the search query editor field.
   * Uses debouncing technique to respond only after a period of time has passed since the last event.
   */
  handleQueryChange = ({ target }: any) => {
    const { text } = this.props.options;
    const { value } = target;

    if (text === value) {
      return;
    }

    clearTimeout(this.timeout);
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.props.onOptionsChange({ ...this.props.options, text: value, offset: 0 })
    }, EDITOR_SEARCH_TIMEOUT);
  };

  handleOffsetInc = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      offset: options.offset + 1
    })
  };

  handleOffsetDec = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      offset: options.offset - 1
    })
  };

  render() {
    const { options: { text, offset, hasNext } } = this.props;
    const hasPrev = offset > 0;

    return (
      <div className="gf-form">
        <div className="section gf-form-group">
          <h5 className="section-heading">{EDITOR_TEXT_HEADING}</h5>
          <FormField label="Text" labelWidth={5} inputWidth={20} type="text" onChange={this.handleQueryChange} defaultValue={text || ''} />
        </div>

        <div className="section gf-form-group gp-controls">
          <h5 className="section-heading">{EDITOR_PAGINATOR_HEADING}</h5>
          <Button icon="fa fa-chevron-left" variant="secondary" size="md" disabled={!hasPrev} onClick={this.handleOffsetDec}/>
          <Button icon="fa fa-chevron-right" variant="secondary" size="md" disabled={!hasNext} onClick={this.handleOffsetInc}/>
        </div>
      </div>
    );
  }
}
