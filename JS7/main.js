//Практика


/*
1. Напишите функцию, которая создаёт и возвращает массив
длиной 20 элементов, каждый из которых – случайное число от
1 до 50.
*/
function getRandomArr() {
    let arr=[];
    for(let i=0;i<20;i++){
        arr[i]=Math.round(Math.random()/2*100);
    }
    return arr;
}
getRandomArr();
/*
2. Перепишите функцию из задачи 1, так, чтобы она принимала
три аргумента: длину нужного массива, минимальное и
максимальное значения элементов.
*/
function getRandomArr(length, min, max) {
    let arr=[];
    let ranNum;
    for(let i=0;i<length;i++){
        ranNum=Math.round(Math.random()/2*100);
        if(ranNum>=min&ranNum<=max){
            arr[i]=ranNum;
        }
        else i--;
    }
    return arr;
}
getRandomArr(Number(prompt("Введите длину массива: ")),Number(prompt("Введите min массива: ")),Number(prompt("Введите max массива: ")));
/*
3. Напишите функцию, которая проверяет, начинается ли строка
на https:// и заканчивается ли она на .html. Если оба условия
выполнены, функция возвращает true, в ином случае – false.
*/
function linkCheck(link) {
    link.toLowerCase();
    if(link.substr(0,8)=="https://"&link.substr(link.length-5)==".html")
    return true;
    else return false;
}
linkCheck(prompt("Вставьте ссылку:"));
/*
4. Напишите функцию, которая считает, сколько раз
определённый символ встречается в строке.
*/
function charCheck(str, smbl) {
    let counter=-1;
    for(let i=0;i<str.length;i++){
        if(str[i]==smbl)
        counter++;
    }
    console.log("Символ \""+smbl+"\" повторяется "+counter+" раз(а)");
}
charCheck(prompt("Вставьте фразу:"),prompt("Какой повторяющийся символ будем считать (с учётом регистра)?"));
/*
5. Перепишите функцию из задачи 4 так, чтобы она считала
большие и маленькие буквы одним и тем же символом (например, 'A' == 'a').
*/
function charCheck(str, smbl) {
    str=str.toLowerCase();
    smbl=smbl.toLowerCase();
    let counter=-1;
    for(let i=0;i<str.length;i++){
        if(str[i]==smbl)
        counter++;
    }
    console.log("Символ \""+smbl+"\" повторяется "+counter+" раз(а)");
}
charCheck(prompt("Вставьте фразу:"),prompt("Какой повторяющийся символ будем считать?"));
/*
6. Напишите функцию, которая выводит в консоль текущие дату,
месяц и год в формате «24 января 2019».
*/
function recentDate(time) {
    let month=["января","февраля","марта","апреля","мая","июня","июля", "августа","сентября","октября","ноября","декабря"];
    console.log(time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear());
}
recentDate(new Date());
/*
7. Напишите функцию, которая выводит в консоль количество
секунд, прошедших с начала текущего дня.
*/
function secds(time) {
    console.log(time.getSeconds()+60*time.getMinutes()+3600*time.getHours());
}
secds(new Date());
/*
8. Напишите функцию, которая принимает от пользователя строку.
Если эта строка не содержит буквы «ф», сгенерируйте
собственную ошибку. Вызовите функцию так, чтобы при
возникновении «поймать» ошибку в try/catch.
*/
function безБуквыФ(str) {
    try{
        str=str.toLowerCase();
        if(str.indexOf("ф")==-1)
        хобана;
    }
    catch(error){
        confirm(error.message="Строка "+str+" без буквы \"ф\"");
    }
    finally{
        console.log("Конец функции");
    }
}
безБуквыФ(prompt("Вставьте строку:"));


//ДЗ


