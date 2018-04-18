import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { CamSparqlService } from '../cam-sparql.service';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  constructor(private sparqlHandler: CamSparqlService,
    private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.loadGroupMetaData();
  }

}
