import { City } from 'src/domain/entities/city';
import { CityRepository } from 'src/domain/services/protocols/city-repository';
import { cities } from './data-source/br-cities';

export class LocalCityRepository extends CityRepository {
  async getAll(): Promise<City[]> {
    return this.toCollection(cities);
  }

  async getById(id: number): Promise<City> {
    return this.toEntity(cities.find((item: any) => item.id === id));
  }

  async getCacheCities(): Promise<City[]> {
    const cities = localStorage.getItem('cities');
    if (cities) return JSON.parse(cities);
    return [];
  }

  async saveDataOnCache(city: City) {
    let cities = localStorage.getItem('cities')
      ? JSON.parse(localStorage.getItem('cities'))
      : [];

    if (!cities.some((item: City) => city.id === item.id)) cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
  }

  private toEntity(data: any): City {
    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.nome,
      state: data.estado.nome,
      coord: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
  }

  private toCollection(data: any[]): City[] {
    if (!data) {
      return null;
    }

    return data.map((item: any) => this.toEntity(item));
  }
}
