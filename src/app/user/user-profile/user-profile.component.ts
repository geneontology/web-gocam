import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UrlHandlerService } from '../../core/url-handler.service';
import { delay } from 'q';
import { AbstractDataService } from '../../core/abstract-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;

  found: boolean = true;
  step = 0;
  
  orcid: string;
  userMeta;
  groupMeta;

  userModels;
  userBPs;

  sub: any;

  constructor(public urlHandler: UrlHandlerService,
              private dataService : AbstractDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      window.scrollTo(0, 0);
      this.route.params.subscribe(params => {
      this.orcid = params['id'];
      this.sub = this.dataService.getUserMetaData(this.orcid).subscribe(json => {
        this.userMeta = json;
        this.isLoading = false;
//        console.log(this.userMeta);
      });
    });


    /*
    this.userService.loadUserMetaData().subscribe(data => {

      this.route.params.subscribe(params => {
        this.orcid = params['id'];
        this.userMeta = this.userService.getUserMetaDataByORCID(this.orcid);
        //        console.log("will search for: " + this.userMeta.organization);
        // then load the meta data of the group
        if (this.userMeta && this.userMeta.organization) {
          this.groupService.loadGroupMetaData().subscribe(data => {
            this.groupMeta = this.groupService.getGroupMetaDataByShorthand(this.userMeta.organization);
          });
        } else {
          console.warn("no user for ", this.orcid);
          this.found = false;
        }

        this.sparqlService.getUserModels(this.orcid).subscribe(data => {
          var json = JSON.parse(JSON.stringify(data));
          json = json._body;
          this.userModels = JSON.parse(json);
        });
            
      });

    })
    */
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  navigate(page: string) {
    //    this.router.navigate([page]);
    //    window.location.href = page;
    if(page.indexOf("MGI:MGI")) {
      page = page.replace("MGI:MGI", "MGI");
    }
    window.open(page, "_blank");
  }



}



export interface UserProfile {
  name: string;
  organization: string;
  affiliation: string[];
  productionModels: number;
  developmentModels: number;
  joinDate: Date;
}
