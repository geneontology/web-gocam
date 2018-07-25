import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { UrlHandlerService } from '../core/url-handler.service';
import { PreferencesService } from '../core/preferences.service';
import { UtilsService } from '../core/utils.service';
import { GoRESTService } from '../core/gorest.service';
import { GoSPARQLService } from '../core/gosparql.service';
import { CacheService } from '../core/cache.service';
import { Meta } from '@angular/platform-browser';
import { PubmedRestService } from '../core/pubmed-rest.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-browse-models',
  templateUrl: './browse-models.component.html',
  styleUrls: ['./browse-models.component.scss']
})
export class BrowseModelsComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  isBufferLoading: boolean = true;
  date = new Date();

  pageSizes = [10, 25, 100];

  // can dynamically change the columns displayed
  displayedColumns = ['date', 'title', 'bps', 'mfs', 'ccs', 'gps', 'contributors', 'groups'];
  dataSource: MatTableDataSource<ModelData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];

  gorestSub: any;
  gotermsSub: any;
  gpSub: any;

  searchFilter: string = undefined;



  constructor(private goREST: GoRESTService,
    public urlHandler: UrlHandlerService,
    public prefs: PreferencesService,
    public pubmed: PubmedRestService,
    public utils: UtilsService,
    private cache: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Browse Gene Ontology Causal Activity Models to discover structured relations between gene products, biological processes and cellular locations.' });
  }



  /**
  * Initial Rendering of the Table (only first page)
   */
  ngOnInit() {
    window.scrollTo(0, 0);
    //    document.querySelector('[cdk-scrollable]').scrollTop = 0;
    //    document.querySelector('.mat-layout__content').scrollTop = 0;

    if (this.cache.hasDetailedModels()) {
      this.models = this.cache.getDetailedModels();
      this.updateTable(false);

    } else {
      // notes: 
      // - this is a first pass, loading only the models of the first page for fast rendering
      // - at this stage, no info is put in searchfield, it's done in ngAfterViewInit()
      //      let gotemp = this.goREST.getModelListRange(0, initialSize).subscribe(json => {
      let initialSize = this.pageSizes[0];
      let gotemp = this.goREST.getModelList().subscribe(json => {
        json.map(res => {
          this.models.push(res);
        })

//        this.updateTable(true);

        // Multiple Asynchroneous Calls to fill the Table, follow by a Table Update
        var gocams = this.extractModels(json);
        gocams.length = initialSize;
        this.fillWithGOs(gocams);

      });

    }
  }


  /**
   *  Complete Rendering of the Table (all models)
   */
  ngAfterViewInit() {
    // If and only if the table was not loaded from cache, then fill the Table with Meta Data
    if (!this.cache.hasDetailedModels()) {
      this.fillWithGOs(null);
    } else {
      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
  }

  afterFirstPass() {
    console.log("First page rendered");
//    this.fillWithGOs(null);
  }


  /** 
  * Delete Subscribers
  */
  ngOnDestroy(): void {
    if (this.gorestSub)
      this.gorestSub.unsubscribe();
    if (this.gotermsSub)
      this.gotermsSub.unsubscribe();
    if (this.gpSub)
      this.gpSub.unsubscribe();
  }


  /**
   * Fill the Table with GO-Terms meta data
   * @param gocams a list of GO-CAMs. If null, will search for GO-Terms for all GO-CAMs
   * @param callback callback function to launch when this task is done. Can be null
   */
  fillWithGOs(gocams) {
//    console.log("fillWithGOs(" + gocams + "): start");
    this.gotermsSub = this.goREST.getModelsGOs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if(tabelt) {
          tabelt.bp = this.extractGOs(element, BIOLOGICAL_PROCESS);
          tabelt.mf = this.extractGOs(element, MOLECULAR_FUNCTION);
          tabelt.cc = this.extractGOs(element, CELLULAR_COMPONENT);
        } else {
          console.warn("gocam <" + element.gocam + "> does not seem to have GO-Terms");
        }
      });
//      console.log("fillWithGOs(" + gocams + "): done");
      this.fillWithGPs(gocams);
    });
  }

  /**
   * Fill the Table with Gene Products meta data
   * @param gocams a list of GO-CAMs. If null, will search for Gene Products for all GO-CAMs 
   * @param callback callback function to launch when this task is done. Can be null
   */
  fillWithGPs(gocams) {
//    console.log("fillWithGPs(" + gocams + "): start");
    this.gpSub = this.goREST.getModelsGPs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if(tabelt) {
          tabelt.gp = this.extractGPs(element);
        } else {
          console.warn("gocam <" + element.gocam + "> does not seem to have Gene Products");
        }
      });
