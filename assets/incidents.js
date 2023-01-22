fetch("../assets/incidents.json")
.then(response => {
   return response.json();
})
.then(jsondata => jsondata.foreach(addIncident));

function addIncident(incident)
{

    var marker = L.marker([incident.lat, incident.long]).addTo(map);
    marker.bindPopup("<b>" + incident.name +"</b><br>" + incident.date + "<br>" + incident.link);
}