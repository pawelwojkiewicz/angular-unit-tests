import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PrimeNgService } from './core/services/prime-ng.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private primeNgService: PrimeNgService) { }

  ngOnInit(): void {
    this.primeNgService.configInit();
  }
}