/*
1. Напишите функцию, которая принимает массив случайных чисел (см. задачу 2 в практике)
и создаёт на его основе новый. Элементы нового массива – объекты вида {initial: num1,
sqrt: num2, floor: boolean1, ceil: boolean2}. initial – значение элемента исходного
массива с тем же индексом, sqrt – корень квадратный из этого значения. Если округление
sqrt по обычным математическим правилам сходится с его округлением через floor,
то floor = true, а ceil = false. Если сходится с округлением через ceil - наоборот.
Например, пусть у исходного массива arr[0] = 19, тогда в новом массиве
newArr[0] = {initial: 19, sqrt: 4.358898943540674, floor: true, ceil: false}.
*/
function arrayNew(arr) {
    let arrNew=[];
    let floor, ceil;
    for(let i=0;i<arr.length;i++){
        if(Math.round(Math.sqrt(arr[i]).toFixed(1))==Math.floor(Math.sqrt(arr[i]).toFixed(1))){
            floor=true;
            ceil=false;
        }
        else{
            floor=false;
            ceil=true;
        }
        arrNew[i]={
            initial: arr[i],
            sqrt: Math.sqrt(arr[i]), 
            floor: floor,
            ceil: ceil
        };
    }
    return arrNew;
}
let arN=arrayNew(getRandomArr(Number(prompt("Введите длину массива: ")),Number(prompt("Введите min массива: ")),Number(prompt("Введите max массива: "))));
/*
2. Добавьте в каждый элемент массива из задачи 1 ещё одно свойство: значение sqrt,
округлённое до сотых.
*/
for(let i=0;i<arN.length;i++){
    arN[i].sqrtRound=arN[i].sqrt.toFixed(2);
}
/*
3. Напишите функцию, которая определяет, является ли строка палиндромом.
*/
function polindromCheck(str) {
    str=str.toLowerCase();
    str=str.split("");
    let symbolsDelete=[" ",".",",","..","...","?","!",":","-"];
    for(let i=0;i<str.length;i++){
        for(let j=0;j<symbolsDelete.length;j++){
            if(str[i]==symbolsDelete[j]){
                str.splice(i,1);
                i--;
            }
        }
    }
    let sub=str.concat();
    sub=sub.reverse();
    let counter=0;
    for(let i=0;i<str.length;i++){
        if(str[i]==sub[i])
        counter++;
    }
    if(counter==str.length) return true;
    else return false;
}
polindromCheck(prompt("Вставьте строку:"));
/*
4. Напишите функцию, которая принимает строку и возвращает символ, который встречается
в ней чаще всего. Если таких символов несколько, функция должна возвращать строку из этих
символов.
*/
function smblPopulat(str) {
    console.log(str);
    str=str.toLowerCase();
    str=str.split("");
    let symbolsDelete=[" ",".",",","..","...","?","!",":","-"];
    for(let i=0;i<str.length;i++){
        for(let j=0;j<symbolsDelete.length;j++){
            if(str[i]==symbolsDelete[j]){
                str.splice(i,1);
                i--;
            }
        }
    }
    let counter, max=0, popsmbl="";
    for(let i=0;i<str.length;i++){
        counter=0;
        for(let j=i;j<str.length;j++){
            if(str[i]==str[j]) counter++;
        }
        if(max==counter) {
            max=counter;
            popsmbl+=str[i];
        }
        if(max<counter) {
            max=counter;
            popsmbl=str[i];
        }
    }
    return popsmbl;
}
smblPopulat(prompt("Вставьте строку:"));
/*
5. Напишите функцию, которая получает в аргументы три строки – str, search, replace.
Функция ищет ВСЕ вхождения search в str, заменяет каждую подстроку search на подстроку
replace и возвращает результат.
*/
function entry(str, search, replace) {
    let index, sub;
    for(let i=0;i<str.length;i++){
        index=str.indexOf(search,i);
        sub=str.split("");
        sub.splice(index,search.length,replace);
        str=sub.join("");
    }
    console.log(str);//изменяет последний символ на "*", почему?
}
entry(prompt("Вставьте строку:"),prompt("Какое вхождение будем искать:"),prompt("На что будем заменять вхождения:"));
/*
6. Напишите функцию, которая замяняет первую букву каждого слова в строке на такую же большую.
*/
function big(str) {
    str=str.split("");
    for(let i=0;i<str.length;i++){
        str[str.indexOf(" ",i)+1]=str[str.indexOf(" ",i)+1].toUpperCase();
    }
    str=str.join("");
    console.log(str);
}
big(prompt("Вставьте строку:"));
/*
7.Напишите функцию, которая заменяет все повторяющиеся символы в строке на звёздочки.
Например, строка "я учусь программированию" должна преобразоваться в "я уч*сь прог*ам*и**в*н*ю".
*/
function repeats(str) {
    str=str.split("");
    let symbols=[" ",".",",","..","...","?","!",":","-"];
    for(let i=0;i<str.length;i++){
        for(let z=0;z<str.length;z++){
            if(str[i]!=symbols[z]) continue;
            else i++;
        }
        for(let j=i+1;j<str.length;j++){
            if(str[i]==str[j]) str[j]='*';
        }
    }
    str=str.join("");
    return str;
}
repeats(prompt("Вставьте строку:"));
/*
8.Напишите функцию, которая возвращает текущий день недели на русском языке.
*/
function dayWeek(day) {
    let days=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];
    console.log(days[day.getDay()]);
}
dayWeek(new Date());
/*
9.Напишите функцию, которая принимает у пользователя дату в формате "ДД-ММ-ГГГГ" и, 
используя функцию из задачи 8, выдаёт в консоль день недели для этой даты.
*/
function dateFormat(day) {
    day=day.split("-");
    dayWeek(new Date(day[2],day[1]-1,day[0]));
}
dateFormat(prompt("Введите дату в формате ДД-ММ-ГГГГ:"));
/*
10. Примите у пользователя день его рождения в формате "ДД-ММ-ГГГГ".
Напишите функцию, которая выводит в консоль количество дней, оставшихся до его дня рождения.
Напишите функцию, которая возвращает дату, в которую пользователь отметит ближайший
1000-дневный юбилей (например, 11000 дней).
*/
function dayBirthday(dayBirth) {
    dayBirth=dayBirth.split("-");
    dayBirth=new Date(dayBirth[2],dayBirth[1]-1,dayBirth[0]);
    let now= new Date();
    let days=Math.ceil((dayBirth.getTime()-now.getTime())/1000/3600/24);
    console.log("До вашего дня рождения осталось дней: "+days);
    anniversary(prompt("Введите дату вашего дня рождения в формате ДД-ММ-ГГГГ:"));
}
function anniversary(dayOfBirth) {
    dayOfBirth=dayOfBirth.split("-");
    dayOfBirth=new Date(dayOfBirth[2],dayOfBirth[1]-1,dayOfBirth[0]);
    let dateNew=new Date();
    for(let i=0;;i++){
        dateNew.setTime(dayOfBirth.getTime()+[i]*24*3600*1000);
        if((dateNew.getTime()-dayOfBirth.getTime())/1000/3600/24%1000==0&dateNew.getTime()>Date.now()){
            console.log("Ваш ближайший 1000-дневный юбилей будет:\n"+dateNew);
            console.log("Разница от дня рождения: "+(dateNew.getTime()-dayOfBirth.getTime())/1000/3600/24+" дней");
            break;
        }
    }
}
dayBirthday(prompt("Введите дату вашего ближайшего дня рождения в формате ДД-ММ-ГГГГ:"));