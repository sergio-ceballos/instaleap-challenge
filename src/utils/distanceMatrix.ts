import axios, { AxiosResponse } from 'axios';

import { IDistanceMatrixReqQueryParams, Mode } from '../interfaces/IDistanceMatrix';
import { DISTANCE_MATRIX_API_KEY, DISTANCE_MATRIX_URL } from '../config/environment';
import { logger } from '../logs/logger';

export class DistanceMatrixUtil {
  private buildRequestUrl({
    origins,
    destinations,
    mode,
    departureTime
  }: Partial<IDistanceMatrixReqQueryParams>): string {
    const baseUrl = DISTANCE_MATRIX_URL;
    const apiKey = DISTANCE_MATRIX_API_KEY;

    const parsedParams = new URLSearchParams({
      origins: origins || '',
      destinations: destinations || '',
      mode: mode || Mode.DRIVING,
      departure_time: departureTime || 'now',
      key: apiKey,
    });

    return `${baseUrl}?${parsedParams.toString()}`;
  }

  public async fetchDistanceMatrix(params: Partial<IDistanceMatrixReqQueryParams>): Promise<AxiosResponse> {
    const url = this.buildRequestUrl(params);
    
    try {
      return axios.get(url);
    } catch (error) {
      logger.error('Error fetching distance matrix:', error);
      throw error;
    }
  }
}
