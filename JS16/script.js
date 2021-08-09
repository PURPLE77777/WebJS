//Практика


/*
1. Геолокация
Страница посвящена поиску ближайшей бесплатной уборной в Минске.
При входе на страницу есть кнопка Найти!
При нажатии на неё, ниже выводится адрес ближайшей уборной и расстояние в
метрах до неё, полученные исходя из данных текущего местоположения
пользователя.
Данные о местоположении уборных можно использовать следующие:
https://pastebin.com/ZGEp51WA
Для получения расстояния между двумя точками можно использовать теорему
Пифагора, но лучше воспользоваться формулами из этой статьи:
Расстояние между двумя точками шара
*/
import toilets from "./minsk toilets.js";
let btn=document.getElementById("btn");
let output=document.getElementsByTagName("output")[0];
let one, two, range,closestToilet;
let blockMap=document.getElementById("map");
function initMap(position) {
    closestToilet=toilets.reduce(function(value,elem){
        one=111200*Math.acos(Math.sin(position.coords.latitude)*Math.sin(value.latitude)+Math.cos(position.coords.latitude)*Math.cos(value.latitude)*Math.cos(value.longitude-position.coords.longitude));
        two=111200*Math.acos(Math.sin(position.coords.latitude)*Math.sin(elem.latitude)+Math.cos(position.coords.latitude)*Math.cos(elem.latitude)*Math.cos(elem.longitude-position.coords.longitude));
        return (one>two)?elem:value;
    });
    range=Math.round(111200*Math.acos(Math.sin(position.coords.latitude)*Math.sin(closestToilet.latitude)+Math.cos(position.coords.latitude)*Math.cos(closestToilet.latitude)*Math.cos(closestToilet.longitude-position.coords.longitude)));
    var map = new ymaps.Map('map', {
        center: [closestToilet.latitude, closestToilet.longitude],
        zoom: 17,
        controls: []
    });
}
function getLocation() {
    if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(initMap);
    } else {
        console.log("Geolocation is not supported");
    }
}
ymaps.ready(getLocation);
btn.addEventListener("click",function(){
    blockMap.style.display="block";
    output.innerHTML="Расстояние до ближайшей уборной в Минске: "+range+" м\nАдрес места: "+closestToilet.address;
});
/*
2. Галерея с историей просмотров
На странице художественной галереи в виде небольших плиток отображены 7
наиболее известных полотен в мире.
По нажатию на каждое полотно открывается модальное окно, в котором можно
посмотреть это произведение в большем масштабе. Повторный клик скрывает модальное
окно. Каждый такой просмотр/закрытие добавляют записи в историю.
По нажатию кнопок браузера назад и вперед реализовать переходы между этими
состояниями.
Например, пользователь открыл одну картину, закрыл её, и открыл вторую. При
нажатии кнопки назад, должно закрыться текущее модельное окно. При повторном нажатии
назад - открыться первое. Если после этого пользователь дважды нажмёт вперёд, то у него
закроется окно с первой картиной и откроется окно со второй соответственно.
*/
let container=document.getElementsByClassName("container")[0];
let modale=document.getElementsByClassName("modale")[0];
let imgModale=document.getElementsByClassName("modale-img")[0];
let counter_global=0;
window.onpopstate=function(event){
    imgModale.setAttribute("src",event.state.src);
    modale.style.opacity=event.state.opacity;
    modale.style.visibility=event.state.visibility;
};
container.addEventListener("click",function(e){
    if(e.target.classList.contains("item-img")){
        let img=e.target.getAttribute("src");
        imgModale.setAttribute("src",img);
        modale.style.opacity="1";
        modale.style.visibility="visible";
        counter_global++;
        history.pushState({counter: counter_global,src: img, visibility: "visible", opacity: "1"},"","?page="+counter_global);
    }
});
modale.addEventListener("click",function(evt){
    if(evt.target.classList.contains("modale-img")){
        modale.style.opacity="0";
        modale.style.visibility="hidden";
        counter_global++;
        history.pushState({counter: counter_global, src: evt.target.getAttribute("src"), visibility: "hidden", opacity: "0"},"","?page="+counter_global);
    }
});