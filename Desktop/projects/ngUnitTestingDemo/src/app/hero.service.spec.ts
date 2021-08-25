import { TestBed } from '@angular/core/testing'
import { HeroService } from './hero.service'
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroService', () => {

  let mockMessageService: MessageService;
  let httpTestingControler: HttpTestingController
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']); //Tworzymy mock z metoda add
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService } //mockujemy MessageService
      ]
    })

    httpTestingControler = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  //Testujemy metode getHero
  describe('getHero', () => {
    it('should call get method with correct URL', () => {
      //wykonujemy metode getHero()
      heroService.getHero(4).subscribe(); // odpali sie dopiero po req.flush() kiedy uzywamy mockHttp
      //tworzymy request i podajemy URL API zeby zrobic call
      const req = httpTestingControler.expectOne('api/heroes/4');
      //metoda flush podajemy dane jakie chcemy zeby przyszly (jakiekolwiek)
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingControler.verify();
    })
  })
})
