import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sideBar') sideBarElementRef: ElementRef | undefined;
  unsubscribe$: Subject<void> = new Subject();
  constructor(
    private sharedService: SharedService,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }


  isOpened: boolean = false;
  ngOnInit(): void {
    this.sharedService.menuSubject$.subscribe(value => {
      this.isOpened = value;
      this.cd.detectChanges();
    });
    this.router.events.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.sharedService.menuSubject$.next(false);
      }
    })
  }

  ngAfterViewInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(event => {
        var menuIcon = this.document.getElementById("main-menu") as HTMLElement;
        if (event.target) {
          if (menuIcon.contains(event.target as Node)) {
            return;
          }
        }
        if (this.isOpened && this.sideBarElementRef && this.sideBarElementRef.nativeElement) {
          var result = this.sideBarElementRef.nativeElement.contains(event.target);
          if (!result) {
            this.sharedService.menuSubject$.next(false);
          }
        }
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
