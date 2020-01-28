import { PanelPlugin } from '@grafana/data';
import { GiphyOptions, defaults } from './types';
import { GiphyPanel } from './giphy-panel';
import { GiphyEditor } from './giphy-editor';

export const plugin = new PanelPlugin<GiphyOptions>(GiphyPanel).setDefaults(defaults).setEditor(GiphyEditor);
