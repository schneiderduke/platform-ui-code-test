import { ListComponent } from './list.component';
import { listfixture } from './list.fixture';
import { MedicalProvider } from './provider.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixtureBackup: MedicalProvider[];
  beforeEach(() => {
    component = new ListComponent();
    fixtureBackup = listfixture;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('select()', () => {
    it('should have no providers initially selected', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });

    it('should select all providers', () => {
      component.unselectedProviders = fixtureBackup;
      component.select(component.unselectedProviders[0].id)
      component.select(component.unselectedProviders[1].id)
      component.select(component.unselectedProviders[2].id)
      expect(component.selectedProviders).toEqual(component.unselectedProviders);
    });
  });

  describe('unselect()', () => {
    beforeEach(() => {
      component.unselectedProviders = fixtureBackup;
      component.select(component.unselectedProviders[0].id)
    });

    it('should have 1 provider selected', () => {
      expect(component.selectedProviders.length).toEqual(1);
    });

    it('should unselect providers', () => {
      component.unselect(component.unselectedProviders[0].id)
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('ngDoCheck()', () => {
    it('should have no initial length', () => {
      expect(window.localStorage.length).toEqual(0);
    });

    it('should store no providers', () => {
      component.ngDoCheck();
      expect(JSON.parse(window.localStorage.getItem('selectedProviders')).length).toEqual(0);
    });

    it('should store one provider', () => {
      component.selectedProviders.push(fixtureBackup[0])
      component.ngDoCheck();
      expect(window.localStorage.getItem('selectedProviders')).toEqual(JSON.stringify([fixtureBackup[0]]));
    });

    it('should store three providers', () => {
      fixtureBackup.forEach((provider: MedicalProvider) => component.selectedProviders.push(provider));
      component.ngDoCheck();
      expect(window.localStorage.getItem('selectedProviders')).toEqual(JSON.stringify(fixtureBackup));
    });

    afterEach(() => {
      localStorage.clear();
      component.selectedProviders.forEach(() => component.selectedProviders.pop());
    });
  });
});
