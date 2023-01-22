fetch("../assets/incidents.json")
.then(response => {
   return response.json();
})
.then(jsondata => doRrun(jsondata));


function doRun(incidents)
{
    incidents.foreach(addIncident);
}

function addIncident(incident)
{

    var marker = L.marker([incident.lat, incident.long]).addTo(map);
    marker.bindPopup("<b>" + incident.name +"</b><br>" + incident.date + "<br>" + incident.link);
}