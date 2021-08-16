//Практика


/*
Создайте html файл и наполните его произвольными данными.
Напишите функцию получения этого файла используя
синхронный/асинхронный подходы. Напишите обработчики
события на каждый тип события. Посмотрите в отладчике,
что происходит на каждом шагу выполнения запроса.
*/
let url="https://jsonplaceholder.typicode.com/users";
let xhr=new XMLHttpRequest();
xhr.open("GET",url, true);
xhr.onloadstart=()=>{
    console.log("Start");
};
xhr.onprogress=()=>{
    console.log("Progress: "+xhr.status+xhr.statusText+"\nText: "+xhr.responseText);
};
xhr.onloadend=()=>{
    console.log("Finish: "+xhr.status+xhr.statusText+"\nText: "+xhr.responseText);
};
xhr.send();
/*
1. Превратите простой объект в JSON
*/
let bird={
    fly: "yes",
    small: true
};
console.log(JSON.stringify(bird));
/*
2. Создайте объект со ссылкой на другой объект и сконвертируйте
его в JSON. А потом назад
*/
var leader = {
    name: "Василий Иванович"
};
var soldier = {
    name: "Петька"
};
leader.soldier = soldier;
var team = [leader, soldier];
let str=JSON.stringify(team);
console.log(str);
console.log(JSON.parse(str));
