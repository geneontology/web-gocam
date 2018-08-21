import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  pageDimmed = false;


  fbs = [
    {
      value: "site",
      viewValue: "Web Site"
    },
    {
      value: "model_general",
      viewValue: "GO-CAM: in general"
    },
    {
      value: "model_specific",
      viewValue: "GO-CAM: a precise model"
    },
    
    {
      value: "sparql",
      viewValue: "SPARQL endpoint"
    },
    {
      value: "rest",
      viewValue: "REST endpoint"
    },
  ];
  constructor(public prefs: PreferencesService,
              private auth: AuthService) { }

  ngOnInit() {
  }

  deactivateToolTip() {
    console.log("ask to deactivate tooltip");
    
  }

  menuClicked(tooltip) {
    console.log(tooltip);
    this.prefs.toggleSideNav();
    tooltip.hide(); 
  }

  // for test purposes only
  onAuthenticated(event) {
    this.auth.setIsAuthenticated(!this.auth.isAuthenticated());
  }

  invalidFeedback = false;

  send(email, type, message) {
    // console.log("email.value: " + email.value + "\ntype.value: " + type.value + "\nmessage.value: " + message.value);
    if(!type.value || message.value.length == 0) {
      this.invalidFeedback = true;
    } else {
      this.auth.sendFeedback(this.fbs.find(elt => { return elt.value == type.value }).viewValue, email.value, message.value);
      this.pageDimmed = false;
    }
  }

}
