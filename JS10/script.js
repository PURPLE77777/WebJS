//Практика

/*
1. Сделайте так, чтобы по нажатию на кнопку выводился alert
*/
let btn=document.getElementsByTagName("button");
// function alertion(){
//     alert("Вы нажали на кнопку");
// }
// btn[0].addEventListener("click", alertion);
/*
2. Создайте кнопку с произвольным текстом, сделайте так, чтобы по нажатию текст
изменялся на button
*/
let i=0;
function changeText(){
    btn[0].textContent="Кликов: " + ++i;
}
btn[0].addEventListener("click", changeText);
/*
3. Создайте форму с полем для ввода и двумя кнопками «enable» и «disable». Сделайте
так, чтобы по нажатию на кнопку «disable» поле становилось неактивным, на «enable»
— активным.
*/
let btns=document.getElementsByName("button");
let input=document.querySelector("input");
btns[0].addEventListener("click",function(){
    input.disabled=false;
});
btns[1].addEventListener("click",function(){
    input.disabled=true;
});
/*
4. Создайте объект произвольной формы и цвета. Сделайте так, чтобы объект можно
было двигать, а его координаты на странице выводились в HTML-элементе output.
*/
let div=document.getElementsByClassName("div")[0];
let divTextX=document.getElementsByClassName("coordX")[0];
let divTextY=document.getElementsByClassName("coordY")[0];
let stylesDiv=getComputedStyle(div);
let x, y, a, b;
function evnt(e){
    function coords(evt){
        function nope(){
            div.removeEventListener("mousemove", coords);
        }
        div.addEventListener("mouseup", nope);
        function out(){
            div.removeEventListener("mousemove", coords);
        }
        div.addEventListener("mouseout", out);
        x=evt.clientX-a;
        y=evt.clientY-b;
        div.style.left=x+"px";
        div.style.top=y+"px";
        stylesDiv=getComputedStyle(div);
        divTextX.innerHTML=stylesDiv.left;
        divTextY.innerHTML=stylesDiv.top;
    }
    a=e.clientX-parseInt(stylesDiv.left);
    b=e.clientY-parseInt(stylesDiv.top);
    div.addEventListener("mousemove", coords);
}
div.addEventListener("mousedown", evnt);
/*
5. Создайте поле ввода, сделайте с помощью JS так, чтобы в него можно было вводить
только числовые значения.
*/
let numbers=["0","1","2","3","4","5","6","7","8","9",];
function nmbrs(evnt){
    if(evnt.key!=numbers[evnt.key]) {
        evnt.preventDefault();
    }
}
input.addEventListener("keydown",nmbrs);
/*
6. Создайте блок div, в качестве изображения фона установите ему изображение
закрытой папки. Добавьте событие, которое выполняется при двойном клике на блоке
и заменяет фон блока на изображение открытой папки.
*/
let ppk=document.getElementsByClassName("papka")[0];
let bool=true;
function papka(){
    if(bool){
        ppk.style.backgroundImage="url(http://s1.iconbird.com/ico/2013/7/390/w256h2561372777066FolderwithContents.png)";
        ppk.style.backgroundSize="cover";
        ppk.style.backgroundRepeat="no-repeat";
        ppk.style.backgroundPosition="center";
        bool=false;
    }
    else {
        ppk.style.backgroundImage="url(http://s1.iconbird.com/ico/2013/7/390/w256h2561372777066FolderClose.png)";
        ppk.style.backgroundSize="cover";
        ppk.style.backgroundRepeat="no-repeat";
        ppk.style.backgroundPosition="center";
        bool=true;
    }
}
ppk.addEventListener("dblclick", papka);
/*
7. Добавьте в документ 300-400 блоков div квадратной формы с размерами сторон 30px
и цветом фона. Добавление элементов выполните с помощью цикла, цвет
попытайтесь раздать случайным образом (это условие выполнять не обязательно).
Добавьте событие при наведении мыши, которое будет скруглять данные блоки с
помощью border-radius до круга. Для замедления эффекта скругления в CSS можно
добавить transition.
*/
function generateColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
let blocks=Number(prompt("Сколько блоков будем делать?", 100));
let cntnr=document.getElementsByClassName("container")[0];
let dvs;
for(let i=0;i<blocks;i++){
    dvs=document.createElement("div")
    dvs.classList.add("block");
    dvs.style.backgroundColor=generateColor();
    cntnr.append(dvs);
}
function bordRad(event){
    if(event.target.classList.contains("block"))
    event.target.style.borderRadius="25px";
}
function bordRadNo(event){
    if(event.target.classList.contains("block"))
    event.target.style.borderRadius="0px";
}
cntnr.addEventListener("mouseover", bordRad);
cntnr.addEventListener("mouseout", bordRadNo);


