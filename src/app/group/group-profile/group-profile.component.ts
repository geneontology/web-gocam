import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlHandlerService } from '../../core/url-handler.service';
import { UtilsService } from '../../core/utils.service';
import { AbstractDataService } from '../../core/abstract-data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;

  dataSource: MatTableDataSource<{}>;
  jsHeader = ["name", "gocams"];

  group;
  groupMeta;

  newGroupMeta;

  mapCuratorGOCams;

  constructor(private dataService: AbstractDataService,
    private urlHandler: UrlHandlerService,
    public utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.group = params['id'];

      this.dataService.getGroupMetaData(this.group).subscribe(json => {
        this.groupMeta = json;

        // console.log("groupmeta: ", this.groupMeta);

        this.dataService.getGroupModelList(this.group).subscribe(json => {
          this.newGroupMeta = json;
          // console.log("ori: ", this.newGroupMeta);

          this.mapCuratorGOCams = new Map();
          var mapOrcids = new Map();
          for (let row of this.newGroupMeta) {
            for (var i = 0; i < row.names.length; i++) {
              var name = row.names[i];

              if (!this.groupMeta.find(elt => {
                return elt.name == name;
              })) continue;

              var set;
              if (this.mapCuratorGOCams.has(name)) {
                set = this.mapCuratorGOCams.get(name);
              } else {
                set = new Set();
                this.mapCuratorGOCams.set(name, set);
              }
              set.add(row.gocam);

              if (!mapOrcids.has(name)) {
                mapOrcids.set(name, row.orcids[i]);
              }
            }
          }

          // console.log("map: ", this.mapCuratorGOCams);

          var newJson = [];

          Array.from(this.mapCuratorGOCams.entries()).forEach(([key, value]) => {
            newJson.push({ name: key, orcid: mapOrcids.get(key), gocams: value.size, bps: "N/A" });
          })

          // console.log("json: ", newJson);
          this.groupMeta = newJson;
          this.dataSource = new MatTableDataSource(this.groupMeta);
          this.isLoading = false;

        })

      });


    });
  }

  ngOnDestroy(): void {
    //    this.sub.unsubscribe();
  }

  nbGOCAMs() {
    if (!this.newGroupMeta) return 'N/A';
    return this.newGroupMeta.length;
    // var nb = 0;
    // this.groupMeta.forEach(element => {
    //   nb += +element.gocams;      
    // });
    // return nb;
  }

  nbContributors() {
    if (!this.mapCuratorGOCams) return 'N/A';
    return this.mapCuratorGOCams.size;
    // var set = new Set();
    // this.newGroupMeta.forEach(element => {
    //   element.names.forEach(name => {
    //     set.add(name);
    //   });
    // });
    // return set.size;
    //    return this.groupMeta.length;
  }

}
