import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { SearchDialogComponent } from '@app/containers/search-dialog/search-dialog.component';
import { sidenavIsOpen, State } from '@app/state';
import { HideSidenav, ShowSidenav } from '@app/state/sidenav/sidenav.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  opened: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private titleService: Title,
    private media: ObservableMedia,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.opened = this.store.pipe(select(sidenavIsOpen));
  }

  // logout() {
  //   this.authenticationService
  //     .logout()
  //     .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  // }

  // get username(): string | null {
  //   const credentials = this.authenticationService.credentials;
  //   return credentials ? credentials.username : null;
  // }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  closeSidenav() {
    this.store.dispatch(new HideSidenav());
  }

  openSidenav() {
    this.store.dispatch(new ShowSidenav());
  }

  toggleSidenav() {
    this.opened.pipe(first()).subscribe(open => {
      if (open) {
        return this.closeSidenav();
      }
      this.openSidenav();
    });
  }

  openDialog() {
    //close sidenav
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '320px'
    });
  }
}