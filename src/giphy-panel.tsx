/* tslint:disable */
import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { Spinner } from "@grafana/ui";
import { GiphyOptions } from 'types';
import './style.css';
import {PANEL_EMPTY_STRING, PANEL_NO_RESULTS} from "./constants";

interface Props extends PanelProps<GiphyOptions> {}

export class GiphyPanel extends PureComponent<Props> {
  state = {
    url: undefined,
    isLoading: true,
    query: '',
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>): void {
    const {options: { url } } = this.props;
    const {options: { url: prevUrl } } = prevProps;

    if (url === prevUrl) {
      return;
    }
  }

  renderImage() {
    const { url, isLoading, text } = this.props.options;

    if (isLoading) {
      return <Spinner className="gp-spinner"/>;
    }

    if (!text) {
      return (
        <div className="gp-image">
          {PANEL_EMPTY_STRING}
        </div>
      );
    }

    if (!url) {
      return (
        <div className="gp-image">
          {PANEL_NO_RESULTS}
        </div>
      );
    }

    return (
      <div
        style={{
          background: `url(${url}) center / cover no-repeat`,
        }}
        className="gp-image"
     />
    );

  }

  render() {
    const { width, height } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
        className="gp-container"
      >
        {this.renderImage()}
      </div>
    );
  }
}
