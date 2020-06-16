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

const addPins = function(map,hospid,hospname,vacant,occupied,longi,lati,vbed,obed,k){
    if (longi!=null || lati!=null){
        co=co+1;
        var locs = new Microsoft.Maps.Location(longi,lati);
        var pin = new Microsoft.Maps.Pushpin(locs);
        pin.metadata ={
            title: hospname,
            description: '<table border="0px">\
            <tr> <th>Vacant</th> <th> Occupied</th></tr>\
            <tr><td>Ventilators</td></tr>\
            <tr><td>' +vacant.toString()+'</td><td>'+occupied.toString()+'</td>\
            <tr><td>Hospital Beds</td>\
            <tr><td>' +vbed.toString()+'</td><td>'+obed.toString() +'</td></tr>\
            </table><a href="https://www.google.co.in/maps/place/'+hospname+'/@28.4799418,77.2824343,12.63z/data=!4m8!1m2!2m1!1s'+hospname+'">Get directions.'
        };
        Microsoft.Maps.Events.addHandler(pin, 'mouseover', pushpinClicked);
        map.entities.push(pin);
    }
}
var vacants= occupieds = vbeds = obeds = 0;
const renderBlocks=function(map){
     bs = JSON.parse(block);
     for (var i in bs.chain){
        if (i!=0){
            d[bs.chain[i].ventilators[0].hospid]=[bs.chain[i].ventilators[0].hospitalname,parseInt(bs.chain[i].ventilators[0].vacant),parseInt(bs.chain[i].ventilators[0].occupied),bs.chain[i].ventilators[0].longi,bs.chain[i].ventilators[0].lati,parseInt(bs.chain[i].ventilators[0].vbed),parseInt(bs.chain[i].ventilators[0].obed)]
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
        vbeds = vbeds+d[j][5];
        obeds = obeds+d[j][6];
        addPins(map,j,d[j][0],d[j][1],d[j][2],d[j][3],d[j][4],d[j][5],d[j][6],k)
        k=k+1
     }
     document.querySelector(".vacant").innerHTML=vacants;
     document.querySelector(".occupied").innerHTML=occupieds;
     document.querySelector(".vbed").innerHTML=vbeds;
     document.querySelector(".obed").innerHTML=obeds;
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