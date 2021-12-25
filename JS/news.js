// check internet connectivity
function checkInternet(){
    let online = navigator.onLine;
    if(!online){
        document.getElementById("genre-container").style.display = "none";
        document.getElementById("live-news").style.display = "none";
    }
    
    else
        document.getElementById("no-internet-conn").style.display = "none";
}

async function getNews(lang='en',nation='In'){
    checkInternet();

    const response = await fetch(`https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=${lang}&country=${nation}&media=True`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
            "x-rapidapi-key": "71479d4288msh5a7421b1b5a6678p148662jsn0975ec3fe4de"
        }
    });
    
    let result = await response.json();

    return result;
}

// function to remove all the dynamically created cards
function removeCard(){
    var card = document.getElementsByClassName('card');
    while(card.length > 0){
        card[0].parentNode.removeChild(card[0]);
    }
}

// creating dynamic news cards
function createCard(newsTitle, img_url, Date, id){
    let card = document.createElement('div');
    let cardImg = document.createElement('div');
    let cardTitle = document.createElement('div');
    let publishDate = document.createElement('div');

    let card_class = document.createAttribute('class');
    let card_id = document.createAttribute('id');
    let cardImg_class = document.createAttribute('class');
    let cardTitle_class = document.createAttribute('class');
    let publishDate_class = document.createAttribute('class');

    card_class.value = "card";
    card_id.value = id;
    cardImg_class.value = "card-img";
    cardTitle_class.value = "card-title";
    publishDate_class.value = "publish-date";

    card.setAttributeNode(card_class);
    card.setAttributeNode(card_id);
    cardImg.setAttributeNode(cardImg_class);
    cardTitle.setAttributeNode(cardTitle_class);
    publishDate.setAttributeNode(publishDate_class);

    let img = document.createElement('img');
    img.src = `${img_url}`;

    let h3 = document.createElement('h3');
    h3.innerText = newsTitle;

    let p = document.createElement('p');
    p.innerText = `Publish On : ${Date}`;

    let news = document.getElementsByClassName('news')[0];
    news.appendChild(card);
    card.appendChild(cardImg);
    cardImg.appendChild(img);
    card.appendChild(cardTitle);
    cardTitle.appendChild(h3);
    card.appendChild(publishDate);
    publishDate.appendChild(p);
}

function setSummary(title, summary){

    let newsTitle = document.getElementsByClassName('news-title')[0];
    let newsSummary = document.getElementsByClassName('news-summary')[0];

    newsTitle.innerHTML = `<h1> ${title} </h1>`;
    newsSummary.innerHTML = `<p> ${summary} </p>`;
}

// driving program
function main(result){
    removeCard();
    Promise.resolve(result).then(function(value) {
        for(i=0; i<value.articles.length; i++){
            let img = value['articles'][i]['media'];
            let newsTitle = value['articles'][i]['title'];
            let date = value['articles'][i]['published_date'];
            let id = `${i}`;
            createCard(newsTitle, img, date, id);
        }
    
        var card = document.getElementsByClassName('card');
        for(var i=0; i<card.length; i++){
            card[i].addEventListener('click', function(){
                let popup = document.getElementsByClassName('popup')[0];
                popup.style.display = "block";
                let newsTitle = value['articles'][this.id]['title'];
                let summary = value['articles'][this.id]['summary'];
                setSummary(newsTitle,summary);
            });
        }
    
    }, function(value) {
            console.log(value); 
        });
}

function liveNews(){
    var embed_link = {
        'News 24' : `<iframe width="650" height="450" src="https://www.youtube.com/embed/wPqgL3MvMMA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        'IndiaTV': `<iframe width="650" height="450" src="https://www.youtube.com/embed/Xmm3Kr5P1Uw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        'NDTV' : `<iframe width="650" height="450" src="https://www.youtube.com/embed/WB-y7_ymPJ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` ,
        'WION' : `<iframe width="650" height="450" src="https://www.youtube.com/embed/1gVvSfBxdEQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }

    var channel = document.getElementsByClassName('live-news');
    for(i=0; i<channel.length; i++){
        channel[i].addEventListener('click',function(){
            var channel_name = this.innerText;
            document.getElementsByClassName('popup')[0].style.display = "block";
            setSummary(channel_name, embed_link[channel_name]);
        });
    }
}

liveNews();

var result = getNews();
main(result);

// for pop up news summary
let close_btn = document.getElementsByClassName('icon-close')[0];
let popup = document.getElementsByClassName('popup')[0];
close_btn.addEventListener('click',()=>{
    popup.style.display="none";
});


// news using the genre
var genre = document.getElementsByClassName('genre');
var genreLang = document.getElementsByClassName('genre-lang');
var genreCountry = document.getElementsByClassName('genre-country');

// for language
for(i=0; i<genreLang.length; i++){
    genreLang[i].addEventListener('click', function(){
        var lang = this.id;

        // remove all existing active class
        for(j=0; j<genre.length; j++){
            if(genre[j].classList.contains("active"))
                genre[j].classList.remove("active");
        }

        // make this class as 'active'
        this.classList.add("active");

        // get the news
        var res = getNews(lang);
        main(res);
    });
}

// for country
for(i=0; i<genreCountry.length; i++){
    genreCountry[i].addEventListener('click', function(){
        var country = this.id;

        // remove all existing active class
        for(j=0; j<genre.length; j++){
            if(genre[j].classList.contains("active"))
                genre[j].classList.remove("active");
        }

        // make this class as 'active'
        this.classList.add("active");

        // get the news
        var res = getNews('en',country);
        main(res);
    });
}

// scroll-up feature
var scroll = document.getElementById("scroll-up");

window.onscroll = function(){
    if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
        scroll.style.display = "block";
    else
        scroll.style.display = "none";
}

scroll.addEventListener('click',function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
})

//loading animation
var news = document.getElementById("latest-news");
news.onload = function(){
    news.style.background = "none";
};