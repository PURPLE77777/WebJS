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
        index=array.lastIndexOf("delete");
        array.splice(index,1);
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


function getRandomArray() {
    let randarray=[];
    for(let i=0;i<len;i++){
        randarray[i]=Math.round(Math.random()*100)/100;
    }
    return randarray;
}


//Задание 2: выведите в консоль элементы массива, которые больше среднего арифметического всех элементов.
function zad2() {
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    let sum=0;
    for(let i=0;i<len;i++){
        sum+=array[i];
    }
    console.log("Среднее арифметическое: "+Math.round(sum/len*100)/100);
    console.log("Элементы массива, которые больше среднего арифметического всех элементов:");
    for(let i=0;i<len;i++){
        if(array[i]>Math.round(sum/len*100)/100)
        console.log(array[i]);
    }
}
let len=Number(prompt("Введите длину массива:"));
zad2();


//Задание 3: найдите два наименьших элемента массива.
function zad3() {
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    // Первый метод
    /*array.sort();
    let min1=array[0];
    let min2=array[1];*/
    //Второй метод
    let min1=array[0];
    let min2=array[0];
    for(let i=0;i<len;i++){
        if(min1>array[i]){
            min1=array[i];
        }
    }
    for(let i=0;i<len;i++){
        if(min2>array[i]&array[i]!==min1){
            min2=array[i];
        }
    }
    console.log("Первый наименьший элемент массива: "+min1);
    console.log("Второй наименьший элемент массива: "+min2);
}
len=Number(prompt("Введите длину массива:"));
zad3();


//Задание 4: удалите из массива все элементы, меньшие 0.3. Сдвиньте все оставшиеся элементы вперёд, а на освободившиеся места вставьте нули.


function zad4(){
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    for(;len!==0;len--){
        if(array[len-1]<0.3){
            let index=len-1;
            for(;index!==-1;index--){ //передвигает значения элементов массива вперёд
                array[index]=array[index-1];
            }
            array[0]=0;
            index=len-1;
            for(;index!==-1;index--){ //проверка на то, есть ли ещё значения >=0.3
                if(array[index]>=0.3){
                    len++;
                    break;
                }
            }
        }
    }
    console.log("Итоговый массив: "+array);
}
let len=Number(prompt("Введите длину массива:"));
zad4();


//Задание 5: попарно сложите элементы двух массивов равной длины: первый массива 1 с последним массива 2, второй массива 1 с предпоследним массива 2 и так далее. Верните массив с результатами сложения.


function zad5(){
    let array1=getRandomArray(len);
    let array2=getRandomArray(len);
    let arrayOfSum=[len];
    console.log("Получившийся 1-ый массив: "+array1);
    console.log("Получившийся 2-ой массив: "+array2);
    for(let i=0;i<len;i++){
        arrayOfSum[i]=Math.round((array1[i]+array2[len-i-1])*100)/100;
    }
    console.log("Итоговый массив: "+arrayOfSum);
}
let len=Number(prompt("Введите длину массива:"));
zad5();


//Задаине 6: отсортируйте массив методом пузырька.


function zad6(){
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    for(let j=0;j<len-1;j++){
        for(let i=0;i<len-1;i++){
            if(array[i]>array[i+1]){
                let intm=array[i];
                array[i]=array[i+1];
                array[i+1]=intm;
            }
        }
    }
    console.log("Итоговый массив: "+array);
}
let len=Number(prompt("Введите длину массива:"));
zad6();


//Задание 7: проверьте, есть ли в массиве два числа, сумма которых очень близка к 1 (0.999 < sum < 1.001). Если такая пара (или такие пары) есть, выведите их в консоль.


function zad7(){
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    let counter=0;
    let control=[]; //массив, проверяющий, есть ли похожие пары чисел
    for(let j=0;j<len-1;j++){
        for(let i=j+1;i<len-1;i++){
            if(array[j]+array[i]>=0.99&array[j]+array[i]<=1.01){ 
                if(control.indexOf(array[i])>-1&control.indexOf(array[j])>-1){ //проверка на то, была ли эта пара чисел найдена раньше
                    continue;
                }
                else {
                    if(control.indexOf(array[i])==-1)
                    control.push(array[i]);
                    if(control.indexOf(array[j])==-1)
                    control.push(array[j]);
                    console.log("Сумма чисел "+array[j]+" и "+array[i]+" близка к 1");
                    counter++;
                }
            }
        }
    }
    if(counter==0)
    console.log("Нету пар чисел, сумма которых близка к единице");
}
let len=Number(prompt("Введите длину массива:"));
zad7();


//Задание 8: создайте массив той же длины, что исходный. На месте самого большого числа исходного массива в новом вставьте число 1, на месте второго по величине – 2 и так далее.


function zad8(){
    let array1=getRandomArray(len);
    console.log("Получившийся массив: "+array1);
    let array2=array1.slice();
    let counter=1;
    array1.sort();
    for(let i=0;i<len;i++){
        array2[array2.indexOf(array1[len-1-i])]=counter;
        counter++;
    }
    console.log("Итоговый массив: "+array2);
}
let len=Number(prompt("Введите длину массива:"));
zad8();


//Задание 9: сделайте сдвиг массива вправо на X позиций (X передайте в функцию в качестве аргумента). Элементы, которые после сдвига "уходят" за пределы его длины, переместите на освободившиеся первые Х позиций.


function zad9(shift){
    let array=getRandomArray(len);
    console.log("Получившийся массив: "+array);
    let sub=array.splice(len-shift,shift);
    array.unshift(sub);
    console.log("Итоговый массив: "+array);
}
let len=Number(prompt("Введите длину массива:"));
zad9(Number(prompt("Введите желаемый сдвиг элементов массива:")));