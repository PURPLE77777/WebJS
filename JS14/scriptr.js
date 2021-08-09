//Практика


/*
1. Реализуйте в прототипном стиле класс Machine с базовыми методами
включить/выключить. Создайте класс Fridge и отнаследуйтесь от Machine, создайте
метод на охлаждение, а так же сделайте так, чтобы методы включения/выключения
работали с выводом в консоль сообщения с текущим значением enabled.
*/
function Machine(enabled){
    this.enabled=enabled;
}
Machine.prototype.fridge=function(){
    if(this.enabled) {
        let tempCurrent=Number(prompt("Введите текущую температуру в градусах:","25"));
        let chill=Number(prompt("Насколько понизить текущую температуру?","20"));
        console.log("Устройство включено: "+this.enabled+"\nТемпература понизилась до "+(tempCurrent-chill)+" градусов");
    }
    else console.log("Устройство выключено: "+this.enabled);
}
let Fridge=new Machine("true"==prompt("Включить холодос? (true или false)","true"));
Fridge.fridge();
/*2. Реализуйте класс MyString, который будет иметь следующие методы: метод reverse(),
который параметром принимает строку, а возвращает ее в перевернутом виде, метод
ucFirst(), который параметром принимает строку, а возвращает эту же строку, сделав
ее первую букву заглавной и метод ucWords, который принимает строку и делает
заглавной первую букву каждого слова этой строки.
*/
function MyString(){
    this.reverse=function(str){
        console.log(str.split("").reverse().join(""));
    }
    this.ucFirst=function(str){
        let strNew=str.split("");
        strNew[0]=strNew[0].toUpperCase();
        console.log(strNew.join(""));
    }
    this.ucWords=function(str){
        let strNew=str.split(" ");
        strNew.forEach(function(elem, index, arr) {
            let symbols=elem.split("");
            symbols[0]=symbols[0].toUpperCase();
            arr[index]=symbols.join("");
        });
        console.log(strNew.join(" "));
    }
}
let strMy=new MyString();
strMy.reverse(prompt("Введите строку:","Эти слова не просто называют предметы и их действия, а, находясь рядом, оформляют сообщение, из которого можно узнать, что происходит с тем или иным предметом. Значит, в высказывании слова связаны между собой по смыслу."));
strMy.ucFirst(prompt("Введите строку:","эти слова не просто называют предметы и их действия, а, находясь рядом, оформляют сообщение, из которого можно узнать, что происходит с тем или иным предметом."));
strMy.ucWords(prompt("Введите строку:","Эти слова не просто называют предметы и их действия, а, находясь рядом, оформляют сообщение, из которого можно узнать, что происходит с тем или иным предметом. Значит, в высказывании слова связаны между собой по смыслу."));
/*
3. Реализуйте класс Validator, который будет проверять строки. К примеру, у него будет
метод isEmail параметром принимает строку и проверяет, является ли она корректным
емейлом или нет. Если является - возвращает true, если не является - то false. Кроме
того, класс будет иметь следующие методы: метод isDomain для проверки домена,
метод isDate для проверки даты и метод isPhone для проверки телефона.
*/
function Validator(){
    this.isEmail=function(email){
        let regexp=/.+@.+\..+/;
        console.log(regexp.test(email));
    }
    this.isDomain=function(doman){
        let regexp=/(https|http):\/\/.+\..+/;
        console.log(regexp.test(doman));
    }
    this.isDate=function(date){
        let regexp=/([0-2][0-9]|3[0-1](?!-02))-(0[1-9]|1[0-2])-\d{4}/g;
        console.log(regexp.test(date));
    }
    this.isPhone=function(tel){
        let regexp=/((\+|)375([\s\-]|)|80([\s\-]|))(\(|)(29|25|44|33)(\)|)(|\s|\-|)\d{3}(\s|\-|)\d{2}(\s|\-|)\d{2}/;
        console.log(regexp.test(tel));
    }
}
let userInfo=new Validator();
userInfo.isEmail(prompt("Введите ваш email: ","fdsf.sd@fdaf.vrf"));
userInfo.isDomain(prompt("Введите ваш домен: ","https://yandex.by/"));
userInfo.isDate(prompt("Введите дату в стиле дд--мм-гггг: ","19-03-2007"));
userInfo.isPhone(prompt("Введите ваш телефон: ","+375444617326"));
/*
4. Реализуйте класс Worker (Работник), который будет иметь следующие
свойства: name (имя), surname (фамилия), rate (ставка за день работы), days
(количество отработанных дней). Также класс должен иметь метод
getSalary(), который будет выводить зарплату работника. Зарплата - это
произведение (умножение) ставки rate на количество отработанных дней
days.
*/
class Worker{  
    constructor(name, surname, days, rate){
        this.name=name;
        this.surname=surname;
        this.days=days;
        this.rate=rate;
    }
    getSalary(){
        console.log(`Зарплата ${this.name} ${this.surname} за ${this.days} дней: `+this.rate*this.days+" рублей");
    }
}
let Pasha=new Worker(prompt("Имя работника:","Павел"),prompt("Фамилия работника:","Стефанович"),Number(prompt("Количество отработанный дней работником:",30)),Number(prompt("ставка рабочего:",60)));
Pasha.getSalary();
/*
5. Реализуйте класс User принимающий объект со свойствами name
и password, предусмотрите метод login, возвращающее значение true
в случае совпадение связки имя/пароль и changeName(). Отнаследуйте
класс User в класс Admin и сделайте так, чтобы админ всегда имел
дефолтное поле имя (admin) и чтобы в реализации отсутствовала
возможность смены имени, а также при логине в консоль выводилось
сообщение о том, что админ залогинен.
*/
class User{
    constructor(name, password){
        this.name=name;
        this.password=password;
    }
    check(name,password){
        if(this.name==name&this.password==password) console.log(`Welcome, ${this.name}!`);
        else console.log("Error of initialization!");
    }
    changeName(answer){
        if("yes"==answer){
            this.name=prompt("Enter new name:");
            console.log(`Welcome, ${this.name}!`);
        } 
    }
}
class Admin extends User{
    constructor(password){
        super(null, password);
        this.name="admin";
    }
    check(name,password){
        super.check(name,password);
        console.log(`Good work, ${this.name}!`);
    }
    changeName(){
        console.log(`It mustn't change a ${this.name} name!`);
    }
}
let user=new User(prompt("Enter your name:","noname"),prompt("Enter password:","123"));
user.check(prompt("Enter your name:","noname"),prompt("Enter password:","123"));
user.changeName(prompt("Change name?","yes"));
let admin=new Admin(prompt("Enter password:","456"));
admin.check(prompt("Enter your name:","admin"),prompt("Enter password:","456"));
admin.changeName(prompt("Change name?","yes"));