const main_df1 = "data/new_main_df.csv";
const respiratory = "data/respiratory.csv";

let table;
let generate = [];
let latdata;
let canvas;
let  currentColor;
let sliderValue = 1990;

const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  // style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function preload(){
  table = loadTable(main_df1, "csv", "header");
  latdata = loadJSON("data/countrycode-latlong-array.json");
}

function setup() {
  // put setup code here

  canvas = createCanvas(800, 600);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // attempt for slider for YEARS
  // slider = createSlider(1990, 2017, 1990);
  // slider.position(50, 200);
  // slider.style('width', '80px');
  dataSource = select('#dataSource'); // get the DOM element from the HTML
  dataSource.changed(processData); // assign callback

  currentColor = color(64, 250, 200, 100);

  slide = document.getElementById("slide");
  sliderDiv = document.getElementById("sliderAmount");
  sliderDiv.innerHTML = 1990;
  // console.log("Year value is =", sliderDiv);
  slide.onchange = function() {
      sliderDiv.innerHTML = this.value;
      sliderValue = this.value;
      myMap.onChange(processData);
    }
}

function processData() {
  generate = [];

  let yearSource = sliderValue;
  let latest = table.findRows(yearSource, "Year");
  let cause = dataSource.value();

  // console.log("The cause of death is = ", yearSource);
  console.log("Year value is =",yearSource);
  console.log("table length = ", latest.length);

  switch (cause) {
    case "cardiovascular":
      currentColor = color(204, 102, 0);
      break;
    case "alzheimer":
      currentColor = color(64, 250, 200);
      break;
    case "drugs":
      currentColor = color(204, 153, 0);
      break;
    case "nutritional":
      currentColor = color(91, 37, 134);
      break;
    case "fights":
      currentColor = color(250, 0, 0, 100);
      break;
  }


  let maxV = 0;
  let minV = Infinity;
  for (let r of latest){
    let country_id = r.get('int_code').toLowerCase();
    let latlong = latdata[country_id];

    if (latlong){
      let lat = +(latlong[0]);
      let lon = +(latlong[1]);
      let value = Number(r.get(cause));
      generate.push({lat, lon, value});

      if (value > maxV){
        maxV = value;
      }
      if (value < minV){
        minV = value;
      }
    }
  }

  let smallest = sqrt(minV);
  let largest = sqrt(maxV);

  for(let i of generate){
    i.diameter = map(sqrt(i.value), smallest, largest, 1 ,20);
  }
}

function draw() {
  // put drawing code here
  clear();

	for(let row of generate){
    const pix = myMap.latLngToPixel(row.lat, row.lon);
    const zoom = myMap.zoom();
    const scl = pow(1.5, zoom);
    fill(currentColor);
    ellipse(pix.x, pix.y, row.diameter*scl);

  }

}
