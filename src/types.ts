export interface GiphyOptions {
  text: string
  offset: number
  hasNext: boolean
}

export const defaults: GiphyOptions = {
  text: 'kitties',
  offset: 0,
  hasNext: false,
};
