// Практика 1


//Задание 1: создайте массив и в цикле заполните его чётными числами от 2 до 20
let arr=[];
let index=0;
let number=Number(prompt("До какого числа будем вводить чётные числа в массив?"));
for(let i=1;i<=number;i++){
    if(i%2==0){
        arr[index]=i;
        index++;
    }
}
console.log("Получившийся массив из чётных чисел:");
for(let i=0;i<arr.length;i++){
    console.log(arr[i]);
}


//Задание 2: преобразуйте массив из задачи 1 так, чтобы его элементы стали равны своему индексу, умноженному на 5
console.log("Изменённый массив из задания 1:");
for(let i=0;i<arr.length;i++){
    arr[i]=i*5;
    console.log(arr[i]);
}


//Задание 3: преобразуйте массив из задачи 2 так, чтобы его элементы расположились в обратном порядке
console.log("Преобразованный массив из задания 2:");
let arrNew=[];
for(let i=1;i<=arr.length;i++){
    arrNew[i-1]=arr[arr.length-i];

}
for(let i=0;i<arr.length;i++){
    arr[i]=arrNew[i];
    console.log(arr[i]);
}


//Задание 4: получите от пользователя три числа, создайте из них массив. Используя циклы, найдите наибольшее из чисел и разделите на него каждый элемент массива
function Fun(a,b,c) {
    let array=[a,b,c];
    if(a>=b&a>=c){
        let result=a;
        for(let i=0;i<array.length;i++){
            result/=array[i];
        }
        console.log("Результат деления: "+result);
    }
    else if(b>=a&b>=c){
        let result=b;
        for(let i=0;i<array.length;i++){
            result/=array[i];
        }
        console.log("Результат деления: "+result);
    }
    else if(c>=a&c>=b){
        let result=c;
        for(let i=0;i<array.length;i++){
            result/=array[i];
        }
        console.log("Результат деления: "+result);
    }
}
Fun(Number(prompt("Введите 1-ое число массива:")),Number(prompt("Введите 2-ое число массива:")),Number(prompt("Введите 3-е число массива:")));


//Практика 2


//Задание 1: Создайте массив из чисел от 1 до 35.   
let ray=[];
for(let i=0;i<35;i++){
    ray[i]=i+1;
}
//Вырежьте из него первые 10 элементов, а затем добавьте их в конец массива.
let rayNew=ray.splice(0,10);
ray=ray.concat(rayNew);
console.log(ray);
//Разверните в обратном порядке элементы с 11 по 20.
rayNew=ray.slice(10,20);
rayNew=rayNew.reverse();
for(let i=10;i<20;i++){
    ray[i]=rayNew[i-10];
}
console.log(ray);
//Удалите элементы с 21 по 25, на их место вставьте пять первых степеней двойки.
for(let i=20;i<25;i++){
    ray.fill(2**(i-20),i,i+1);
}
console.log(ray);
//Элементы с 26 по 30 замените на единицы.
ray.fill(1,25,30);
console.log(ray);
//Элементы с 31 по 35 склейте в одну строку, разделяя пробелами, и замените на итоговую строку.
rayNew.length=rayNew.length-5;
rayNew=ray.slice(30,35);
rayNew=rayNew.join(" ");
ray.splice(30,5);
ray.push(rayNew);
console.log(ray);


//Задание 2: напишите функцию, которая удаляет из массива повторяющиеся элементы и возвращает обновлённый массив
function rep() {
    let index;
    let counter=0;
    for(let i=0; i<array.length-1;i++){
        if(array[i]!=="delete"){
            if(array.indexOf(array[i],i+1)>-1){
                counter++;
                index=array.indexOf(array[i],i+1);
                array.fill("delete",index,index+1);
            }
        }
    }
    for(let i=0;i<counter;i++){
        // if(array.lastIndexOf("delete",0)>-1){
        index=array.lastIndexOf("delete");
        array.splice(index,1);
        // }
    }
    if(counter==0){
        console.log("Ваш массив без повторений");
    }
    return array;
}
let array=[];
let elementsArray=prompt("Введите кол-во элементов в массиве:");
for(let i=0;i<elementsArray;i++){
    array[i]=prompt("Введите "+(i+1)+" элемент массива:");
}
console.log("Введёный вами массив: "+array);
rep(array);


//Задание 3: напишите функцию, удаляющую из массива все элементы, которые при приведении к типу Boolean дают false.
function rep() {
    let index;
    let counter=0;
    for(let i=0; i<array.length-1;i++){
        if(array[i]!=="delete"){
            if(Boolean(Number(array[i]))===false){
                counter++;
                array[i]="delete";
            }
        }
    }
    for(let i=0;i<counter;i++){
        index=array.lastIndexOf("delete");
        array.splice(index,1);
    }
    if(counter==0){
        console.log("Все элементы вашего массива дают true");
    }
    return array;
}
let array=[];
let elementsArray=prompt("Введите кол-во элементов в массиве:");
for(let i=0;i<elementsArray;i++){
    array[i]=prompt("Введите "+(i+1)+" элемент массива:");
}
console.log("Введёный вами массив: "+array);
rep(array);


//ДЗ


//Звдввние 1: используя встроенную функцию Math.random(), напишите собственную функцию getRandomArray(len), которая возвращает массив случайных чисел длиной len.



