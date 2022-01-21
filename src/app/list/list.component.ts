import { Component, DoCheck } from '@angular/core';
import { listfixture } from './list.fixture';
import { MedicalProvider } from './provider.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements DoCheck {
  public selectedProviders: MedicalProvider[] = JSON.parse(localStorage.getItem('selectedProviders')) || [];
  public unselectedProviders: MedicalProvider[] = listfixture;
  ngDoCheck() { localStorage.selectedProviders = JSON.stringify(this.selectedProviders) }
  
  select(id: string): void {
    this.selectedProviders.push(this.unselectedProviders.find((provider: MedicalProvider) => id === provider.id));
    this.unselectedProviders.splice(
      this.unselectedProviders.indexOf(this.unselectedProviders.find((provider: MedicalProvider) => id === provider.id)),1);
  }

  unselect(id: string): void {
    this.unselectedProviders.push(this.selectedProviders.find((provider: MedicalProvider) => id === provider.id));
    this.selectedProviders.splice(
      this.selectedProviders.indexOf(this.selectedProviders.find((provider: MedicalProvider) => id === provider.id)),1);
  }
}
