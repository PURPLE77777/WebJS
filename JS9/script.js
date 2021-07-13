//Практика


//1. Все элементы label внутри таблицы. Должно быть 3 элемента.
let prak1=document.getElementById("age-list").children;
console.log(prak1);


//2. Первую ячейку таблицы (со словом "Возраст").
let prak2=document.getElementById("age-table").rows[0].cells[0];
console.log(prak2);


//3. Вторую форму в документе.
let prak3=document.getElementsByName("search-person");
console.log(prak3);


//4. Форму с именем search, без использования её позиции в документе.
//решение 1
// let elem=document.getElementsByName("search");
// let prak4;
// for(let i=0;i<elem.length;i++){
//     if(elem[i].tagName=="FORM") prak4=elem[i];
// }
// console.log(prak4);
// //решение 2
// let form=document.getElementsByTagName("form");
// let prak4;
// for(let i=0;i<form.length;i++){
//     if(form[i].name=="search") prak4=form[i];
// }
// console.log(prak4);


//5. Элемент input в форме с именем search. Если их несколько, то нужен
//первый.
// let elem=document.getElementsByName("search");
// let prak5;
// for(let i=0;i<elem.length;i++){
//     if(elem[i].tagName=="INPUT") prak5=elem[i];
// }
// console.log(prak5);


//6. Элемент с именем info[0], без точного знания его позиции в документе.
let prak6=document.getElementsByName("info[0]");
console.log(prak6);


//7. Элемент с именем info[0], внутри формы с именем search-person.
let elem=document.getElementById("age-table").rows[1].cells[1].firstElementChild;
console.log(elem);


//8. Добавьте на страницу select с несколькими опциями, свяжите его с лейблом
//и вставьте оба элемента перед кнопкой «Искать»
let prak8=document.getElementById("age-table");
let select=document.createElement("select");
select.innerHTML="<option>Мужчина</option> <option>Женщина</option>";
prak8.after(select);


//ДЗ


//1. Дан элемент #elem. Добавьте ему класс "www".
let dz1=document.getElementsByName("search-person");
dz1[0].classList.add("www");
console.log(dz1[0].classList.contains("www"));//true


//2. Дан элемент #elem. Проверьте наличие у него класса "www", если есть — удалите этот класс.
let dz2=dz1[0];
dz2.classList.toggle("www");


/*3. Дан ul. Дан массив. Вставьте элементы этого массива в конец ul так, чтобы каждый элемент
стоял в своем li. Сделайте так, чтобы четные позиции имели красный фон.*/
let arr=new Array(Number(prompt("Введите длину массива:",10)));
for(let i=0;i<arr.length;i++){
    arr[i]=Math.round(Math.random()*10);
}
console.log(arr);
let dz3=document.getElementsByName("search-person");
let ul=document.createElement("ul"), li, path;
dz3[0].before(ul);
path=document.querySelector("ul");
for(let i=0;i<arr.length;i++){
    li=document.createElement("li");
    li.textContent=String(arr[i]);
    path.append(li);
    if((i+1)%2==0)
        ul.lastChild.style.backgroundColor="red";
}


/*4. Дан элемент #elem. Найдите его соседа сверху и добавьте ему в начало и в конец по
восклицательному знаку '!'*/
let prev=path.previousElementSibling;
prev.after("!");
prev.before("!");


/*5. Реализуйте функцию wrapInParagraph, которая находит каждый из дочерних текстовых узлов
внутри элемента div и оборачивает их в элемент p.*/
function wrapInParagraph(){
    let div=document.querySelector("div");
    let texts=div.childNodes;
    let length=texts.length;
    for(let i=0;i<length;i++){
        let p=document.createElement("p");
        p.innerHTML=texts[i].textContent;
        texts[i].replaceWith(p);
    }
}
wrapInParagraph();


/*6. Реализуйте функцию normalizeClassNames, которая нормализует имена классов для всех
элементов на странице: все классы, которые содержат дефис (например, menu-main) должны быть
заменены на классы в camelCase (menuMain).*/
function  normalizeClassNames(){
    let elems=document.body.childNodes;
    for(let i=0;i<elems.length;i++){
        if(elems[i].className!=undefined){
            let string=elems[i].className.split("");
            for(let j=0;j<string.length;j++){
                if(string[j]=="-"){
                    let letter=string[j+1];
                    string[j+1]=letter.toUpperCase();
                    string.splice(j,1)
                    string=string.join("");
                    elems[i].classList.replace(elems[i].className,string);
                }
            }
        }
    }
}
normalizeClassNames();