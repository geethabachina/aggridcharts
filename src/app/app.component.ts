import { Component } from '@angular/core';
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  template: `
    <ag-grid-angular
      #agGrid
      style="padding-top:100px;width: 100%; height: 100%;"
      id="myGrid"
      class="ag-theme-balham"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [popupParent]="popupParent"
      [rowData]="rowData"
      [enableRangeSelection]="true"
      [enableCharts]="true"
      [processChartOptions]="processChartOptions"
      (gridReady)="onGridReady($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private popupParent;
  private rowData;

  constructor() {
    this.columnDefs = [
      {
        field: "country",
        width: 150,
        chartDataType: "category"
      },
      {
        field: "gold",
        chartDataType: "series"
      },
      {
        field: "silver",
        chartDataType: "series"
      },
      {
        field: "bronze",
        chartDataType: "series"
      },
      {
        headerName: "A",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "B",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "C",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      },
      {
        headerName: "D",
        valueGetter: "Math.floor(Math.random()*1000)",
        chartDataType: "series"
      }
    ];
    this.defaultColDef = {
      width: 100,
      resizable: true
    };
    this.popupParent = document.body;
    this.rowData = createRowData();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ["country", "gold", "silver", "bronze"]
    };
    var chartRangeParams = {
      cellRange: cellRange,
      chartType: "line"
    };
    setTimeout(function() {
      params.api.chartRange(chartRangeParams);
    }, 100);
  }

  

  processChartOptions(params) {
    var options = params.options;
    console.log("chart options:", options);
    if (params.type !== "line") {
      console.log("chart type is " + params.type + ", making no changes.");
      return params.options;
    }
    options.height = 500;
    options.width = 1000;
    options.title = {
      text: "Precious Metals Production",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "Arial, sans-serif",
      color: "#414182"
    };
    options.subtitle = {
      text: "by country",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 14,
      fontFamily: "Arial, sans-serif",
      color: "rgb(100, 100, 100)"
    };
    options.padding = {
      top: 20,
      right: 10,
      bottom: 10,
      left: 20
    };
    options.tooltipClass = "my-tool-tip-class";
    options.legendPosition = "bottom";
    options.legendPadding = 20;
    var legend = options.legend;
    legend.enabled = true;
    legend.markerStrokeWidth = 2;
    legend.markerSize = 25;
    legend.markerPadding = 10;
    legend.itemPaddingX = 120;
    legend.itemPaddingY = 20;
    legend.labelFontStyle = "italic";
    legend.labelFontWeight = "bold";
    legend.labelFontSize = 18;
    legend.labelFontFamily = "Arial, sans-serif";
    legend.labelColor = "#555";
    var xAxis = options.xAxis;
    xAxis.lineWidth = 2;
    xAxis.lineColor = "gray";
    xAxis.tickWidth = 2;
    xAxis.tickSize = 10;
    xAxis.tickPadding = 10;
    xAxis.tickColor = "gray";
    xAxis.labelFontStyle = "italic";
    xAxis.labelFontWeight = "bold";
    xAxis.labelFontSize = 15;
    xAxis.labelFontFamily = "Arial, sans-serif";
    xAxis.labelColor = "#de7b73";
    xAxis.labelRotation = 20;
    xAxis.labelFormatter = function(params) {
      return params.value === "United Kingdom" ? "UK" : "(" + String(params.value) + ")";
    };
    xAxis.gridStyle = [{ stroke: "rgba(94,100,178,0.5)" }];
    var yAxis = options.yAxis;
    yAxis.lineWidth = 2;
    yAxis.lineColor = "gray";
    yAxis.tickWidth = 2;
    yAxis.tickSize = 10;
    yAxis.tickPadding = 10;
    yAxis.tickColor = "gray";
    yAxis.labelFontStyle = "italic";
    yAxis.labelFontWeight = "bold";
    yAxis.labelFontSize = 15;
    yAxis.labelFontFamily = "Arial, sans-serif";
    yAxis.labelColor = "#de7b73";
    yAxis.labelRotation = 20;
    yAxis.labelFormatter = function(params) {
      return params.value.toString().toUpperCase();
    };
    yAxis.gridStyle = [
      {
        stroke: "#80808044",
        lineDash: undefined
      },
      {
        stroke: "#80808044",
        lineDash: [6, 3]
      }
    ];
    var seriesDefaults = options.seriesDefaults;
    seriesDefaults.fills = ["#e1ba00", "silver", "peru"];
    seriesDefaults.strokes = ["red", "green", "blue"];
    seriesDefaults.strokeWidth = 2;
    seriesDefaults.highlightStyle = {
      fill: "red",
      stroke: "maroon"
    };
    seriesDefaults.marker = true;
    seriesDefaults.markerSize = 12;
    seriesDefaults.markerStrokeWidth = 4;
    seriesDefaults.tooltipRenderer = function(params) {
      var xField = params.xField;
      var yField = params.yField;
      var x = params.datum[xField];
      var y = params.datum[yField];
      return "<b>" + xField.toUpperCase() + ":</b> " + x + "<br/><b>" + yField.toUpperCase() + ":</b> " + y;
    };
    return options;
  }

 
}

function createRowData() {
  let countries = [
    "Ireland",
    "Spain",
    "United Kingdom",
    "France",
    "Germany",
    "Luxembourg",
    "Sweden",
    "Norway",
    "Italy",
    "Greece",
    "Iceland",
    "Portugal",
    "Malta",
    "Brazil",
    "Argentina",
    "Colombia",
    "Peru",
    "Venezuela",
    "Uruguay",
    "Belgium"
  ];
  let rowData = [];
  countries.forEach(function(country, index) {
    rowData.push({
      country: country,
      gold: Math.floor(((index + 1 / 7) * 333) % 100),
      silver: Math.floor(((index + 1 / 3) * 555) % 100),
      bronze: Math.floor(((index + 1 / 7.3) * 777) % 100)
    });
  });
  return rowData;
}
