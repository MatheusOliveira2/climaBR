import { City } from 'src/domain/entities/city';

export abstract class CityRepository {
  abstract getAll(): Promise<City[]>;
  abstract getById(id: number): Promise<City>;
  abstract getCacheCities(): Promise<City[]>;
  abstract saveDataOnCache(city: City): void;
}
