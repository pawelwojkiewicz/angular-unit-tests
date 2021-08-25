import { TestBed, ComponentFixture } from '@angular/core/testing'
import { HeroesComponent } from './heroes.component'
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { HeroComponent } from '../hero/hero.component'

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})

export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (Deep Tests)', () => {
  //podajemy metody z service ktorych uzywamy w tym komponencie
  let MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes']);
  let heroes: Hero[];
  let fixture: ComponentFixture<HeroesComponent>;

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
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      // schemas: [NO_ERRORS_SCHEMA], // ignorujemy nieznane property i dyrektywy czyli heroes: Hero[]; ale nie service
      providers: [
        { provide: HeroService, useValue: MockHeroService }
      ]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should has one app-hero per heroes item', () => {
    //ngOnInit
    MockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    //debugElement - queryAll

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect((heroComponentDEs[i].componentInstance.hero)).toEqual(heroes[i]);
    }

  })

  it('should fire heroService.deleteHero method after one heroComponent is clicked', () => {

    //Nasluchujemy w heroesComponent metody delete czy zostanie wywołana
    spyOn(fixture.componentInstance, 'delete');
    //Mockujemy strumień z danymi
    MockHeroService.getHeroes.and.returnValue(of(heroes));
    //Odpalamy metode getHeroes - ngOnInit
    fixture.detectChanges();
    //Pobieramy wszystkie heroComponenty
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    //Pobieramy button z pierwszego HeroComponent
    heroComponents[0].query(By.css('.delete'))
      //Wywołujemy clickEvent i podajemy obiekt ($event) ktory chcemy wywolac razem z tym eventem - w naszym przypadku stopPropagation
      .triggerEventHandler('click', { stopPropagation: () => { } });

    //Mozemy to tez zrobic poprzez wywolanie EventEmittera bezposrednio z childa
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    //Mozemy rowniez wywolac odrazu deleteEvent w heroComponents[0] - shortcut
    // heroComponents[0].triggerEventHandler('delete',null);

    //Sprawdzamy czy metoda delete została wykonana z odopowiednim parametrem delete(heroes[0])
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  })

  it('should add new hero when add button is clicked', () => {
    //zwracamy observable z metody getHeroes z tablica heroes
    MockHeroService.getHeroes.and.returnValue(of(heroes));
    //wywolujemy ngOnInit
    fixture.detectChanges();
    const name = 'New Hero'
    //Wywolujemy metode z HeroesService addHeroes() i zwracamy observable poniewaz w metodzie add mamy subscribe!!!!
    MockHeroService.addHeroes.and.returnValue(of({ id: 5, name: name, strength: 22 }));
    //Pobieramy inputa
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    //Pobieramy buttona
    const button = fixture.debugElement.query(By.css('.add'));

    console.log(button);

    //Przypisujemy wartosc do inputa
    input.value = name;

    button.triggerEventHandler('click', null);
    button.triggerEventHandler('click', null);
    // Wymuszamy zmiane
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(text).toContain('New Hero');
  })

  it('should have correct route for the first hero', () => {
    //zwracamy observable z metody getHeroes z tablica heroes
    MockHeroService.getHeroes.and.returnValue(of(heroes));
    //wywolujemy ngOnInit
    fixture.detectChanges();
    //Pobieramy wszystkie heroComponenty
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    //Pobieramy routerLink
    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      //we must inject that class
      .injector.get(RouterLinkDirectiveStub);
    //pobieramy anchor i podpinamy clickEvent
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
    //sprawdzamy RouterLink
    expect(routerLink.navigatedTo).toBe('/detail/1');
  })
})
