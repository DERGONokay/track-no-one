import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  displayedColumns = ["id", "description"]
  events = new MatTableDataSource<Experience>()

  resultsLength = 0
  @ViewChild(MatPaginator) paginator?: MatPaginator

  constructor(experienceService: ExperienceService) {
    experienceService.findAll()
      .then(experience => {
        this.resultsLength = experience.length
        this.events.data = experience
        console.log(this.events.data)
      })
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.events.paginator = this.paginator!!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.events.filter = filterValue.trim().toLowerCase();
  }

}