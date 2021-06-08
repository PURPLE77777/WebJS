console.log("Практика 1\n\n\n");
console.log("Задание 1: вывести большее из двух введенный чисел\n");
let a1=Number(prompt("Введите первое число",""));
let b1=Number(prompt("Введите второе число",""));
if (a1>b1){
    console.log("Число "+a1+" больше числа "+b1);
}
else if(a1<b1){
    console.log("Число "+b1+" больше числа "+a1);
}
else if(a1==b1){
    console.log("Введённые вами числа равны");
}
console.log("Задание 2: вывести три введённых числа в порядке возрастания\n");
let a2=Number(prompt("Введите первое число:",""));
let b2=Number(prompt("Введите второе число:",""));
let c2=Number(prompt("Введите третье число:",""));
if(a2>=b2&b2>=c2){
    console.log("Введённые числа в порядке возрастания:\n"+c2+", "+b2+", "+a2);
}
else if(a2>=b2&c2>=b2){
    console.log("Введённые числа в порядке возрастания:\n"+b2+", "+c2+", "+a2);
}
else if(b2>=a2&a2>=c2){
    console.log("Введённые числа в порядке возрастания:\n"+c2+", "+a2+", "+b2);
}
else if(b2>=a2&c2>=a2){
    console.log("Введённые числа в порядке возрастания:\n"+a2+", "+c2+", "+b2);
}
else if(c2>=a2&a2>=b2){
    console.log("Введённые числа в порядке возрастания:\n"+b2+", "+a2+", "+c2);
}
else if(c2>=a2&b2>=a2){
    console.log("Введённые числа в порядке возрастания:\n"+a2+", "+b2+", "+c2);
}
console.log("Задание 3: вывести три введённых числа в порядке возрастания через тернарный оператор\n");
let a2=Number(prompt("Введите первое число:",""));
let b2=Number(prompt("Введите второе число:",""));
let c2=Number(prompt("Введите третье число:",""));
(a2>=b2&b2>=c2)?console.log("Введённые числа в порядке возрастания:\n"+c2+", "+b2+", "+a2):
(a2>=b2&c2>=b2)?console.log("Введённые числа в порядке возрастания:\n"+b2+", "+c2+", "+a2):
(b2>=a2&a2>=c2)?console.log("Введённые числа в порядке возрастания:\n"+c2+", "+a2+", "+b2):
(b2>=a2&c2>=a2)?console.log("Введённые числа в порядке возрастания:\n"+a2+", "+c2+", "+b2):
(c2>=a2&a2>=b2)?console.log("Введённые числа в порядке возрастания:\n"+b2+", "+a2+", "+c2):
(c2>=a2&b2>=a2)?console.log("Введённые числа в порядке возрастания:\n"+a2+", "+b2+", "+c2):
console.log("Что-то не то :(");
console.log("Задание 4: вывести определённые сообщения в зависимости от введённого числа\n");
let a3=Number(prompt("Введите число от 1 до 3:",""));
switch(a3){
    case 1:
        console.log("Вы ввели число 1 :)");
        break;
    case 2:
        console.log("Вы ввели число 2 :)");
        break;
    case 3:
        console.log("Вы ввели число 3 :)");
        break;
    default:
        console.log("Вы ввели число не в соответствии с заданным промежутком :(");
        break;
}
console.log("Практика 2\n\n\n");
console.log("Задание 1: подсчитать и вывести сумму чисел от 1 до х\n");
let x1=Number(prompt("До какого числа будем считать сумму чисел от 1?"),"");
let sum=0;
for(let i=1; i<=x1; i++){
    sum+=i;
}
console.log("Сумма чисел от 1 до "+ x + ": "+ sum);
console.log("Задание 2: вывести в консоль все чётные числа от x до 0 (в порядке убывания)\n");
let x2=Number(prompt("До какого числа будем выводить все чётные числа по убыванию"),"");
console.log("Все чётные числа от 0 до "+ x2 +" по убыванию:\n");
for(let i=0; i<x2; x2--){
    if(x2%2==0){
        console.log(x2);
    }
}
console.log("Задание 3: перепеписать задачу 2, используя while вместо for\n");
let x3=Number(prompt("До какого числа будем выводить все чётные числа по убыванию"),"");
console.log("Все чётные числа от 0 до "+ x3 +" по убыванию:\n");
let i=0;
while(i<x3){
    if(x3%2==0){
        console.log(x3);
    }
    x3--;
}
console.log("ДЗ 1\n");
let number_flat=Number(prompt("Введите номер вашей квартиры (1-100):",""));
if(number_flat>0&number_flat<=100){
    if(number_flat<=20){
        console.log("Квартира под номером "+ number_flat +" находится в 1-ом подъезде");
    }
    else if(number_flat<=40&number_flat>20){
        console.log("Квартира под номером "+ number_flat +" находится во 2-ом подъезде");
    }
    else if(number_flat<=60&number_flat>40){
        console.log("Квартира под номером "+ number_flat +" находится в 3-ем подъезде");
    }
    else if(number_flat<=80&number_flat>60){
        console.log("Квартира под номером "+ number_flat +" находится в 4-ом подъезде");
    }
    else if(number_flat<=100&number_flat>80){
        console.log("Квартира под номером "+ number_flat +" находится в 5-ом подъезде");
    }
}
else if(number_flat<=0|number_flat>100){
    console.log("Такой квартиры нет");
}
console.log("ДЗ 2\n");
let auto_mark=prompt("Введите одну из марок автомобилей (BMV, Ford, Peugeot, Toyota, Volkswagen, Nissan)","");
switch(auto_mark){
    case "BMV":
        console.log(auto_mark+" - страна происхождения Германия");
        break;
    case "Ford":
        console.log(auto_mark+" - страна происхождения США");
        break;
    case "Peugeot":
        console.log(auto_mark+" - страна происхождения Франция");
        break;
    case "Toyota":
        console.log(auto_mark+" - страна происхождения Япония");
        break;
    case "Volkswagen":
        console.log(auto_mark+" - страна происхождения Германия");
        break;
    case "Nissan":
        console.log(auto_mark+" - страна происхождения Япония");
        break;
    default:
        console.log(auto_mark+" - страна происхождения неизвестна");
        break;
}
console.log("ДЗ 3\n");
while(true){
    let year=Number(prompt("Введите год",""));
    if(year>=0&year%4==0){
        console.log(year+" год является високосным! :)");
        break;
    }
    else if(year<0){
        console.log("Введите корректный год");
    }
    else {
        console.log(year+" год не является високосным");
        break;
    }
}
console.log("ДЗ 4\n");
while(true){
    let some_number=Number(prompt("Введите число от 1 до 20",""));
    console.log("Таблица умножения введённого числа:");
    if(some_number>0&some_number<=20){
        for(let i=1;i<=10;i++){
            console.log(some_number+"x"+i+"="+some_number*i);
        }
        break;
    }
    else{
        console.log("Введите корректное число!");
    }
}
console.log("ДЗ 5\n");
let sum=0;
for(let i=1; i<50;i++){
    if(i%2==1|i==1){
        sum+=i;
    }
}
console.log("Сумма всех нечётных чисел от 1 до 50: "+sum);
console.log("ДЗ 6\n");
let first=0;
let second=1;
let next_number=0;
console.log("Первые 15 чисел Фибоначчи:");
console.log(first);
for(let i=0;i<=13;i++){
    first=second;
    second=next_number;
    next_number=first+second;
    console.log(next_number);
}
console.log("ДЗ 7\n");
for(let i=1;i<=8;i++){
    if(i%2==1){
        console.log("\t#\t#\t#\t#");
    }
    else{
        console.log("#\t#\t#\t#\t");
    }
}
console.log("ДЗ 7 с использованием конкатенации\n");
for(let i=1;i<=4;i++){
    console.log("\t#\t#\t#\t#"+"\n#\t#\t#\t#\t");
}