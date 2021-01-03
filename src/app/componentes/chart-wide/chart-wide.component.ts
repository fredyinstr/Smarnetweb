import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-wide',
  templateUrl: './chart-wide.component.html',
  styleUrls: ['./chart-wide.component.css']
})
export class ChartWideComponent implements OnInit, OnDestroy {

  @Input() tag: any;
  contador = 0;
  intervalo: any;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: '' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    scales: {
      xAxes: [{
        time: {
          unit: 'minute',
          unitStepSize: 0.5,
          },
          type: 'time',
          distribution: 'linear',
          position: 'bottom',
          ticks: {
           autoSkip: true
         }
      }], 
      yAxes: [{        
        scaleLabel: {
          display: true,
          labelString: '',
          fontColor: "red"
        },
      }]
  },
    responsive: true,
    animation: false,
    tooltips: {
      mode: 'index',
      // position: 'cursor',
      intersect: false
    },
    elements: {
      line: {
        fill: true,
        tension: false,
        lineTension: 0,
        borderWidth: 0.6
      },
      point: {
        radius: 0
      }
    }
  };
  public lineChartColors: Array<any> = [
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

  constructor(private _data: DataService) { }

  pushdata() {
    this.intervalo = setInterval((i) => {
      this._data.lastData(this.tag.tag_id)
        .subscribe((data:any)=>{
          this.lineChartData[0].data.push(data.datatag.data)
          this.lineChartLabels.push(new Date(data.datatag.label));
        // if (this.lineChartData[0].data.length>100) {
        //   this.lineChartData[0].data.shift();
        //   this.lineChartLabels.shift();
        // }
        this.chart.update();
        })

      
    }, 500)
  }

  loadChart(){
    this._data.cargarChart(this.tag.tag_id)
      .subscribe((chart:any)=>{
        console.log("Data chart: ", chart); 
        let arreglo = chart.chardata.reverse(); 
        arreglo.forEach(data => {
          // console.log(data.data);
          // console.log(data.label);
          this.lineChartData[0].data.push(data.data)
          this.lineChartLabels.push(new Date(data.label));          
          // this.lineChartLabels.push(new Date(data.label).getHours()+":"+new Date(data.label).getMinutes());          
        });    
        this.chart.update();  
      })
  }

  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  ngOnInit() {
    this.lineChartOptions.scales.yAxes[0].scaleLabel.labelString = this.tag.tag_nombre + " " +this.tag.tag_symbol;
    this.lineChartData[0].label = this.tag.tag_descripcion;
    this.loadChart();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

}
