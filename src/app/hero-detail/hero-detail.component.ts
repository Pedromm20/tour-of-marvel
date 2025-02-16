import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from '../services/marvel.service';
import { Hero } from '../hero.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero | null;  
  isLoading: boolean = true;  
  hasError: boolean = false;  

  descriptionOpen: boolean = false;
  seriesOpen: boolean = false;
  eventsOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    this.marvelService.getHero(id).subscribe({
      next: (hero) => {
        if (hero) {
          this.hero = hero;
          this.isLoading = false;
        } else {
          this.hasError = true;
        }
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  toggleSection(section: string): void {
    if (section === 'description') {
      this.descriptionOpen = !this.descriptionOpen;
    } else if (section === 'series') {
      this.seriesOpen = !this.seriesOpen;
    } else if (section === 'events') {
      this.eventsOpen = !this.eventsOpen;
    }
  }
  goBack(): void {
    this.router.navigate(['/heroes']);
  }
}
