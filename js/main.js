(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var URL = "1IP_0vxifIw6cW6UP-vH0l-GvWBPA1NDG7j4cT17AKKs";

    Tabletop.init({
      key: URL,
      callback: showInfo,
      simpleSheet: true
    });

  });


  // make the table, and the search bar
  function generateTable(sheetData){
    Sheetsee.makeTable(sheetData, "#hackSpotsTable");
    Sheetsee.initiateTableFilter(sheetData, "#tableFilter", "#hackSpotsTable");

  }

  function showInfo(gData) {
    // find total number of spots added
    $('#theNumberofSpots').html(ich.theNumberofSpots({ 
      numberOfSpots: gData.length 
    }));

    generateTable(gData);


    $("#hackSpotsTable").live("click", function(event){

      var target = event.target;
      var $t = $(target);

      if (target.localName !== "td")
        return;

      $t.removeClass("selectedRow");

      var rowNum = $t.closest("tr").attr("id");
      $("#" + rowNum).addClass("selectedRow");

      // create geoJSON with coordinates and other useful bits from the original data
      var optionsJSON = ["name", "address", "rowNumber"];
      var geoJSONnoHL = Sheetsee.createGeoJSON(gData, optionsJSON);

      // change the color of the most recently added spot's marker
      var geoJSON = highlightLastMarker(geoJSONnoHL, "#FF4646");

      matchGeoJSONbyRowNumber(rowNum, geoJSON, gData, "#FF4646");
      addPopups(map, Sheetsee.addMarkerLayer(geoJSON, map, 13));

      var dataElement = Sheetsee.getMatches(gData, rowNum, "rowNumber");
      console.log(dataElement[0]);
      map.setView([dataElement[0].lat, dataElement[0].long], 18, {animate:true, duration: 1.25});
      //map.panTo([dataElement[0].lat, dataElement[0].long], {animate: true, duration: 1.25});

      $('#selectedSpot').html(ich.selectedSpot({ rows: dataElement }))
                        .css("display", "inline");
    });

    // so that the first map and info that loads
    // is complete and doesn't show rows that are
    // actively being edited by folk
    function findLatestCompleteSpot(data) {
      var latestCompleteSpot = [];
      var startWithLatestRow = data.reverse();
      startWithLatestRow.forEach(function(row){
        if (row.lat && row.long && row.name && row.address);
          latestCompleteSpot.push(row);
      });
      return latestCompleteSpot[0];
    }

    // find the latest spot with the most important
    // info filled in (to prevent map breaking if
    // someone is currently editing spreadsheet)
    var theLatestSpot = findLatestCompleteSpot(gData);
    var latestSpot = ich.selectedSpot({
       rows: theLatestSpot,
       
    });

    $('#selectedSpot').html(latestSpot);

    function highlightLastMarker(geoJSON, highlightColor) {
      geoJSON[0].properties["marker-color"] = highlightColor;
      return geoJSON;
    };

    // create geoJSON with coordinates and other
    // useful bits from the original data
    var optionsJSON = ["name", "address", "rowNumber"];
    var geoJSONnoHL = Sheetsee.createGeoJSON(gData, optionsJSON);
    // change the color of the most recently added spot's marker
    var geoJSON = highlightLastMarker(geoJSONnoHL, "#FF4646");

    // create map, tilelayer (map background), markers and popups
    var map = Sheetsee.loadMap("map");
    Sheetsee.addTileLayer(map, 'examples.map-20v6611k');
    var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, 13);
    addPopups(map, markerLayer);

    // design the popups to have the content and
    // interactions that we want
    function addPopups(map, markerLayer) {
      markerLayer.eachLayer(function(marker) {
        var popupContent = ich.popUps(marker.feature.opts);
        marker.bindPopup(popupContent, {closeButton: false,});
      });

      markerLayer.on('click', function(e) {
        // clear any selected rows
        $('.spotRow').removeClass("selectedRow");
        // get row number of selected marker
        var rowNumber = e.layer.feature.opts.rowNumber.toString();
        // find that row in the table and make consider it selected
        $('#' + rowNumber).addClass("selectedRow");
        // using row number, find that marker in the geoJSON, give it
        // the selected marker color
        matchGeoJSONbyRowNumber(rowNumber, geoJSON, gData, "#FF4646");
        // using row number, get the data for the selected spot
        var dataElement = Sheetsee.getMatches(gData, rowNumber, "rowNumber");
        // take those details and re-write the selected spot section
        var selectedSpot = ich.selectedSpot({
          rows: dataElement
        });
        $('#selectedSpot').html(selectedSpot).css("display", "inline");
      });
    };

    $('.resetMap').click(function() {
      $('.spotRow').removeClass("selectedRow");
      markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, 13);
      addPopups(map, markerLayer);
      $('#latestSpot').css("display", "inline");
      $('#selectedSpot').css("display", "none");
    });

    function matchGeoJSONbyRowNumber(rowNumber, geoJSON, gdata, highlightColor) {
      geoJSON.forEach(function (d) {
        if (d.properties["marker-color"] === highlightColor) {
          var origColor = gData[0].hexcolor;
          d.properties["marker-color"] = origColor;
        }

        for (var key in d.opts) {
          var value = d.opts[key].toString().toLowerCase();
          if (key === 'rowNumber' && value.match(rowNumber.toString().toLowerCase())) {
            d.properties["marker-color"] = highlightColor;
            return geoJSON;
          }
        }
      });
    }
  }

}());