//      console.log("fillWithGPs(" + gocams + "): done");
      this.fillWithPMIDs(gocams);
    });
  }

  /**
   * Fill the Table with Gene Products meta data
   * @param gocams a list of GO-CAMs. If null, will search for Gene Products for all GO-CAMs 
   * @param callback callback function to launch when this task is done. Can be null
   */
  fillWithPMIDs(gocams) {
//    console.log("fillWithPMIDs(" + gocams + "): start");
    this.gpSub = this.goREST.getModelsPMIDs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if(tabelt) {
          tabelt.pmid = this.extractPMIDs(element);
        } else {
          console.warn("gocam <" + element.gocam + "> does not seem to have PMIDs");
        }
      });
      if(gocams == null) {
          this.cache.setDetailedModels(this.models);
      }
      this.createSearchField();
      this.updateTable(gocams != null);
    });
  }

  /** 
  * Create the Search Field to enable User Search
  * Note: this is a synchroneous method
  */
  createSearchField() {
    this.models.forEach(tabelt => {
      tabelt.searchfield = "";
      if (tabelt.bp && tabelt.bp.length > 0) {
        tabelt.bp.forEach(elt => {
          tabelt.searchfield += elt.name + " ";
        });
      }
      if (tabelt.mf && tabelt.mf.length > 0) {
        tabelt.mf.forEach(elt => {
          tabelt.searchfield += elt.name + " ";
        });
      }
      if (tabelt.cc && tabelt.cc.length > 0) {
        tabelt.cc.forEach(elt => {
          tabelt.searchfield += elt.name + " ";
        });
      }
      if (tabelt.gp && tabelt.gp.length > 0) {
        tabelt.gp.forEach(elt => {
          tabelt.searchfield += elt.fullName + " ";
        });
      }  
      if (tabelt.pmid && tabelt.pmid.length > 0) {
        tabelt.pmid.forEach(elt => {
          tabelt.searchfield += elt.pmid + " ";
        });
      }
    })
  }


  updateTable(isBufferLoading: boolean) {
    console.log("updateTable(buffer:" + isBufferLoading + ")");
    this.dataSource = new MatTableDataSource(this.models);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    let search = this.route.snapshot.paramMap.get('search');
    if (search) {
      this.searchFilter = search;
    }
    this.isLoading = false;
    this.isBufferLoading = isBufferLoading;
    this.applyFilter(this.searchFilter);

    if(isBufferLoading) {
      this.afterFirstPass();
    }
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.dataSource.filter = undefined;
      return;
    }
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }




  extractGOs(gocam, RootTerm) {
    var gos = [];
    var set = new Set();
    for (var i = 0; i < gocam.goclasses.length; i++) {
      if (gocam.goclasses[i] == RootTerm) {
        // should not be necessary, but I have seen some CCs duplicated
        if(set.has(gocam.goids[i]))
          continue;
        set.add(gocam.goids[i]);
        gos.push({
          id: gocam.goids[i],
          name: gocam.gonames[i],
          definition: gocam.definitions[i]
        });
      }
    }
    return gos.sort(this.compare);
  }

  extractGPs(gocam) {
    var gps = [];
    for (var i = 0; i < gocam.gpnames.length; i++) {
      if (!gocam.gpids[i]) {
        console.error("warning, gocam gp without id !", gocam);
        continue;
      }
      gps.push({
        id: gocam.gpids[i].replace("MGI:MGI", "MGI"),
        name: gocam.gpnames[i].indexOf("uniprot/") != -1 ? gocam.gpnames[i].substring(gocam.gpnames[i].lastIndexOf("/") + 1) : gocam.gpnames[i].substring(0, gocam.gpnames[i].lastIndexOf(" ")),
        species: gocam.gpnames[i].substring(gocam.gpnames[i].lastIndexOf(" ") + 1),
        fullName: gocam.gpnames[i].indexOf("uniprot/") != -1 ? gocam.gpnames[i].substring(gocam.gpnames[i].lastIndexOf("/") + 1) : gocam.gpnames[i]
      });
    }
    return gps.sort(this.compare);
  }

  extractPMIDs(gocam) {
    var pmids = [];
    for (var i = 0; i < gocam.sources.length; i++) {
      pmids.push({
        pmid: gocam.sources[i],
      });
    }
    return pmids.sort(this.compare);
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


  articleTooltip = "Please wait...";
  overpmid(pmid) {
    this.articleTooltip = "Please wait...";
    this.pubmed.getMeta(pmid)
      .subscribe(data => {
        this.articleTooltip = data.title + " -- " + data.authors[0].name + " (" + data.source + ", " + data.pubdate + ")";
      })
  }



  getSpeciesIcon(species: string) {
    //    console.log(species);

    switch (species) {
      case "Drer":
        return "";
      case "Cele":
        return "";
    }
    return "";
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
