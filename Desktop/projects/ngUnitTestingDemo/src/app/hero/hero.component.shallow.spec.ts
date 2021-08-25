import { TestBed, ComponentFixture } from '@angular/core/testing'
import { HeroComponent } from './hero.component'
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent (Shallow Test)', () => {

  let fixture: ComponentFixture<HeroComponent>; //Wrapper dla komponentu który ma więcej propert niz komponent - dla testów
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA] //ignroujemy nieznajome property,elemnty itd.
    })
    fixture = TestBed.createComponent(HeroComponent);
    //wchodzimy do wnetrza komponentu by pobrac @Input, @Output, property oraz metody
    // fixture.componentInstance.hero
  })

  it('should has the correct hero propert', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'test',
      strength: 22
    }

    expect(fixture.componentInstance.hero.name).toEqual('test');
  })

  it('should has hero name in anchor tag', () => {

    fixture.componentInstance.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 22
    }

    //Jesli mamy bindingi musimy odpalic detectChanges()
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
  })
})
