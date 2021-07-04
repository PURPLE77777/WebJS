//Задачи на if / else:
/*
1. Создайте функцию, которая принимает три числа: два
первых должны быть длиной сторон катетов
прямоугольного треугольника, а третье – длиной
гипотенузы. Функция возвращает true, если такой
прямоугольный треугольник возможен, и false, если нет.
*/
let triangle={
    checkTriangle(a,b,c){
        if(a+b>c&a+c>b&b+c>a){
            console.log("Такой треугольник существует");
            if(a**2==b**2+c**2|b**2==a**2+c**2|c**2==a**2+b**2){
                console.log("И это прямоугольный прямоугольник!");
                return true;
            }
        }
        else{
            console.log("Такого треугольника не существует :(");
            return false;
        }
    }
};
triangle.checkTriangle(Number(prompt("Введите 1-ую сторону прямоугольника:")),Number(prompt("Введите 2-ую сторону треугольника:")),Number(prompt("Введите 3-ю сторону треугольника:")));
/*
2. Создайте функцию, которая принимает два числа, и
определяет, делится ли одно из них на другое без остатка.
Из функции верните true или false.
*/
function check(a,b) {
    if(a%b==0|b%a==0) return true;
    else return false;
}
check(Number(prompt("Введите 1-ое число:")),Number(prompt("Введите 2-ое число:")));


//Задачи на switch:
/*
3. Создайте функцию, которая получает в качестве аргумента
оценку по 10-балльной шкале. Для ошибочных аргументов (0,
«B») функция возвращает текстовую ошибку, для верных – их
текстовое описание из Википедии.
*/
let grade=[
    {level: "Low", grade: 1,label: "Unsatisfactory","russian equivalent": "1","US equivalent": "F"},
    {level: "Low", grade: 2,label: "Unsatisfactory","russian equivalent": "2","US equivalent": "F"},
    {level: "Satisfactory", grade: 3,label: "Satisfactory","russian equivalent": "3-","US equivalent": "C"},
    {level: "Satisfactory", grade: 4,label: "Satisfactory","russian equivalent": "3","US equivalent": "C+"},
    {level: "Average", grade: 5,label: "Almost good","russian equivalent": "3+","US equivalent": "B-"},
    {level: "Average", grade: 6,label: "Good","russian equivalent": "4-","US equivalent": "B"},
    {level: "Good", grade: 7,label: "Very good","russian equivalent": "4","US equivalent": "B+"},
    {level: "Good", grade: 8,label: "Almost excellent","russian equivalent": "4+","US equivalent": "A-"},
    {level: "High", grade: 9,label: "Excellent","russian equivalent": "5","US equivalent": "A"},
    {level: "High", grade: 10,label: "Brilliant","russian equivalent": "5+","US equivalent": "A+"}
];
function mark(a) {
    switch(a){
        case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:
            for(let key in grade[a-1])
                console.log(key+": "+grade[a-1][key]);
            break;
        default: 
            console.log("Были введены некорректные данные!"); 
            break;
    }
}
mark(Number(prompt("Введите оценку:")));
/*
4. Создайте функцию, которая принимает в качестве аргумента
целое число, соответствующее порядковому номеру месяца.
Если месяц с таким номером существует, функция возвращает
имя сезона (лето, осень, зима, весна), к которому относится
месяц. Если нет – сообщение об ошибке.
*/
function season(a) {
    if(a%1==0&a>0){
        if(a==12|a==1|a==2)
        return "Зима";
        if(a==3|a==4|a==5)
        return "Весна";
        if(a==6|a==7|a==8)
        return "Лето";
        if(a==9|a==10|a==11)
        return "Осень";
    }
    else return "Введите ЦЕЛОЕ ПОЛОЖИТЕЛЬНОЕ и БОЛЬШЕ НУЛЯ число!";
}
season(Number(prompt("Введите порядковый номер месяца (1-12 включительно):")));


