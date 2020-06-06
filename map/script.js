function GetMap() {
var map = new Microsoft.Maps.Map('#myMap', {
    credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
    center: new Microsoft.Maps.Location(25,70),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 2
});
}
var xhttp = new XMLHttpRequest();
var block,bs;
var d={}
var co = 0;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      block = this.responseText;
        var map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'AlqUbMVkRpMkWMcFs_18FoZGeNcg8RLToYX5OeOCHnexAuUZxqtesONoCbT1sTAd',
            center: new Microsoft.Maps.Location(25,78),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            zoom: 5
        });
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
        infobox.setMap(map);
      renderBlocks(map);
    }
};
xhttp.open("GET", "/blocks", true);
xhttp.send();

const addPins = function(map,hospid,hospname,vacant,occupied,longi,lati,k){
    console.log(lati,longi)
    if (longi!=null || lati!=null){
        co=co+1;
        var locs = new Microsoft.Maps.Location(longi,lati);
        var pin = new Microsoft.Maps.Pushpin(locs);
        pin.metadata ={
            title: hospname,
            description: 'Vacant: ' +vacant.toString()+'  Occupied: '+occupied.toString()
        };
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
        map.entities.push(pin);
    }
}
var vacants= occupieds = 0;
const renderBlocks=function(map){
     bs = JSON.parse(block);
     for (var i in bs.chain){
        if (i!=0){
            d[bs.chain[i].ventilators[0].hospid]=[bs.chain[i].ventilators[0].hospitalname,bs.chain[i].ventilators[0].vacant,bs.chain[i].ventilators[0].occupied,bs.chain[i].ventilators[0].longi,bs.chain[i].ventilators[0].lati]
        }
     }
     console.log(d)
     pushAllPins(map)
}

const pushAllPins = function(map){
    var k = 1
    for (var j in d){
        vacants=vacants+d[j][1];
        occupieds=occupieds+d[j][2];
        addPins(map,j,d[j][0],d[j][1],d[j][2],d[j][3],d[j][4],k)
        k=k+1
     }
     document.querySelector(".vacant").innerHTML=vacants;
     document.querySelector(".occupied").innerHTML=occupieds;
     document.querySelector(".counts").innerHTML='<br><br>'+co.toString();
 };
 function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }