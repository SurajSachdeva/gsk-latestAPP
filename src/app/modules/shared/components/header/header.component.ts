import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  get userName() {
    var userDetail = this.appService.getLoginUserDetail();
    if (userDetail) {
      return userDetail.UserName;
    } else {
      return "";
    }
  }

  constructor(private sharedService: SharedService, private appService: AppService) { }

  ngOnInit(): void {
  }

  openMenu() {
    this.sharedService.menuSubject$.next(true);
  }

  onLogOut() {
    this.appService.logOut();
  }


}
