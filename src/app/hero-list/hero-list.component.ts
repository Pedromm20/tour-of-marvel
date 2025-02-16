import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { Hero } from '../hero.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage: number = 0;
  limit: number = 24;
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(private marvelService: MarvelService, private router: Router) {}

  ngOnInit(): void {
    this.loadHeroes();
    this.setupSearch();
  }

  loadHeroes(): void {
    this.marvelService.getHeroes(this.limit, this.currentPage * this.limit).subscribe(response => {
      this.heroes = response;
    });
  }

  goToHeroDetail(heroId: number): void {
    this.router.navigate(['/hero', heroId]);
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

  nextPage(): void {
    this.currentPage++;
    this.loadHeroes();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadHeroes();
    }
  }
}
