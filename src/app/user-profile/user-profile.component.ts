import { Component, OnInit } from '@angular/core';
import { CamSparqlService } from '../cam-sparql.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { UrlHandlerService } from '../url-handler.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  found: boolean = true;

  orcid: string;
  userMeta;
  groupMeta;

  userModels;
  userBPs;

  constructor(private sparqlService: CamSparqlService,
    private urlHandler: UrlHandlerService,
    private userService: UserService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orcid = params['id'];
      this.sparqlService.getUserMetaData(this.orcid).subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        json = json._body;
        this.userMeta = JSON.parse(json);
        console.log(this.userMeta);
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


}



export interface UserProfile {
  name: string;
  organization: string;
  affiliation: string[];
  productionModels: number;
  developmentModels: number;
  joinDate: Date;
}