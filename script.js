const appKey="877057fae069a92c77cd2eeb169c6d46";
var map;
var position={
    lat:19.0760, // Mumbai:
    lng:72.8777 //Lat Lng by default.
}
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((res)=>{
        const pos=res.coords;
        setPosition(pos);
    });
}
function initMap(){
    const box=document.getElementById('map');
    map=new google.maps.Map(box,{center:position,zoom:12});
    google.maps.event.addListener(map,'click',(event)=>{
        var pos=event.latLng.toJSON();
        console.log(pos);
        const wet=new Weather();
        wet.getWeatherByLatLng(pos);
    })
}
function setPosition(data){
    position.lat=data.latitude;
    position.lng=data.longitude;
    const wet=new Weather();
    wet.text=`<h1>You are Here.!!!</h1>`;
    wet.getWeatherByLatLng(position);
}
function getWeather(){
    var inp=document.getElementById("city").value;
    const wet=new Weather();
    wet.getWeatherByCity(inp);
}
class Weather{
    constructor(){
        this.city,this.data;
        this.text="";
        this.position={
            lat:"",
            lng:""
        }
    }
    getWeatherByCity(city){
        this.city=city;
        const url=`http://api.openweathermap.org/data/2.5/weather?&q=${this.city}&units=metric&appid=${appKey}`;
        fetch(url).then((response)=>{
            const data=response.json();
            return data;
        }).then((data)=>{
            this.data=data;
            var {main,weather,name,sys,coord}=this.data;
            this.position.lat=coord.lat;
            this.position.lng=coord.lon;
            var{temp,humidity}=main;
            var Des=weather[0].description;
            const Text=`<h2 style="border-bottom:solid; border-color:grey;">${name}&nbsp,&nbsp${sys.country}</h2>
            <p style="color:red"><i class="fas fa-temperature-low"></i>&nbspTemperature&nbsp:&nbsp${temp}&degC</p>
            <p style="color:blue"><i class="fas fa-tint"></i>&nbspHumidity&nbsp:&nbsp${humidity}%</p>
            <p style="color:#00acee"><i class="fas fa-cloud"></i>&nbspWeather&nbsp:&nbsp${Des}</p>
            <p style="color:green"><img src="https://cdn1.iconfinder.com/data/icons/power-and-energy-35/64/20-512.png" style="display:inline-block;width:20px;">
                            Pressure&nbsp:&nbsp${pressure}&nbspmillibar
                        </p>`;
            this.info=new google.maps.InfoWindow({
                content:this.text+Text
            })
            this.mark=new google.maps.Marker({
                map:map,
                position:this.position,
                draggable:true,
                animation:google.maps.Animation.DROP
            });
            this.mark.addListener('click',()=>{
                if(this.mark.getAnimation()!==null){
                    this.info.close(map,this.mark);
                    this.mark.setAnimation(null);
                }else{
                    this.info.open(map,this.mark);
                    this.mark.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
            map.panTo(this.position);
        }).catch((err)=>{
            alert(`Something went wrong\n${err}`);
        })
    }
    getWeatherByLatLng(pos){
        this.position=pos;
        const url=`http://api.openweathermap.org/data/2.5/weather?lat=${this.position.lat}&lon=${this.position.lng}&units=metric&appid=${appKey}`;
        fetch(url).then((response)=>{
            const data=response.json();
            return data;
        }).then((data)=>{
            this.data=data;
            var {main,weather,name,sys}=this.data;
            var{temp,humidity,pressure}=main;
            var Des=weather[0].description;
            const Text=`<h2 style="border-bottom:solid; border-color:grey; padding:2px;">${name}&nbsp,&nbsp${sys.country}</h2>
                        <p style="color:red"><i class="fas fa-temperature-low"></i>&nbspTemperature&nbsp:&nbsp${temp}&degC</p>
                        <p style="color:blue"><i class="fas fa-tint"></i>&nbspHumidity&nbsp:&nbsp${humidity}%</p>
                        <p style="color:#00acee"><i class="fas fa-cloud"></i>&nbspWeather&nbsp:&nbsp${Des}</p>
                        <p style="color:green"><img src="https://cdn1.iconfinder.com/data/icons/power-and-energy-35/64/20-512.png" style="display:inline-block;width:20px;">
                            Pressure&nbsp:&nbsp${pressure}&nbspmillibar
                        </p>`;
            this.info=new google.maps.InfoWindow({
                content:this.text+Text
            })
            this.mark=new google.maps.Marker({
                map:map,
                position:this.position,
                draggable:true,
                animation:google.maps.Animation.DROP
            });
            this.mark.addListener('click',()=>{
                if(this.mark.getAnimation()!==null){
                    this.info.close(map,this.mark);
                    this.mark.setAnimation(null);
                }else{
                    this.info.open(map,this.mark);
                    this.mark.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
            map.panTo(this.position);
        }).catch((err)=>{
            alert(`Something went wrong.\n${err}`);
        })
    }
}