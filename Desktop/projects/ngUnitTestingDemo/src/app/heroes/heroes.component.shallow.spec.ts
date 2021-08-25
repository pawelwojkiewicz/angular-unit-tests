import { TestBed, ComponentFixture } from '@angular/core/testing'
import { HeroesComponent } from './heroes.component'
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'
import { of } from 'rxjs'

describe('HeroesComponent (Shallow Tests)', () => {
  //podajemy metody z service ktorych uzywamy w tym komponencie
  let MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes']);
  let heroes: Hero[];
  let fixture: ComponentFixture<HeroesComponent>;

  //FAKE COMPONENT
  @Component({
    selector: 'app-hero',
    template: '<div></div>', //zmieniamy na template z templateURL
    //usuwany styleURl
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }


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
    TestBed.configureTestingModule({

      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      // schemas: [NO_ERRORS_SCHEMA], // ignorujemy nieznane property czyli heroes: Hero[]; ale nie service
      providers: [
        { provide: HeroService, useValue: MockHeroService }
      ]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should set heroes corectly from the service', () => {

    //to samo co ngOnInit();
    MockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toEqual(3);
  })


  it('should has one li each hero', () => {
    //to samo co ngOnInit();
    MockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(3);
  })
})
