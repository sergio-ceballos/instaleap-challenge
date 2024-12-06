export enum Mode {
  DRIVING = 'driving'
}

export interface IDistanceMatrixReqQueryParams {
  origins: string;
  destinations: string;
  mode?: Mode;
  departureTime?: string;
}