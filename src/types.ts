export interface GiphyOptions {
  text: string
  offset: number
  hasNext: boolean
  isLoading: boolean
  url?: string
}

export const defaults: GiphyOptions = {
  text: '',
  offset: 0,
  hasNext: false,
  isLoading: false,
};
