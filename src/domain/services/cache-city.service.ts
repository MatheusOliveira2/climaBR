import { City } from '../entities/city';
import { CityRepository } from './protocols/city-repository';

export class CacheCityService {
  constructor(private readonly cityRepo: CityRepository) {}

  async loadFromCache(): Promise<City[]> {
    return this.cityRepo.getCacheCities();
  }
}
