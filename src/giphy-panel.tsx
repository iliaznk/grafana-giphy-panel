/* tslint:disable */
import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { Spinner } from "@grafana/ui";
import { GiphyOptions } from 'types';
import { EDITOR_SEARCH_TIMEOUT, GIPHY_API_KEY } from "./constants";
import './style.css';

interface Props extends PanelProps<GiphyOptions> {}

export class GiphyPanel extends PureComponent<Props> {
  timeout: number = 0;
  state = {
    url: undefined,
    isLoading: true,
    query: '',
  };

  componentDidMount(): void {
    this.search();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>): void {
    const {options: { text, offset } } = this.props;
    const {options: { text: prevText, offset: prevOffset } } = prevProps;

    console.log('DID UPDATE');
    console.log('PROPS', this.props.options);
    console.log('PREV PROPS', prevProps.options);

    if (text === prevText && offset === prevOffset) {
      return;
    }

    if (text !== prevText) {
      clearTimeout(this.timeout);
      // @ts-ignore
      this.timeout = setTimeout(this.search, EDITOR_SEARCH_TIMEOUT);
    }

    if (offset !== prevOffset) {
      this.search();
    }
  }

  search = () => {
    const { options, onOptionsChange} = this.props;
    this.setState({
      isLoading: true,
      query: options.text,
    }, () => {
      fetch(`https://api.giphy.com/v1/gifs/search?q=${options.text}&api_key=${GIPHY_API_KEY}&limit=2&offset=${options.offset}`)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          const { data, pagination } = jsonData;
          let url = undefined;
          let hasNext = false;

          console.log('DATA', data.length);
          console.log('PAGINATION', pagination);

          if (data.length) {
            url = data[0].images.original.url;
            hasNext = pagination.count > 1;
          }

          const newOptions = {
            ...options,
            hasNext,
          };
          console.log('NEW OPTIONS', newOptions);
          onOptionsChange(newOptions);

          this.setState({
            url,
            isLoading: false,
          })
        })
    });
  };

  renderImage() {
    const { url, isLoading, query } = this.state;

    if (isLoading) {
      return <Spinner className="gp-spinner"/>;
    }

    return <div
      style={{
        background: `url(${url}) center / cover no-repeat`,
      }}
      className="gp-image"
    >{url ? '' : `No results for "${query}".`}</div>;
  }

  render() {
    const { width, height } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width, // : width > 500 ? 500 : width,
          height,
        }}
        className="gp-container"
      >
        {this.renderImage()}
      </div>
    );
  }
}
