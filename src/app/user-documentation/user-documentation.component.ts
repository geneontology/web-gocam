import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-documentation',
  templateUrl: './user-documentation.component.html',
  styleUrls: ['./user-documentation.component.css']
})
export class UserDocumentationComponent implements OnInit {

  private userHTMLDoc: string = "http://wiki.geneontology.org/index.php/Noctua";

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    /*
    this._http.get(this.userHTMLDoc).subscribe(
      (html: any) => this.userHTMLDoc = html
    );
    */
  }

}
