import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { CamSparqlService } from '../cam-sparql.service';
import { UrlHandlerService } from '../url-handler.service';
import { Router } from '@angular/router';
import { PreferencesService } from '../preferences.service';
import { FormatService } from '../format.service';

@Component({
  selector: 'app-browse-models',
  templateUrl: './browse-models.component.html',
  styleUrls: ['./browse-models.component.css']
})
export class BrowseModelsComponent implements OnInit {

  pageSizes = [10, 25, 100];

  // can dynamically change the columns displayed
  displayedColumns = ['date', 'title', 'bps', 'mfs', 'contributors', 'groups'];
  dataSource: MatTableDataSource<ModelData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];
  gos = new Map();
  bps = new Map();
  ccs = new Map();
  mfs = new Map();

  pos_left = "before";
  pos_right = "after";

  constructor(private sparqlService: CamSparqlService,
    private urlHandler: UrlHandlerService,
    private router: Router,
    public _prefs: PreferencesService,
    private format: FormatService) { }

  ngOnInit() {
    // loading the models
    this.sparqlService.getModelList(1).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);

      json.map(res => {
        this.models.push(res);
      });

      var gocams = this.extractModels(json);
      gocams.length = this.pageSizes[0];
      this.sparqlService.getModelsGOs(gocams).subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        json = json._body;
        json = JSON.parse(json);
        var tabelt;
        json.forEach(element => {
          tabelt = this.models.find(item => { return item.gocam == element.gocam });
          tabelt.bp = this.extractBPs(element);
          tabelt.mf = this.extractMFs(element);
          /*
          tabelt.searchfield = "";
          if(tabelt.bp.length > 0) {
            tabelt.bp.forEach(elt => {
              tabelt.searchfield += elt.name + " ";
            });
          }
          if(tabelt.mf.length > 0) {
            tabelt.mf.forEach(elt => {
              tabelt.searchfield += elt.name + " ";
            });
          }
          */
        });
      });

      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  /* complete the filling of the table */
  ngAfterViewInit() {
    this.sparqlService.getAllModelsGOs().subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        tabelt.bp = this.extractBPs(element);
        tabelt.mf = this.extractMFs(element);
        tabelt.searchfield = "";
        if(tabelt.bp.length > 0) {
          tabelt.bp.forEach(elt => {
            tabelt.searchfield += elt.name + " ";
          });
        }
        if(tabelt.mf.length > 0) {
          tabelt.mf.forEach(elt => {
            tabelt.searchfield += elt.name + " ";
          });
        }
      });
    });

  }



  extractBPs(gocam) {
    var bps = [];
    for (var i = 0; i < gocam.goclasses.length; i++) {
      if (gocam.goclasses[i] == BIOLOGICAL_PROCESS) {
        bps.push({
          id: gocam.goids[i],
          name: gocam.gonames[i],
          definition: gocam.definitions[i]
        });
      }
    }
    return bps;
  }

  extractMFs(gocam) {
    var mfs = [];
    for (var i = 0; i < gocam.goclasses.length; i++) {
      if (gocam.goclasses[i] == MOLECULAR_FUNCTION) {
        mfs.push({
          id: gocam.goids[i],
          name: gocam.gonames[i],
          definition: gocam.definitions[i]
        });
      }
    }
    return mfs;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  simplifyNames(names: string[]) {
    var snames = [];
    for (var i = 0; i < names.length; i++) {
      snames[i] = this.simplifyName(names[i]);
    }
    return snames;
  }

  // Format the name of the user
  simplifyName(name: string) {
    if (name.indexOf(" ") == -1)
      return name;
    // simple regex to divide name based on space or dash (differentiate last name dash and first name dash)
    var split = name.split(/\s|-(?=[a-zA-Zéèàïü]+\s)/);
    if (split.length == 1) {
      return name;
    }

    var firstNames = "";
    for (var i = 0; i < split.length - 1; i++) {
      firstNames += split[i].substring(0, 1) + ".";
    }
    return firstNames + split[split.length - 1];
  }

  extractOrcid(orcid: string): string {
    return this.sparqlService.getORCID(orcid);
  }

  extractModels(models) {
    return models.map(elt => this.extractModel(elt));
  }

  extractModel(model) {
    if (model.gocam.indexOf("gomodel:") != -1) {
      return model.gocam.substring(model.gocam.lastIndexOf(":") + 1);
    } else {
      return model.gocam.indexOf("/") != -1 ? model.gocam.substring(model.gocam.lastIndexOf("/") + 1) : model.gocam
    }
  }


  navigate(page) {
    //    this.router.navigate([page]);
    //    window.location.href = page;
    window.open(page, "_blank");
  }

  /* important for streaming data to the table, based on the current index */
  changeTablePage(event: PageEvent) {
    /*
    //    console.log("changing page: " , event);
    var gocams = this.extractModels(this.getModels(event));
    var temp = this.sparqlService.getModelsGOs(gocams).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
      //      this.correctGOTerms(json);
      for (var i = 0; i < json.length; i++) {
        if (!this.gos.has(json[i].gocam)) {
          this.gos.set(json[i].gocam, json[i]);
          //          console.log("thanks to the streaming on change page, adding: ", json[i].gocam, "\t", json[i]);
        }
      }
      this.createGOClasses(this.bps, this.mfs);
    })
    */
  }

  correctGOTerms(json) {
    console.log(json);
    var bpMap = new Map();

    var results = [];
    json.map(elt => {
      if (!bpMap.has(elt.goids)) {
        bpMap.set(elt.goids, elt);
      }
    });
    console.log(bpMap);
    return results;
  }

  getModels(event: PageEvent) {
    return this.models.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }


  bpToolTip(bp) {
    /*
    var id = this.format.extractURLID(bp.id);
    var def = bp.definition;
    return id + ": " + def;
    */
    return bp.definition;
  }

  mfToolTip(mf) {
    return mf.definition;
  }

}


export interface ModelData {
  gocam: string;
  date: string;
  title: string;
  orcids: string[];
  names: string[];
  groupids: string[];
  groupnames: string[];
  bp: [{
    id: string,
    name: string,
    definition: string
  }],
  mf: [{
    id: string,
    name: string,
    definition: string
  }],
  searchfield: string
  //  bpids: string[];
  //  bpnames: string[];
  //  mfids: string[];
  //  mfnames: string[];
}

var CELLULAR_COMPONENT = "http://purl.obolibrary.org/obo/GO_0005575";
var MOLECULAR_FUNCTION = "http://purl.obolibrary.org/obo/GO_0003674";
var BIOLOGICAL_PROCESS = "http://purl.obolibrary.org/obo/GO_0008150";
