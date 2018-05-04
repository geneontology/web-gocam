import { Component, OnInit } from '@angular/core';
import { GoRESTService } from '../core/gorest.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];
  
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];
  

  
  view: any[] = [600, 200];

  colorScheme = {
    domain: ['gray', 'blue', 'yellow', '#AAAAAA']
  };

  constructor(private goREST: GoRESTService) { 
    
  }

  onSelect(event) {
    console.log(event);
  }  

  ngOnInit() {
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Q2 2016', 'Q3 2016', 'Q4 2016', 'Q1 2017', 'Q2 2017', 'Q3 2017', 'Q4 2017','Q1 2018'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [200, 300, 400, 500, 600, 800, 1500, 2500 ], label: 'GO-CAM Models'}/*,
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (SGD)'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (FlyBase)'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (WormBase)'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (RGD)'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (ZFIN)'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'GO-CAM Models (MGD)'}
    */
  ];


  public barChartOntologyLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017','2018'];
  public barChartOntologyData:any[] = [
    {data: [33, 5000, 10000, 15000, 20000, 25000, 30000, 49423 ], label: 'Terms'},
  ];

  
  public barChartGroupData:any[] = [
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'SGD'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'FlyBase'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'WormBase'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'RGD'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'ZFIN'},
    {data: [33, 50, 66, 83, 100, 133, 250, 416 ], label: 'MGD'}
  ];


  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['SGD', 'FlyBase', 'WormBase', 'RGD', 'ZFIN', 'MGD'];
  public pieChartData:number[] = [300, 300, 300, 300, 300, 300];
   

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'GO Annotations' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'GO-CAM Models (total)' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'GO-CAM Models / month' }
  ];
  public lineChartLabels: Array<any> = ['Q2 2016', 'Q3 2016', 'Q4 2016', 'Q1 2017', 'Q2 2017', 'Q3 2017', 'Q4 2017','Q1 2018'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }










}