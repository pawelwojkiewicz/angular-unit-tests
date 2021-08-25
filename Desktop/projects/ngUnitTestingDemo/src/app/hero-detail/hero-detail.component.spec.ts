import { TestBed, ComponentFixture } from '@angular/core/testing'
import { HeroDetailComponent } from './hero-detail.component'
import { HeroService } from '../hero.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('heroDetail', () => {
  //Sprawdzamy z jakich service'ów korzysta nasz komponent i je mockujemy
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService;
  let mockRouteService;
  let mockLocationService: Location
  beforeEach(() => {
    //Podajemy uzyte metody w mockach
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocationService = jasmine.createSpyObj(['back']);

    //dla routeService mozemy odrazu przypisac id
    //this.route.snapshot.paramMap.get('id')
    mockRouteService = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    }

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocationService },
        { provide: ActivatedRoute, useValue: mockRouteService },
      ]

    })
    //Tworzymy komponent
    fixture = TestBed.createComponent(HeroDetailComponent);
  })

  it('should render h2 name corectly', () => {

    // Zwracamy zmockowana observable
    mockHeroService.getHero.and.returnValue(of({ id: 4, name: 'New Hero Bros', strength: 33 }))
    fixture.detectChanges();

    //Przypisujemy name do zmiennej
    const name = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;

    //Sprawdzamy czy jest taka sama
    expect(name).toContain('NEW HERO BROS');
  })
})
