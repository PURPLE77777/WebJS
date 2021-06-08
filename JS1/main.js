let a=Number(prompt("Введите первое число:",""));
let b=Number(prompt("Введите второе число:",""));
console.log("До перестановки:\n"+"a="+a+", b="+b)
let c=b;
b=a;
a=c;
a=a+b;
b=a-b;
a=a-b;
a^=b;
b^=a;
a^=b;
console.log("После перестановки:\n"+"a="+a+", b="+b); 