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


//ДЗ


/*
1. Напишите функцию, которая получает любую форму в качестве аргумента и проверяет 
введённые в форму данные (в input типа email должен быть введён email, в input 
type="tel" — белорусский номер телефона; пароль должен содержать не менее восьми символов, 
среди которых есть одна маленькая, одна большая буква, одна цифра и один спецсимвол; 
самостоятельно добавьте ещё хотя бы две логичные проверки). Все проверки проводить с 
помощью регулярных выражений. При возникновении ошибок выдавать их пользователю рядом с 
проверенными полями! Если форма заполнена верно — выдайте приветственное сообщение
*/
function formCheck(form){
    let btn=form[3];
    btn.addEventListener("click", check);
    function check(){
        let regexpEmail=/.+@.+\..+/;
        let regexpTel=/^((\+|)375([\s\-]|)|80([\s\-]|))(\(|)(29|25|44|33)(\)|)(|\s|\-|)\d{3}(\s|\-|)\d{2}(\s|\-|)\d{2}$/;
        let regexpPass=/(?=.*[0-9])(?=.*\W)(?=.*[a-z])(?=.*[A-Z])[\w\W]{8,}/;
        let email=form[0].value;
        let tel=form[1].value;
        let pass=form[2].value;
        let errorEmail=document.getElementsByClassName("email-incorrect")[0];
        let errorTel=document.getElementsByClassName("tel-incorrect")[0];
        let errorPass=document.getElementsByClassName("password-incorrect")[0];
        let styleErrorEmail=getComputedStyle(errorEmail);
        let styleErrorTel=getComputedStyle(errorTel);
        let styleErrorPass=getComputedStyle(errorPass);
        if(styleErrorEmail.display=="block") errorEmail.style.display="none";
        if(!regexpEmail.test(email)) errorEmail.style.display="block";
        if(styleErrorTel.display=="block") errorTel.style.display="none";
        if(!regexpTel.test(tel)) errorTel.style.display="block";
        if(styleErrorPass.display=="block") errorPass.style.display="none";
        if(!regexpPass.test(pass)) errorPass.style.display="block";
        else alert("Добро пожаловать!");
    }
}
formCheck(document.getElementsByClassName("form-registration")[0]);
/*
2. Используя регулярные выражения, напишите скрипт, который заменяет слово «функция» в 
тексте на «function». Если получится, сделайте так, чтобы «функция» заменялась в любом 
падеже.
*/
regexp=/[Фф]ункц(ия|ии|ией|иональный|иональная)/g;
str="Функция — отношение между элементами, при котором изменение в одном элементе влечёт изменение в другом. Функция в философии — обязанность, круг деятельности. Функция — работа, производимая органом, организмом, прибором; роль, значение чего-либо; назначение чего-либо. Функция — назначение персонажа в литературном произведении. Социальная функция — использование того или иного механизма социальных взаимодействий для достижения определённой цели или реализации определённых ценностей. Функции в математике — закон зависимости одной величины от другой. Функциональная зависимость в теории реляционных баз данных — отношение между атрибутами, характеризующее семантические ограничения хранимых данных. Функция в программировании — фрагмент программного кода, к которому можно обратиться из другого места программы.";
console.log(str.replace(regexp,"function"));
/*
3. С помощью регулярных выражений определите, является ли строка корректным временем вида 
'09.59 am', '12.30 pm'.
*/
regexp=/(0[0-9]|1[0-1])(\.|:|-)(0[0-9]|[0-5][0-9]|00)(\s|)(am|AM|a.m.|A.M.|pm|PM|p.m.|P.M.)|12(\.|:|-)00(\s|)(am|AM|a.m.|A.M.|pm|PM|p.m.|P.M.)/g;
str="09.59 am 12.30 pm 09-59 pm 12:30 am 00:00 am 12:00 am 0:00PM 1121110.54 am";
console.log(str.match(regexp));
/*
4. Удалите одной регуляркой все повторяющиеся слова из строки, например для 
'dsf xxx aaa xxx sd aaa' должно вернуть 'dsf xxx aaa sd'.
*/
str='dsf xxx aaa xxx sd aaa';
regexp=/([a-zA-Zа-яА-ЯёЁ]+)(?!.*\1)/g;
console.log(str.match(regexp));