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
    if(evnt.key!=numbers[evnt.key]) input.value="";
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
let blocks=Number(prompt("Сколько блоков будем делать?", 400));
let cntnr=document.getElementsByClassName("container")[0];
let dvs;
for(let i=0;i<blocks;i++){
    dvs=document.createElement("div")
    dvs.classList.add("block");
    dvs.style.transition=".3s all 0s";
    dvs.style.width="50px";
    dvs.style.height="50px";
    dvs.style.margin="5px";
    dvs.style.backgroundColor="white";
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