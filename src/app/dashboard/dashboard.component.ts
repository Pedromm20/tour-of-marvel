import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelService } from '../services/marvel.service';
import { Hero } from '../hero.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(private marvelService: MarvelService, private router: Router) {}

  ngOnInit(): void {
    this.getRandomHeroes();
    this.setupSearch();
  }

  getRandomHeroes(): void {
    const offset = Math.floor(Math.random() * 1500);
    this.marvelService.getHeroes(24, offset).subscribe(response => {
      this.heroes = response;
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.marvelService.searchHeroes(term))
    ).subscribe(response => {
      this.heroes = response;
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/hero', id]);
  }
}
