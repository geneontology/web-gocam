import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { UrlHandlerService } from '../core/url-handler.service';
import { PreferencesService } from '../core/preferences.service';
import { UtilsService } from '../core/utils.service';
import { CacheService } from '../core/cache.service';
import { Meta } from '@angular/platform-browser';
import { PubmedRestService } from '../core/pubmed-rest.service';
import { Subject } from 'rxjs/Subject';
import { AbstractDataService } from '../core/abstract-data.service';
import { AuthService } from '../shared/auth.service';

import { CurieUtilService } from '../core/curie-util.service';



// export enum DataColumn {
//   Date = "date",
//   Title = "title",
//   BiologicalProcess = "bps",
//   MolecularFunction = "mfs",
//   CellularComponent = "ccs",
//   GeneProduct = "gps"
// }


@Component({
  selector: 'app-browse-models',
  templateUrl: './browse-models.component.html',
  styleUrls: ['./browse-models.component.scss']
})
export class BrowseModelsComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  isBufferLoading: boolean = true;
  date = new Date();

  @Input()
  showDevModels: boolean = false;
  @Input()
  showReviewModels: boolean = false;

  pageSizes = [10, 25, 100];


  // can dynamically change the columns displayed
  //  allColumns = ['Title', 'Molecular Function', 'Gene Product', 'Biological Process', 'Cellular Component', 'Contributor', 'Group', 'Date'];
  //  displayedColumns = ['Title', 'Molecular Function', 'Gene Product', 'Biological Process', 'Cellular Component', 'Group'];
  allColumns = ['Title', 'Biological Process', 'Molecular Function', 'Cellular Component', 'Gene Product', 'Contributor', 'Group', 'Date'];
  displayedColumns = ['Title', 'Biological Process', 'Molecular Function', 'Cellular Component', 'Gene Product', 'Group'];
  //displayedColumns = ['title', 'bps', 'mfs', 'ccs', 'gps',  'groups'];
  dataSource: MatTableDataSource<ModelData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];

  gorestSub: any;
  gotermsSub: any;
  gpSub: any;

  searchFilter: string = undefined;



  //  dataColumns: string[] = ["date", "title", "bps", "mfs", "ccs", "gps", "contributors", "groups"];

  constructor(private dataService: AbstractDataService,
    public urlHandler: UrlHandlerService,
    public prefs: PreferencesService,
    public pubmed: PubmedRestService,
    public utils: UtilsService,
    private cache: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private curieService: CurieUtilService,
    private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Browse Gene Ontology Causal Activity Models to discover structured relations between gene products, biological processes and cellular locations.' });
  }



  /**
  * Initial Rendering of the Table (only first page)
   */
  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.cache.hasDetailedModels()) {
      this.models = this.cache.getDetailedModels();
      this.updateTable(false);

    } else {
      // notes: 
      // - this is a first pass, loading only the models of the first page for fast rendering
      // - at this stage, no info is put in searchfield, it's done in ngAfterViewInit()
      //      let gotemp = this.goREST.getModelListRange(0, initialSize).subscribe(json => {
      let initialSize = this.pageSizes[0];
      let gotemp = this.dataService.getModelList().subscribe(json => {
        json.map(res => {
          this.models.push(res);
        })

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
      this.setFilterPredicates();
    }
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
    this.gotermsSub = this.dataService.getModelsGOs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if (tabelt) {
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
    this.gpSub = this.dataService.getModelsGPs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if (tabelt) {
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
    this.gpSub = this.dataService.getModelsPMIDs(gocams).subscribe(json => {
      var tabelt;
      json.forEach(element => {
        tabelt = this.models.find(item => { return item.gocam == element.gocam });
        if (tabelt) {
          tabelt.pmid = this.extractPMIDs(element);
        } else {
          console.warn("gocam <" + element.gocam + "> does not seem to have PMIDs");
        }
      });
      if (gocams == null) {
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

      let gocamid = "gomodel:" + this.curieService.getCurie(tabelt.gocam);
      let state = tabelt.state ? tabelt.state : "";

      tabelt.searchfield = tabelt.gocam + " " + gocamid + " " + state;

      if (tabelt.title && tabelt.title.length > 0) {
        tabelt.searchfield += tabelt.title + " ";
      }
      if (tabelt.date && tabelt.date.length > 0) {
        tabelt.searchfield += tabelt.date + " ";
      }

      if (tabelt.names && tabelt.names.length > 0) {
        tabelt.names.forEach(elt => {
          tabelt.searchfield += elt + " ";
        });
      }
      if (tabelt.orcids && tabelt.orcids.length > 0) {
        tabelt.orcids.forEach(elt => {
          tabelt.searchfield += elt + " ";
        });
      }
      if (tabelt.groupnames && tabelt.groupnames.length > 0) {
        tabelt.groupnames.forEach(elt => {
          tabelt.searchfield += elt + " ";
        });
      }

      if (tabelt.bp && tabelt.bp.length > 0) {
        tabelt.bp.forEach(elt => {
          tabelt.searchfield += elt.name + " " + elt.id + " " + elt.id.replace("_", ":");
        });
      }
      if (tabelt.mf && tabelt.mf.length > 0) {
        tabelt.mf.forEach(elt => {
          tabelt.searchfield += elt.name + " " + elt.id + " " + elt.id.replace("_", ":");
        });
      }
      if (tabelt.cc && tabelt.cc.length > 0) {
        tabelt.cc.forEach(elt => {
          tabelt.searchfield += elt.name + " " + elt.id + " " + elt.id.replace("_", ":");
        });
      }
      if (tabelt.gp && tabelt.gp.length > 0) {
        tabelt.gp.forEach(elt => {
          tabelt.searchfield += elt.fullName + " " + elt.id;
        });
      }
      if (tabelt.pmid && tabelt.pmid.length > 0) {
        tabelt.pmid.forEach(elt => {
          tabelt.searchfield += elt.pmid + " ";
        });
      }

      tabelt.searchfield = tabelt.searchfield.toLowerCase();
    })

  }



  /**
   * Update the Data Table
   * @param isBufferLoading is true, the UI should display that some buffers are still loading
   */
  updateTable(isBufferLoading: boolean) {
    //    console.log("updateTable(buffer:" + isBufferLoading + ")");
    this.dataSource = new MatTableDataSource(this.models);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setFilterPredicates();

    let search = this.route.snapshot.paramMap.get('search');
    if (search) {
      this.searchFilter = search;
    }
    this.isLoading = false;
    this.isBufferLoading = isBufferLoading;
    this.applyFilter(this.searchFilter);

  }


  /** 
  * Change how the filter is applied
  */
  setFilterPredicates() {
    this.dataSource.filterPredicate =
      (data, filters: string) => {
        //        let devprod = this.showDevModels ? "development" : "production";

        const columns = data.searchfield.split(" ");
        const matchFilter = [];

        if (filters.includes(" or ")) {
          const filterArray = filters.toLowerCase().split(" or ");
          filterArray.forEach(filter => {
            const customFilter = [];
            columns.forEach(column => customFilter.push(column.includes(filter)));
            matchFilter.push(customFilter.some(Boolean)); // OR
          });
          return matchFilter.some(Boolean); // AND

        } else {
          const filterArray = filters.toLowerCase().split(" ");
          filterArray.forEach(filter => {
            const customFilter = [];
            columns.forEach(column => customFilter.push(column.includes(filter)));
            matchFilter.push(customFilter.some(Boolean)); // OR
          });
          return matchFilter.every(Boolean); // AND
        }

      }
  }


  oldIndex = 0;
  // applyFilter(filterValue: string) {
  //   if (!filterValue) {
  //     this.dataSource.filter = undefined;

  //     // go back to original page
  //     this.paginator.pageIndex = this.oldIndex;
  //     this.paginator.page.next({
  //       pageIndex: this.oldIndex,
  //       pageSize: this.paginator.pageSize,
  //       length: this.paginator.length
  //     });
  //     return;
  //   }

  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  //   this.oldIndex = this.paginator.pageIndex;
  //   this.paginator.firstPage();
  // }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.dataSource.filter = undefined;
      // if(this.showDevModels) {
      //   this.dataSource.filter = undefined;
      // } else {
      //   this.dataSource.filter = "production";
      // }

      // go back to original page
      this.paginator.pageIndex = this.oldIndex;
      this.paginator.page.next({
        pageIndex: this.oldIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
      return;
    }

    // let devprod = this.showDevModels ? "development" : "production";
    // filterValue = filterValue.trim() + " " + devprod; // Remove whitespace
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.oldIndex = this.paginator.pageIndex;
    this.paginator.firstPage();
  }



  extractGOs(gocam, RootTerm) {
    var gos = [];
    var set = new Set();
    for (var i = 0; i < gocam.goclasses.length; i++) {
      if (gocam.goclasses[i] == RootTerm) {
        // should not be necessary, but I have seen some CCs duplicated
        if (set.has(gocam.goids[i]))
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
        // I have made that a silent warning, since this is a problem with NEO:
        // https://github.com/geneontology/neo/issues/32
        // console.error("warning, gocam gp without id !", gocam);
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
        let authors = data.authors[0].name;
        if (data.authors.length > 0)
          authors = data.authors[0].name + " et al."
        this.articleTooltip = data.title + " -- " + authors + " (" + data.source + ", " + data.pubdate + ")";
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

  // for test purposes only
  onDevModelChange(event) {
    this.showDevModels = !this.showDevModels;
    this.applyFilter(this.searchFilter);
  }


  changeSelection(event) {
    console.log("change: ", event.value);
    this.displayedColumns = event.value;
  }


  isObject(val) {
    return val instanceof Object && !Array.isArray(val);
  }

  stringify(data) {
    var str = "";
    Object.keys(data).forEach(field => {

      // we don't want search field which is already an aggregate
      if (field != "searchfield") {

        // if one of the field is an object (but not an array)
        if (this.isObject(data[field])) {
          str += this.stringify(data[field]);

          // if one of the field is an array
        } else if (Array.isArray(data[field])) {
          let array = "";
          data[field].forEach(elt => {
            if (this.isObject(elt)) {
              array += this.stringify(elt);
            } else {
              array += elt + "; ";
            }
          });
          if (array.endsWith("; ")) {
            array = "[" + array.substring(0, array.length - 3) + "]";
          }
          if (array.length == 0) {
            array = "[N/A]";
          }
          str += array + "\t";

          // else
        } else {
          if (data[field]) {
            if (this.isObject(data[field])) {
              str += this.stringify(data[field]);
            } else {
              str += data[field] + "\t";
            }
          } else {
            str += "N/A\t";
          }
        }

      }

    });
    return str;
  }

  customStringify(row) {
    var str = row.date + "\t" + row.gocam + "\t" + row.title;
    if (row.bp && row.bp.length > 0) {
      str += "\t" + row.bp.map(elt => { return elt.name + " (" + elt.id + ")" }).join("; ")
    } else {
      str += "\tN/A";
    }
    if (row.mf && row.mf.length > 0) {
      str += "\t" + row.mf.map(elt => { return elt.name + " (" + elt.id + ")" }).join("; ")
    } else {
      str += "\tN/A";
    }
    if (row.cc && row.cc.length > 0) {
      str += "\t" + row.cc.map(elt => { return elt.name + " (" + elt.id + ")" }).join("; ")
    } else {
      str += "\tN/A";
    }
    if (row.gp && row.gp.length > 0) {
      str += "\t" + row.gp.map(elt => { return elt.fullName + " (" + elt.id + ")" }).join("; ")
    } else {
      str += "\tN/A";
    }
    return str;
  }

  clipboard(row) {
    console.log("clipboard: ", row);

    const el = document.createElement('textarea');
    el.value = this.customStringify(row);
    //    el.value = this.stringify(row);
    //    el.value = JSON.stringify(row);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);


    // let selBox = document.createElement('temp-clipboard');
    // selBox.style.position = 'fixed';
    // selBox.style.left = '0';
    // selBox.style.top = '0';
    // selBox.style.opacity = '0';
    // selBox.nodeValue = event;
    // document.body.appendChild(selBox);
    // selBox.focus();
    // document.execCommand('copy');
    // document.body.removeChild(selBox);

  }

  findSimilar(queryModel, max: number = 10) {
    console.log("ask to search for models similar to ", queryModel);

    let results = [];
    let scoreA, scoreB, score;
    this.models.forEach(model => {
      scoreA = this.scoreModel(queryModel, model);
      scoreB = this.scoreModel(model, queryModel);
      score = (scoreA + scoreB) / 2.0;
      // score = this.scoreModel(model, queryModel);

      if (score >= 0.5) {
        if (results.length < max) {
          results.push({ "score": score, "gocam": model.gocam });
        } else {
          for (let i = 0; i < results.length; i++) {
            if (results[i].score < score) {
              results[i] = { "score": score, "gocam": model.gocam };
              break;
            }
          }
        }
      }
    });

    console.log("RESULTS:");
    let list = "";
    results.forEach(elt => {
      console.log(elt);
      list += elt.gocam.substring(elt.gocam.lastIndexOf("/") + 1) + " OR ";
    })

    if (list.length > 0) {
      list = list.substring(0, list.length - 3).trim();
    }
    this.searchFilter = list;

    this.applyFilter(list);

    window.scrollTo(0, 0);

    return results;
  }

  scoreModel(model1, model2) {
    var score = 0;
    let divider = 0;

    if ((model1["bp"] && model1["bp"].length > 0) || (model2["bp"] && model2["bp"].length > 0)) {
      score += this.scoreGO(model1, model2, "bp");
      divider++;
    }

    if ((model1["mf"] && model1["mf"].length > 0) || (model2["mf"] && model2["mf"].length > 0)) {
      score += this.scoreGO(model1, model2, "mf");
      divider++;
    }

    if ((model1["cc"] && model1["cc"].length > 0) || (model2["cc"] && model2["cc"].length > 0)) {
      score += this.scoreGO(model1, model2, "cc");
      divider++;
    }

    if (divider == 0)
      return 0;
    return score / divider;
  }

  scoreGO(model1, model2, type) {
    var scorego = 0.0;
    if (model1[type] && model1[type].length > 0
      && model2[type] && model2[type].length > 0) {
      for (let m1 = 0; m1 < model1[type].length; m1++) {
        for (let m2 = 0; m2 < model2[type].length; m2++) {
          if (model1[type][m1].id == model2[type][m2].id) {
            scorego++;
            break;
          }
        }
      }
      scorego /= model1[type].length;
    }
    return scorego;
  }

  extractGPid(gpuri) {
    var id = gpuri;
    if (id.indexOf("/") != -1) {
      id = id.substring(id.lastIndexOf("/") + 1);
    }
    return id.trim();
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
