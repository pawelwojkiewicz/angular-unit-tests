import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroComponent', () => {
  let component: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService;


  //Mockujemy tablice heroes
  beforeEach(() => {
    heroes = [
      {
        id: 1,
        name: 'Spider Dude',
        strength: 8
      },
      {
        id: 2,
        name: 'Wonderful Man',
        strength: 24
      },
      {
        id: 3,
        name: 'Spider Monster',
        strength: 55
      }
    ]
  })

  //Mockujemy service z metodami które chcemy uzyć
  mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

  component = new HeroesComponent(mockHeroService);

  it('should delete one element', () => {
    //w metodzie delete robimy subscribe na observabli w service wiec musimy zamockowac observable przy wywolaniu delete
    mockHeroService.deleteHero.and.returnValue(of(true))

    //Przypisujemy heroes do naszej zmockowanej tablicy
    component.heroes = heroes;

    component.delete(heroes[2]);

    expect(component.heroes.length).toEqual(2);

  })

  it('should get heroes on init', () => {
    mockHeroService.getHeroes.and.returnValue(of(true))

    component.heroes = heroes;

    expect(component.heroes.length).toEqual(3);
  })

  it('should add hero', () => {
    mockHeroService.addHero.and.returnValue(of(true))

    component.heroes = heroes;
    component.add('Hero');

    expect(component.heroes.length).toEqual(4);
  })
  it('should call deleteHero', () => {
    //w metodzie delete robimy subscribe na observabli w service wiec musimy zamockowac observable przy wywolaniu delete
    mockHeroService.deleteHero.and.returnValue(of(true))

    //Przypisujemy heroes do naszej zmockowanej tablicy
    component.heroes = heroes;

    component.delete(heroes[2]);

    //sprawdzamy czy metoda deleteHero sie odpalila
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
  })
})