//ДЗ


/*
1. Дан инпут. Дана кнопка. По нажатию на кнопку клонируйте инпут.
*/
let baton=document.getElementsByClassName("but")[0];
baton.addEventListener("click",function(){
    let inpt=document.createElement("input");
    inpt.classList.add("inpt");
    baton.before(inpt);
});
/*
2. Добавьте на страницу таблицу в стандартном оформлении. 
Создайте три класса для этой таблицы: bordered (с границами вокруг всех ячеек),
striped (разные цвета для чётных и нечётных строк), highlight (оформление стандартное, 
но при наведении на ячейку текст в ней меняет цвет). При первом клике на таблице 
добавьте ей класс bordered, при втором клике удалите класс bordered и добавьте класс 
striped, при третьем клике удалите класс striped и добавьте класс highlight. Четвёртый 
и последующие клики запускают «карусель классов» по второму кругу.
*/
let table=document.getElementsByTagName("table")[0];
let tr=document.getElementsByTagName("tr");
let td=document.getElementsByTagName("td");
function fourthClick(){
    for(let i=0;i<td.length;i++){
        td[i].classList.remove("highlight");
    }
    table.removeEventListener("click",fourthClick);
    table.addEventListener("click",firstClick);
}
function thirdClick(){
    for(let i=0;i<tr.length;i++){
        if((i+1)%2==0) tr[i].classList.remove("striped");
    }
    for(let i=0;i<td.length;i++){
        td[i].classList.add("highlight");
    }
    table.removeEventListener("click",thirdClick);
    table.addEventListener("click",fourthClick);
}
function secondClick(){
    for(let i=0;i<td.length;i++){
        td[i].classList.remove("bordered");
    }
    for(let i=0;i<tr.length;i++){
        if((i+1)%2==0) tr[i].classList.add("striped");
    }
    table.removeEventListener("click",secondClick);
    table.addEventListener("click",thirdClick);
}
function firstClick(){
    for(let i=0;i<td.length;i++){
        td[i].classList.add("bordered");
    }
    table.removeEventListener("click",firstClick);
    table.addEventListener("click",secondClick);
}
table.addEventListener("click",firstClick);
/*
3. Модифицируйте задачу 2. Добавьте три radiobutton. При выборе первой включайте класс 
bordered, при выборе второй — striped, при выборе третьей — highlight. При включении 
каждого класса выключайте остальные два.
*/
let inputs=document.getElementsByClassName("radio-btm");
function highlight(){
    for(let i=0;i<tr.length;i++){
        if((i+1)%2==0) tr[i].classList.remove("striped");
    }
    for(let i=0;i<td.length;i++){
        td[i].classList.remove("bordered");
        td[i].classList.add("highlight");
    }
}
function striped(){
    for(let i=0;i<td.length;i++){
        td[i].classList.remove("bordered");
        td[i].classList.remove("highlight");
    }
    for(let i=0;i<tr.length;i++){
        if((i+1)%2==0) tr[i].classList.add("striped");
    }
}
function bordered(){
    for(let i=0;i<tr.length;i++){
        if((i+1)%2==0) tr[i].classList.remove("striped");
    }
    for(let i=0;i<td.length;i++){
        td[i].classList.remove("highlight");
        td[i].classList.add("bordered");
    }
}
inputs[0].addEventListener("click",bordered);
inputs[1].addEventListener("click",striped);
inputs[2].addEventListener("click",highlight);
/*
4. Создайте пять элементов разных типов (например, div, p, button, a, span). Используя 
приём делегирования, по клику на элемент выводите информацию о его типе.
*/
let parent=document.getElementsByClassName("div-deleg")[0];
parent.addEventListener("click", function(e){
    console.log(e.target);
});
/*
5. Добавьте в html код изображение. Добавьте скрипт, который будет выполнять следующие 
действия: при наведении мыши на картинку изображение заменяется другим, при выходе мыши 
за пределы изображения восстанавливается первоначальное изображение.
*/
let pic=document.getElementsByClassName("pic-change")[0];
pic.addEventListener("mouseover",function(){
    pic.style.backgroundImage="url(https://yt3.ggpht.com/ytc/AAUvwnjzUcmV2rjJrzyXQYeqBHwdIJTncl-SGtt0mg=s900-c-k-c0x00ffffff-no-rj)";
});
pic.addEventListener("mouseout",function(){
    pic.style.backgroundImage="url(https://sun1-98.userapi.com/s/v1/ig1/Puq0pKXyCfjFrdPthbNqIj-8AY9xJGl3ANQ-_3uX2veWFllIEga49vIi7TX6dcPUt5UujRv1.jpg?size=400x0&quality=96&crop=70,0,699,699&ava=1)";
});