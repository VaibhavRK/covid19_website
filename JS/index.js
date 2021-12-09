var curtain = document.getElementsByClassName('curtain')[0];
var icons = document.getElementsByClassName('icons');
var home = document.getElementsByClassName('home')[0];
home.addEventListener("mouseover",disableCurtain);

for(i=0; i<icons.length; i++){
    icons[i].addEventListener("mouseover",enableCurtain);
}

function enableCurtain(){
    curtain.style.width = "20%";
}

function disableCurtain(){
    curtain.style.width = "0";
}