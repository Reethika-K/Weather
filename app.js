const BASE_URL= "http://www.7timer.info/bin/api.pl?";

let button=document.querySelector(".ser");
let back=document.querySelector(".back");
let search=document.querySelector("input");
let place=document.querySelector(".place");
let container=document.querySelector(".container");
let temp=document.querySelector(".temp");
let min=document.querySelector(".min");
let max=document.querySelector(".max");
let desc=document.querySelector(".desc");
let windspeed=document.querySelector(".windspeed");
let body=document.querySelector("body");
let heading=document.querySelector(".heading");

let inp;
let lat;
let long;

search.addEventListener("input",(e)=>{
    inp=e.target.value;
});  
function setBgDes(d){
    if(d=="clear"){
        desc.innerText="Clear";
        heading.style.color="white";
        body.style.backgroundImage= "url('clear.jpg')";
    }
    else if(d=="pcloudy"){
        desc.innerText="Partly Cloudy";
        heading.style.color="rgb(56, 108, 56)";
        body.style.backgroundImage= "url('partly_cloudy.jpg')";
    }
    else if(d=="cloudy"){
        desc.innerText="Cloudy";
        heading.style.color="rgb(26, 56, 26)";
        body.style.backgroundImage= "url('cloudy.jpeg')";
    }
    else if(d=="lightrain"){
        desc.innerText="Rain";
        heading.style.color="rgb(56, 108, 56)";
        body.style.backgroundImage= "url('rainy.jpg')";
    }
    else if(d=="oshower"){
        desc.innerText="Thunderstrom";
        heading.style.color="white";
        body.style.backgroundImage= "url('thunderstrom.jpg')";
    }
    else if(d=="ishower"){
        desc.innerText="Thunderstrom with rain";
        heading.style.color="white";
        body.style.backgroundImage= "url('thunderstrom_with_rain.jpg')";
    }
}
function setWindSpeed(w){
    if(w==1){
        windspeed.innerText="Windspeed: Calm";
    }
    else if(w==2){
        windspeed.innerText="Windspeed: Light";
    }
    else if(w==3){
        windspeed.innerText="Windspeed: Moderate";
    }
    else if(w==4){
        windspeed.innerText="Windspeed: Fresh";
    }
    else if(w==5){
        windspeed.innerText="Windspeed: Strong";
    }
    else if(w==6){
        windspeed.innerText="Windspeed: Gale";
    }
    else if(w==7){
        windspeed.innerText="Windspeed: Strom";
    }
    else if(w==8){
        windspeed.innerText="Windspeed: Hurricane";
    }
}
async function updateDetails(l,lo){
    const URL=`${BASE_URL}lon=${lo}&lat=${l}&product=civillight&output=json`;
    let respone= await fetch(URL);
    let data= await respone.json();
    console.log(data);
    let avgtemp;
    setBgDes(data.dataseries[0].weather);
    setWindSpeed(data.dataseries[0].wind10m_max);
    avgtemp=(((data.dataseries[0].temp2m.min)+(data.dataseries[0].temp2m.max))/2);
    temp.innerText=`${avgtemp}°C`;
    min.innerText=`L:${data.dataseries[0].temp2m.min}°C`;
    max.innerText=`H:${data.dataseries[0].temp2m.max}°C`;
}
button.addEventListener("click",()=>{
    search.value="";
    let found=0;
    for(let i in LatLong){
        if(inp.toLowerCase()==LatLong[i].city.toLowerCase()){
            inp=LatLong[i].city;
            console.log(inp);
            lat=LatLong[i].latitude;
            long=LatLong[i].longitude;
            place.innerText=inp;
            updateDetails(lat,long);
            container.style.visibility="visible";
            found=1;
            break;
        }
    }
    if(found==0){
        alert("Result not found.Try again");
        container.style.visibility="hidden";
        body.style.backgroundImage= "url('bg.jpg')";
        heading.style.color="#70939d";
    }
});
back.addEventListener("click",()=>{
    container.style.visibility="hidden";
    body.style.backgroundImage= "url('bg.jpg')";
    heading.style.color="#70939d";
})