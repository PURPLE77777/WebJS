let a=7;
let b=5;
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