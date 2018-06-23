import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { UrlHandlerService } from '../core/url-handler.service';
import { PreferencesService } from '../core/preferences.service';
import { UtilsService } from '../core/utils.service';
import { GoRESTService } from '../core/gorest.service';
import { GoSPARQLService } from '../core/gosparql.service';
import { CacheService } from '../core/cache.service';

@Component({
  selector: 'app-browse-models',
  templateUrl: './browse-models.component.html',
  styleUrls: ['./browse-models.component.scss']
})
export class BrowseModelsComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  date = new Date();
  
  pageSizes = [10, 25, 100];

  // can dynamically change the columns displayed
//  displayedColumns = ['date', 'title', 'bps', 'mfs', 'gps', 'contributors', 'groups'];
  displayedColumns = ['date', 'title', 'bps', 'mfs', 'contributors', 'groups'];
  dataSource: MatTableDataSource<ModelData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];
  gos = new Map();
  bps = new Map();
  ccs = new Map();
  mfs = new Map();
  gps = new Map();

  gorestSub: any;
  gotermsSub: any;

  searchFilter: string;




  constructor(private goREST: GoRESTService,
    private urlHandler: UrlHandlerService,
    public prefs: PreferencesService,
    public utils: UtilsService,
    private gosparql: GoSPARQLService,
    private cache: CacheService,
    private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit() {
    window.scrollTo(0, 0);
//    document.querySelector('[cdk-scrollable]').scrollTop = 0;
//    document.querySelector('.mat-layout__content').scrollTop = 0;
    let initialSize = this.pageSizes[0];


    // SOME CACHE ALREADY EXIST
    if (this.cache.hasModelList()) {
      console.log("**** USING CACHE");
      var json = this.cache.getModelList();
      json.forEach(elt => {
        this.models.push(elt);
      });
      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      let search = this.route.snapshot.paramMap.get('search');
      if (search) {
        this.searchFilter = search;
      }
      this.isLoading = false;

      
    // LOAD IT FROM THE API
    } else {

      // REST API REQUEST
      this.gorestSub = this.goREST.getModelList().subscribe(data => {
        //    this.gorestSub = this.goREST.getModelListRange(0, initialSize).subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        json = json._body;
        json = JSON.parse(json);
        this.cache.setModelList(json);
        json.map(res => {
          this.models.push(res);
        });

        var gocams = this.extractModels(json);
        gocams.length = initialSize;
        this.gotermsSub = this.goREST.getModelsGOs(gocams).subscribe(data => {
          var json = JSON.parse(JSON.stringify(data));
          json = json._body;
          json = JSON.parse(json);
          var tabelt;
          json.forEach(element => {
            tabelt = this.models.find(item => { return item.gocam == element.gocam });
            tabelt.bp = this.extractBPs(element);
            tabelt.mf = this.extractMFs(element);
            // note: not yet puting any info in the searchfield to enable the search, as is is done by the background query in ngAfterViewInit()
          });
        });

        /*
        this.gotermsSub = this.goREST.getModelsGPs(gocams).subscribe(data => {
          var json = JSON.parse(JSON.stringify(data));
          json = json._body;
          json = JSON.parse(json);
          var tabelt;
          json.forEach(element => {
            tabelt = this.models.find(item => { return item.gocam == element.gocam });
            tabelt.gp = this.extractGPs(element);
            //            console.log("after: " , tabelt);
            // note: not yet puting any info in the searchfield to enable the search, as is is done by the background query in ngAfterViewInit()
          });
        });
        */

        this.dataSource = new MatTableDataSource(this.models);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let search = this.route.snapshot.paramMap.get('search');
        if (search) {
          this.searchFilter = search;
        }
        this.isLoading = false;

      });
    }


  }

  ngOnDestroy(): void {
    if (this.gorestSub)
      this.gorestSub.unsubscribe();
    if (this.gotermsSub)
      this.gotermsSub.unsubscribe();
  }


  /* complete the filling of the table */
  ngAfterViewInit() {
    //    this.loadGOFromSPARQL();
    //    this.loadGOFromLambda();
    if (this.cache.hasModelList()) {
      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter(this.searchFilter);
    }

    if (!this.cache.hasModelsGOs()) {
      console.log("LOADING ALL GOs");
      this.loadGOFromLambda();
      this.loadGPFromSPARQL();
    }
  }


  loadGOFromLambda() {
    this.goREST.getAllModelsGOs().subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
      this.cache.setModelsGOs(json);
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if (!tabelt) {
          console.error("could not find ", element.gocam);
        } else {
          tabelt.bp = this.extractBPs(element);
          tabelt.mf = this.extractMFs(element);
          tabelt.searchfield = "";
          if (tabelt.bp.length > 0) {
            tabelt.bp.forEach(elt => {
              tabelt.searchfield += elt.name + " ";
            });
          }
          if (tabelt.mf.length > 0) {
            tabelt.mf.forEach(elt => {
              tabelt.searchfield += elt.name + " ";
            });
          }
        }
      });
      this.applyFilter(this.searchFilter);
    });
  }

  loadGOFromSPARQL() {
    this.gosparql.getAllModelsGOs().subscribe(resp => {
      var json = JSON.parse(JSON.stringify(resp));
      json = json._body;
      json = JSON.parse(json);

      var jsmod = this.transformModelsGOs(json.results.bindings);
      var tabelt;
      jsmod.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        tabelt.bp = this.extractBPs(element);
        tabelt.mf = this.extractMFs(element);
        tabelt.searchfield = "";
        if (tabelt.bp.length > 0) {
          tabelt.bp.forEach(elt => {
            tabelt.searchfield += elt.name + " ";
          });
        }
        if (tabelt.mf.length > 0) {
          tabelt.mf.forEach(elt => {
            tabelt.searchfield += elt.name + " ";
          });
        }
      });
    })
  }


  loadGPFromSPARQL() {
    this.gosparql.getAllModelsGPs().subscribe(resp => {
      var json = JSON.parse(JSON.stringify(resp));
      json = json._body;
      json = JSON.parse(json);

      //      console.log("full: ", json);
      var jsmod = this.transformModelsGPs(json.results.bindings);
      //      console.log("transformed: ", jsmod);
      var tabelt;
      jsmod.forEach(element => {
        if (element.gpids.length > 1) {
          console.log(element);
        }
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if (tabelt) {
          tabelt.gp = this.extractGPs(element);
          if (!tabelt.searchfield)
            tabelt.searchfield = "";
          if (tabelt.gp.length > 0) {
            tabelt.gp.forEach(elt => {
              tabelt.searchfield += elt.name + " ";
            });
          }
        } else {
//          console.warn("Element Not Found: ", element);
        }
      });
    })
  }

  transformModelsGOs(json) {
    var gomapids = new Map();
    var gomapclasses = new Map();
    var gomapnames = new Map();
    var gomapdefs = new Map();
    var goids = [];
    var goclasses = [];
    var gonames = [];
    var godefs = [];
    json.forEach(element => {
      if (gomapids.has(element.models.value)) {
        goids = gomapids.get(element.models.value);
      } else {
        goids = [];
        gomapids.set(element.models.value, goids);
      }
      goids.push(element.goid.value);

      if (gomapclasses.has(element.models.value)) {
        goclasses = gomapclasses.get(element.models.value);
      } else {
        goclasses = [];
        gomapclasses.set(element.models.value, goclasses);
      }
      goclasses.push(element.GO_class.value);

      if (gomapnames.has(element.models.value)) {
        gonames = gomapnames.get(element.models.value);
      } else {
        gonames = [];
        gomapnames.set(element.models.value, gonames);
      }
      gonames.push(element.goname.value);

      if (gomapdefs.has(element.models.value)) {
        godefs = gomapdefs.get(element.models.value);
      } else {
        godefs = [];
        gomapdefs.set(element.models.value, godefs);
      }
      godefs.push(element.definition.value);
    });

    console.log("gomapids: ", gomapids);
    var jsmodified = [];


    gomapids.forEach((value: any, key: any, map: Map<any, any>) => {
      jsmodified.push({
        "gocam": key,
        "goclasses": gomapclasses.get(key),
        "goids": value,
        "gonames": gomapnames.get(key),
        "definitions": gomapdefs.get(key)
      });
    });

    return jsmodified;
  }




  transformModelsGPs(json) {
    var gomapgpids = new Map();
    var gomapnames = new Map();
    var gpids = [];
    var gpnames = [];

    json.forEach(element => {
      if (gomapgpids.has(element.models.value)) {
        gpids = gomapgpids.get(element.models.value);
      } else {
        gpids = [];
        gomapgpids.set(element.models.value, gpids);
      }
      gpids.push(element.identifiers.value);

      if (gomapnames.has(element.models.value)) {
        gpnames = gomapnames.get(element.models.value);
      } else {
        gpnames = [];
        gomapnames.set(element.models.value, gpnames);
      }
      gpnames.push(element.names.value);

    });

    console.log("gomapids: ", gomapgpids);
    var jsmodified = [];


    gomapgpids.forEach((value: any, key: any, map: Map<any, any>) => {
      jsmodified.push({
        "gocam": key,
        "gpids": this.getField(value),
        "gpnames": gomapnames.get(key),
      });
    });

    return jsmodified;
  }


  getField(field: string) {
    if (field.indexOf(";") == -1) {
      return field;
    }
    return field.split(";");
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
    return bps.sort(this.compare);
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
    return mfs.sort(this.compare);
  }

  extractGPs(gocam) {
    var gps = [];
    for (var i = 0; i < gocam.gpnames.length; i++) {
      gps.push({
        id: gocam.gpids[i].replace("MGI:MGI", "MGI"),
        name: gocam.gpnames[i],
      });
    }
    return gps.sort(this.compare);
  }





  applyFilter(filterValue: string) {
//    console.log("keydown:applyfilter(" + filterValue + "; " + this.searchFilter + ")");

    if (!filterValue) {
      this.dataSource.filter = undefined;
      return;
    }
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


  ols(page) {
    //    this.router.navigate([page]);
    //    window.location.href = page;
    window.open("https://www.ebi.ac.uk/ols/ontologies/go/terms?iri=" + page, "_blank");
  }

  navigate(modelId) {
    //    this.router.navigate([page]);
    //    window.location.href = page;
    let page = this.urlHandler.getPathwayView(modelId);
    window.open(page, "_blank");
  }

  open(page) {
    window.open(page, "_blank");
  }

  /* important for streaming data to the table, based on the current index */
  changeTablePage(event: PageEvent) {
    /*
    //    console.log("changing page: " , event);
    var gocams = this.extractModels(this.getModels(event));
    var temp = this.goREST.getModelsGOs(gocams).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        tabelt.bp = this.extractBPs(element);
        tabelt.mf = this.extractMFs(element);
        // note: not yet puting any info in the searchfield to enable the search, as is is done by the background query in ngAfterViewInit()
      });
    });
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
    var id = this.utils.extractURLID(bp.id);
    var def = bp.definition;
    return id + ": " + def;
    */
    return bp.definition;
  }

  mfToolTip(mf) {
    return mf.definition;
  }


  compare(a, b) {
    if (a.id < b.id) {
      return 1;
    }
    return -1;
  }

  filterFocus() {
    //    console.log("filter got focus");
    //    this.loadGO();
  }

  rowClicked(event) {

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
