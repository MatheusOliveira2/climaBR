import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { CacheCityService } from 'src/domain/services/cache-city.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;

  constructor(
    private readonly searchService: SearchCityService,
    private readonly router: Router,
    private readonly cacheService: CacheCityService
  ) {}

  async ngOnInit() {
    this.cities = await this.cacheService.loadFromCache();
  }

  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }
  onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
  }
}
