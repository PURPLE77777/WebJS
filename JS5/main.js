//Практика


/*Задание 1: создайте объект obj = {a: 1, b: 2, c: 3}. Выведите в консоль
элемент с ключом 'c' двумя способами: через квадратные
скобки и через точку. Затем выведите все свойства объекта
через цикл for..in.*/
let obj={
    a:1,
    b:2,
    c:3
};
console.log("Через точку: "+obj.c+"\nЧерез квадратные скобки: "+obj["c"]);


/*Задание 2: создайте объект city, добавьте ему свойства name (название
города, строка) и population (население, число).*/
let city={
    name: "Zhodino city",
    population: 70000
};


/*Задание 3: создайте массив из шести объектов такого же вида, как city из
задачи 2 – по одному для каждого областного города Беларуси.*/
let cities=[
    {name: "Minsk",population: 2009786},
    {name: "Grodno",population: 361358},
    {name: "Brest",population: 337428},
    {name: "Vitebsk",population: 373764},
    {name: "Mogilev",population: 374644},
    {name: "Gomel",population: 535693}
];


/*Задаине 4: напишите функцию, которая принимает массив из задачи 3 в
качестве параметра и выводит в консоль информацию о каждом городе.*/
function centerOblast() {
    for(let i=0;i<cities.length;i++){
        console.log("Город: "+cities[i].name+"\nКол-во его жителей: "+cities[i].population);
    }
}
centerOblast(cities);


/*Задание 5: создайте в объектах с городами из задачи 3 метод getInfo,
который возвращает строку с информацией о городе
(например, в таком формате: "Город Добруш, население – 18760
человек")*/
for(let i=0;i<cities.length;i++){
    cities[i].getInfo=function(){console.log("Город "+this.name+", население - "+this.population)};
}
for(let i=0;i<cities.length;i++){
    cities[i].getInfo();
}


/*Задание 6: создайте объект с информацией о себе (имя, фамилия,
любимое занятие). Добавьте в него метод, который выводит
эту информацию в консоль в удобочитаемом формате.*/
let me={
    "Имя": "Павел",
    "Фамилия": "Стефанович",
    "Хобби": "волейбол"
};
me.aboutMe=function () {
    console.log("Меня зовут "+this["Имя"]+" "+this["Фамилия"]+", и я люблю играть в "+this["Хобби"]+"!");
}
me.aboutMe();


//ДЗ


/*Задание 1: создайте объект "Цилиндр" (свойства – радиус и высота). 
Добавьте в него метод, который считает объём цилиндра (используя this).*/
let cylinder={
    radius: Number(prompt("Введите желаемый радиус:")),
    height: Number(prompt("Введите желаемую высоту:")),
    volume(){
        console.log("Объём получившегося цилиндра: "+Math.round(Math.PI*this.radius**2*this.height*100)/100);
    },
    cake(alpha){
        console.log("Объём оставшейся части цилиндра: "+Math.round(Math.PI*this.radius**2*(1-alpha/360)*this.height*100)/100);
    }
};
cylinder.volume();
cylinder.cake(Number(prompt("Какой угол убираемого сектора цилиндра?")));


/*Задание 2: Выберите пингвина из списка вымышленных пингвинов на Википедии
и опишите его в виде объекта (не менее трёх полей; например, имя, создатель и источник).*/
let penguin={
    name: "Капитан Кук",
    creator: "Ричард и Флоренс Этуотер",
    source: "Пингвины мистера Поппера"
};
//Добавьте этому объекту свойство canFly.
penguin.canFly=prompt("Пингвин может летать?");
/*Добавьте два метода: sayHello, который выводит в консоль приветствие и представление
вашего пингвина, и fly, который в зависимости от значения свойства canFly (true или false)
определяет, может ли пингвин летать, и сообщает об этом в консоль.*/
penguin.sayHello=function () {
    console.log("Привет! Меня зовут "+this.name+", и я пингвин из <<"+this.source+">>.\nМои создатели: "+this.creator);
}
penguin.sayHello();
penguin.fly=function () {
    if(this.canFly=="Да"|this.canFly=="да")
    console.log(this.name+" умеет летать!)");
    else if(this.canFly=="Нет"|this.canFly=="нет")
    console.log(this.name+" не умеет летать :(");
}
penguin.fly();


/*Задание 3: создайте несколько (3-4) объектов одинаковой структуры, которые описывают
ваши любимые книги (автор, название, год издания + любые другие свойства на ваше усмотрение).
Добавьте в каждый из них метод для вывода в консоль краткой информации о книге 
(например, в формате Автор — Название).*/
let books=[
    {name: "Ведьмак", author: "Анджей Сапковский", year: 1986, genre: "фэнтэзи, приключения, драма, ужасы"},
    {name: "Игра престолов", author: "Джордж Рэймонд Ричард Мартин", year: 1996, genre: "фэнтези, драма, боевик, мелодрама, приключения"},
    {name: "Война и мир", author: "Лев Николаевич Толстой", year: 1873, genre: "роман-эпопея"},
    {name: "Мастер и Маргарита", author: "Михаил Булгаков", year: 1967, genre: "роман"}
];
for(let i=0;i<books.length;i++){
    books[i].bookInfo=function () {
        console.log(
            "Книга: "+"<<"+this.name+">>"+
            "\nАвтор: "+this.author+
            "\nГод издания: "+this.year+
            "\nЖанр: "+this.genre);
    }
}
let numberBook=Number(prompt("Введите номер книги соответственно:\n1. Ведьмак\n2. Игра престолов\n3. Война и мир\n4. Мастер и Маргарита"));
switch(numberBook){
    case 1: case 2: case 3: case 4:
        books[numberBook-1].bookInfo();
        break;
    default:
        console.log("Пока!");
        break;
}


/*Задание 4: создайте функцию, которая получает в качестве аргументов два объекта с книгами 
(из задачи 3) и возвращает ту книгу, которая издана раньше.*/
function Older(a,b) {
    if(books[a-1].year<books[b-1].year){
        books[a-1].bookInfo();
        books[b-1].bookInfo();
        console.log("Книга "+books[a-1].name+" издана раньше, чем "+books[b-1].name);
    }
    else if(books[a-1].year>books[b-1].year){
        books[a-1].bookInfo();
        books[b-1].bookInfo();
        console.log("Книга "+books[b-1].name+" издана раньше, чем "+books[a-1].name);
    }
    else{
        books[a-1].bookInfo();
        books[b-1].bookInfo();
        console.log("Книги "+books[a-1].name+" и "+books[b-1].name+" изданы в один год");
    }
}
Older(Number(prompt("Введите номер соответствующей 1-ой книге (1-4): ")),Number(prompt("Введите номер соответствующей 2-ой книге (1-4): ")));