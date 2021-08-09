//Практика


/*
1. Выведите координаты мыши относительно блока в момент движения
курсора мыши внутри блока. Координаты выводить под блоком в элементе output.
*/
let div=document.getElementsByClassName("divchick")[0];
let outX=document.getElementsByName("outX")[0];
let outY=document.getElementsByName("outY")[0];
console.log(div.offsetTop);
let styleDiv=getComputedStyle(div)
div.addEventListener("mousemove",function(e){
    outX.value=e.clientX-parseInt(div.offsetLeft);
    outY.value=e.clientY-parseInt(div.offsetTop);
});
/*
2. Реализуйте в верхней части страницы «полоску прогресса», которая
будет показывать, на какой процент проскроллена страница.
*/
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
let scroll=document.getElementsByClassName("scroll")[0];
console.log(scrollHeight-document.documentElement.clientHeight);
window.addEventListener("scroll",function(){
    scroll.style.width=Math.round(window.pageYOffset/(scrollHeight-document.documentElement.clientHeight)*100)+"%";
});