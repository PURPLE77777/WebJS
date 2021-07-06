//Практика


/*
1. Напишите функцию counterFactory(start, step), которая при вызове
возвращает другую функцию – счётчик tictoc(). start – стартовое
значение счётчика, step – его шаг. При каждом вызове tictoc
увеличивает значение счётчика на step.
*/
function counterFactory(start, step) {
    function tictoc(){
        return start+=step;
    }
    return tictoc;
}
let tikitoki=counterFactory(Number(prompt("Введите начало:")),Number(prompt("Введите шаг:")));
while(prompt("Считаем?", "да")==="да"){
    console.log(tikitoki());
}
/*
2. Напишите функцию take(tictoc, x), которая вызывает функцию
tictoc заданное число (x) раз и возвращает массив с результатами
вызовов.
*/
function take(tictoc, x){
    let arr=[];
    for(let i=0;i<x;i++){
        arr[i]=tictoc();
    }
    console.log(arr);
}
let a=Number(prompt("Введите начало:"));
let b=Number(prompt("Введите шаг:"));
take(function() {return a+=b;}, Number(prompt("Сколько раз будем вызывать функцию?")));
/*
3. Разбейте текст этой задачи на отдельные слова, удаляя по пути
точки и запятые, а полученные слова сложите в массив.
Напишите функцию, которая возвращает массив из тех же слов,
но развёрнутых задом наперёд, причём массив должен быть
отсортирован по количеству букв в слове. Напишите другую
функцию, которая считает общее количество букв во всех
элементах массива.
*/
let arr="Разбейте текст этой задачи на отдельные слова, удаляя по пути точки и запятые, а полученные слова сложите в массив. Напишите функцию, которая возвращает массив из тех же слов, но развёрнутых задом наперёд, причём массив должен быть отсортирован по количеству букв в слове. Напишите другую функцию, которая считает общее количество букв с во всех элементах массива.";
arr=arr.split("");
arr.forEach(function(elem, index, arr) {
    if(elem==","|elem=="."){
        arr.splice(index,1);
    }
});
arr=arr.join("").split(" ");
arr=reverse(arr);
function reverse(array) {
    array.reverse();
    array.forEach(function(elem,index,array) {
        array[index]=elem.split("").reverse().join("");
    });
    array=array.sort(function(a,b) {
        return a.split("").length-b.split("").length;
    });
    return array;
}
console.log(arr);
function letters(){
    let sum=0;
    return arr.map(function(elem,index,arr){
        sum+=arr[index].length;
        return elem=sum;
    });
}
console.log(letters());


//ДЗ


/*
1. Напишите функцию, которая принимает в качестве параметра строку из одного символа. 
Подсчитайте количество таких символов во всех элементах массива, как в задаче 3 из практики.
При подсчёте прописные и строчные буквы считайте одинаковыми.
*/

/*
2. Напишите функцию, которая будет возвращать частичную функцию от функции из задачи 1, 
фиксируя искомый символ. Например:

let countOfE = letterCounter('e');
console.log(countOfD(["abcde", "eerie", "MBE"])); // 5
*/

/*
3. Отфильтруйте массив городов так, чтобы в нём остались только города из штата Техас, 
которые с 2000 по 2013 выросли в населении.
*/
import data from "./uscities.js";
console.log(data.filter(function(elem,index,city){
    if(city[index].state==="Texas"&parseFloat(city[index].growth_from_2000_to_2013)>0) return true;
}));
/*
4. Подсчитайте, сколько миллионов населения живёт во всех городах на долготе 
от -110 до -120 градусов.
*/
console.log("Всего "+data.reduce(function(sum,elem){
    sum+=Number((Number(elem.population)/1e6).toFixed(2));
    return Number(sum.toFixed(2));
},0)+" миллионов жителей");
/*
5. Создайте массив только из тех городов, которые начинаются на букву S, 
при этом отсортируйте элементы этого массива по названию штата.
*/
let ind=-1;
let arrNew=[];
let citiesSort=data.filter(function(elem,index,arr){
    if(elem.city[0]==="S") {
        ind++;
        return arrNew[ind]=arr[index];
    }
});
console.log(citiesSort);
/*
6. Преобразуйте представленный массив "Города" в объект "Штаты":
-для каждого штата – отдельное свойство объекта (ключ = название штата);
-значение каждого свойства – массив городов;
-каждый элемент массива – название города, население и место в общем рейтинге (rank).
*/
let cities={};
let citiesArr=[];
ind=0;
let states=data.filter(function(elem){
    data.filter(function(item){
        if(elem.state==item.state){
            if(elem.state in cities===false){ 
                cities.state=elem.state;
                cities.state[elem.state]=citiesArr;
            }
            cities.state[elem.state].citiesArr[ind]={"city":item.city,
                                                    "population":item.population,
                                                    "rank":item.rank

            };
            ind++;
        }
        return cities.state[elem.state].citiesArr[ind];
    });
    return cities.state[elem.state];
});
console.log(states);
/*
7. Используя и файл с городами, и файл с клубами NHL, создайте новый массив из новых объектов:
-массив включает в себя только те города, в которых есть клубы NHL;
-каждый объект включает название города, название штата, название клуба и год его основания;
-если в городе есть несколько клубов, создайте отдельные объекты для каждого из них.
*/
