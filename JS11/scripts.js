//Практика

/*
1. Создайте селект с несколькими опциями. Добавьте одну опцию, используя Javascript.
Сделайте так, чтобы по выбору опции выводилось сообщение с данными этой опции
(текст + значение).
*/
let select=document.getElementsByClassName("selec")[0];
let optNew=document.createElement("option");
optNew.innerHTML="4";
optNew.value="four";
select.append(optNew);
select.addEventListener("change", function(e){
    console.log("Текст: "+this.options[this.selectedIndex].text+"\nЗначение: "+this.options[this.selectedIndex].value);
});
//2. Создайте форму вычисления процентов по вкладу
let form=document.forms[0];
let sum=form[0];
let time=form[1];
let outWas=form[3];
let outWill=form[4];
let divWas=document.getElementsByClassName("div-was")[0];
let divWill=document.getElementsByClassName("div-will")[0];
sum.addEventListener("change", function(){
    outWas.value=sum.value;
});
time.addEventListener("change", function(){
    outWill.value=(Number(outWas.value)+(Number(outWas.value)*0.12*Number(time.value)/12)).toFixed();
    divWill.style.height="100%";
    divWas.style.height=(outWas.value/outWill.value*100).toFixed()+"%";
});
//3. Создайте регулярное выражение для поиска трёх точек.
let reg=/\.{3}/g;
let str=prompt("Введите строку:","Чел, тыыы... Потому что...");
console.log(str.match(reg));
//4. Создайте regexp, который ищет все положительные числа, в том числе десятичные.
str="+1, +2, -4, 3, -10, 41.2, +41.3, -32.45";
reg=/\+\d+\.\d+|\+\d+|\s\d+\.\d+|\s\d+/g;
console.log(str.match(reg));
//5. Создайте регулярку, которая ищет цвета в формате #eee, #eeeddd
str="gfgw #|ff3c, 213 rf ffeq #)d6ff01), #0, #fff8 #eee #ddd";
reg=/#[\da-fA-F]{1,8}/ig;
console.log(str.match(reg));
//6. Предложите строку, которая подойдет под выражение ^$
while(true){
    reg=/^$/;
    str=prompt("Предложите строку, которая подойдет под выражение ^$","")
    if(reg.test(str)){
        alert("Попал!");
        break;
    } 
    else alert("Попробуй ещё раз");
}
/*7. Создайте HTML-форму регистрации с полем пароля. По клику на кнопку проведите
валидацию пароля: он должен содержать хотя бы одну цифру, один спецсимвол и
одну букву, а так же быть длиннее 6 знаков. При прохождении валидации выводить
приветственное сообщение, в противном случае - ошибку.*/
form=document.forms[1];
let btn=form[1];
btn.addEventListener("click",function(){
    reg=/(?=.*[0-9])(?=.*[!@#$?%^&*])(?=.*[a-z])[\w!@#?$%^&*]{6,}/i;
    str=form[0].value;
    console.log(str);
    if(reg.test(str)) alert("Добро пожаловать!");
    else alert("Ой, что-то пошло не так :(\nПроверьте корректность набранного пароля");
});
