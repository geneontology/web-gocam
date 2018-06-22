import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlHandlerService } from '../../core/url-handler.service';
import { UtilsService } from '../../core/utils.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;

  dataSource: MatTableDataSource<{}>;
  jsHeader = ["name", "gocams", "bps"];
  
  group;
  groupMeta;

  constructor(private groupService: GroupService,
              private urlHandler: UrlHandlerService,
              public utils: UtilsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.group = params['id'];

      this.groupService.getGroupMeta(this.group).subscribe(resp => {
        var json = JSON.parse(JSON.stringify(resp));
        json = json._body;
        this.groupMeta = JSON.parse(json);
        this.dataSource = new MatTableDataSource(this.groupMeta);
        this.isLoading = false;
//        console.log(this.groupMeta);
      });
      /*
      this.sparqlService.getGroupMetaData(this.group).subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        json = json._body;
        this.groupMeta = JSON.parse(json);
        console.log(this.groupMeta);
      });
      */
    });
  }

  ngOnDestroy(): void {
//    this.sub.unsubscribe();
  }  

  nbGOCAMs() {
    var nb = 0;
    this.groupMeta.forEach(element => {
      nb += +element.gocams;      
    });
    return nb;
  }

  nbContributors() {
    return this.groupMeta.length;
  }

}