//Задачи на циклы:
/*
5. Используя цикл do..while, создайте функцию, которая принимает
числа через prompt(), пока не будет введено число 0.
*/
function zero(a) {
    alert("Вы ввели число: "+a);
    return a;
}
do{}
while(zero(Number(prompt("Введите любое число: ")))!=0);
/*
6. Перепишите функцию из задачи 5 так, чтобы она принимала
числа, пока их сумма остаётся меньше 100, выводила эту сумму в
консоль, а возвращала количество введённых чисел.
*/
function zero(a,sum) {
    alert("Вы ввели число: "+a);
    console.log("Сумма введённых чисел: "+sum);
    counter++;
    console.log("Кол-во введённых чисел: "+counter);
}
let a, sum=0, counter=0;
do{
    a=Number(prompt("Введите любое число: "));
    sum+=a;
    zero(a,sum);
}
while(sum<100);
/*
7. Создайте функцию, которая выводит в консоль числа от 10 до 99,
заканчивающиеся на 7 или делящиеся на 7 (в убывающем порядке).
*/
function seven() {
    let index=0;
    for(let i=10;i<=99;i++){
        if(i%10==7|i%7==0){
            arr[index]=i;
            index++;
        }
    }
    arr.sort();
    arr.reverse();
    return arr;
}
let arr=[];
seven();


//Разные задачи:
/*
8. Создайте функцию, которая принимает два аргумента –
количество учеников в классе и количество парт в кабинете.
Функция возвращает строку вида «не хватает парт: 2» / «лишних
парт: 1». Важно: за одной партой может сидеть два ученика!
*/
function classCheck(students, desk) {
    if(students/desk==2)
    console.log("Парт хватает для всех учеников");
    else if(students/desk<2)
    console.log("Лишних парт: "+(desk-Math.ceil(students/2)));
    else if(students/desk>2)
    console.log("Не хватает парт: "+(Math.ceil(students/2)-desk));
}
classCheck(Number(prompt("Введите кол-во учеников в классе: ")),Number(prompt("Введите кол-во парт в классе: ")));
/*
9. Создайте функцию words(), которая в зависимости от
переданного в нее целого числа n, будет выводить слово
«карандаш» с правильным окончанием («12 карандашей», но «22
карандаша»).
*/
function pencils(n) {
    if(n%10>=5|n%10==0|n%100>10&n%100<=20)
    console.log("Всего "+n+" карандашей");
    else if(n%10==1)
    console.log("Всего "+n+" карандаш");
    else if(n%10>0&n%10<5)
    console.log("Всего "+n+" карандаша");
}
pencils(Number(prompt("Введите кол-во карандашей: ")));
/*
10. Создайте функцию, которая получает два числа и возвращает
знак их произведения. Если результат равен нулю, возвращать ‘+’.
*/
function proiz(a,b) {
    if(a*b>=0)
    console.log("Знак произведения чисел "+a+" и "+b+": +");
    else console.log("Знак произведения чисел "+a+" и "+b+": -");
}
proiz(Number(prompt("Введите 1-ое число: ")),Number(prompt("Введите 2-ое число: ")));
/*
11. Создайте функцию, которая получает число и выводит в консоль
все его делители.
*/
function delits(x) {
    for(let i=1;i<=x/2;i++){
        if(x%i==0)
        console.log(i);
    }
    console.log(x);
}
delits(Number(prompt("Введите число: ")));
/*
12. Создайте функцию, которая проверяет, можно ли представить
число в виде суммы квадратов двух целых однозначных чисел.
*/
function squares(y) {
    let check=0;
    for(let i=0;i<=y;i++){
        if(i**2+i**2==y){
            check++;
            console.log("Число "+y+" можно представить в виде суммы квадратов чисел ("+i+"^2 + "+i+"^2)");
            break;
        }
        else if(check==0&i==y)
        console.log("Число "+y+" нельзя представить в виде суммы квадратов чисел");
    }
}
squares(Number(prompt("Введите число: ")));