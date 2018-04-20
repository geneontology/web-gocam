import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CamSparqlService } from '../cam-sparql.service';
import { UrlHandlerService } from '../url-handler.service';

@Component({
  selector: 'app-browse-models',
  templateUrl: './browse-models.component.html',
  styleUrls: ['./browse-models.component.css']
})
export class BrowseModelsComponent implements OnInit {

  displayedColumns = ['date', 'title', 'species', 'contributors'];
  dataSource: MatTableDataSource<ModelData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];

  constructor(private sparqlService: CamSparqlService,
    private urlHandler: UrlHandlerService) { }

  ngOnInit() {

    this.sparqlService.getModelListDetails(1).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
//      console.log("json:", json);

      json.map(res => {
        this.models.push(res);
      });
      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    /*
    json.map(res => {
      let tmp = {
        "gomodel" : res.id.value,
        "date": res.date.value,
        "title": res.title.value.trim(),
        "orcid": res.orcid.value.includes("GOC:")?undefined:res.orcid.value.trim(),
        "name": res.name? this.simplifyName(res.name.value.trim()):res.orcid.value.trim()
      }
      this.models.push(tmp);
      this.dataSource = new MatTableDataSource(this.models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        });
    });
    */

  }



  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  simplifyNames(names: string[]) {
    var snames = [];
    for(var i = 0; i < names.length; i++) {
      snames[i] = this.simplifyName(names[i]);
    }
    return snames;
  }

  // Format the name of the user
  simplifyName(name: string) {
    if(name.indexOf(" ") == -1)
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

}


export interface ModelData {
  gocam: string;
  date: string;
  title: string;
  orcids: string[];
  names: string[];
}