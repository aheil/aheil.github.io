
var incidents;

function addIncident(incident)
{
    console.log(incident);
    var marker = L.marker([incident.lat, incident.long]).addTo(map);
    marker.bindPopup("<b>" + incident.name +"</b><br>" + incident.date + "<br>" + incident.link);
}

fetch("../assets/incidents.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    incidents = data;    
  });

