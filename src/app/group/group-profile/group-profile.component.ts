import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlHandlerService } from '../../shared/url-handler.service';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  group;
  groupMeta;

  constructor(private groupService: GroupService,
              private urlHandler: UrlHandlerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.group = params['id'];
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

}
