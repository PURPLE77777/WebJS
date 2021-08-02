let contNew=document.getElementsByClassName("container-new")[0];
let contProg=document.getElementsByClassName("container-progress")[0];
let contFin=document.getElementsByClassName("container-finish")[0];
let addTask=document.getElementsByClassName("add-task");
let btn=document.getElementsByClassName("btn");
let btnEdit=document.getElementsByClassName("btn_edit");
let inputText=document.querySelectorAll("[type='text']");
let inputNum=document.querySelectorAll("[type='number']");
let description=document.getElementsByClassName("add-task_textarea");
let blockTasks=document.getElementsByClassName("block_tasks");
let current;
for(let i=0; i<btn.length;i++){
    btn[i].addEventListener("click", function(){
        btn[i].style.display="none";
        addTask[i].style.display="block";
    });
    btnEdit[i].addEventListener("click", function(){
        btn[i].style.display="block";
        addTask[i].style.display="none";
        if(i==0){
            let dealNew=document.createElement("div");
            dealNew.classList.add("deal");
            let p=document.createElement("p");
            let span=document.createElement("span");
            let output=document.createElement("output");
            p.innerHTML=inputText[0].value;
            span.innerHTML=description[0].value;
            blockTasks[i].append(dealNew);
            dealNew.setAttribute("draggable","true");
            p.prepend(output);
            dealNew.append(p);
            dealNew.append(span);
            dealNew.addEventListener("dragstart",function(e){
                current=this;
                currentParent=this.parentElement;
            });
        }
        if(i==1){
            try{
                let num=inputNum[0].value;
                let deal=blockTasks[i].children[num-1];
                let outputCreate=document.createElement("output");
                let p=deal.firstElementChild;
                p.textContent=inputText[1].value;
                p.prepend(outputCreate);
                deal.lastElementChild.textContent=description[1].value;
            }
            catch{
                alert("Был произведён некорректный ввод!");
            }
        }
        if(i==2){
            try{
                let num=inputNum[1].value;
                let deal=blockTasks[i].children[num-1];
                deal.remove();
            }
            catch{
                alert("Был произведён некорректный ввод!");
            }
        }
        numer(blockTasks[i]);
    });
}
function addListener(){
    for(let i=0;i<arguments.length;i++){
        arguments[i].addEventListener("dragover",function(e){
            e.preventDefault();
            this.classList.add("dragover");
        });
    }
}
addListener(contNew,contProg,contFin);
function removeListener(){
    for(let i=0;i<arguments.length;i++){
        arguments[i].addEventListener("dragleave",function(e){
            this.classList.remove("dragover");
        });
    }
}
removeListener(contNew,contProg,contFin);
function drop(){
    for(let i=0;i<arguments.length;i++){
        arguments[i].addEventListener("drop",function(e){
            this.classList.remove("dragover");
            blockTasks[i].append(current);
            if(i==2) {
                current.setAttribute("draggable","false");
                current.style.cursor="default";
            }
            numer(currentParent);
            numer(blockTasks[i]);
        });
    }
}
drop(contNew,contProg,contFin);
function numer(arg){
    let deals=arg.children;
    for(let j=0;j<deals.length;j++){
        let output=deals[j].firstElementChild.firstElementChild;
        output.value=j+1+". ";
    }
}