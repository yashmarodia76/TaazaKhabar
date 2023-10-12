const API_KEY = "410fb623cdb842b695a6cca4155c59f9";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-card');

    cardsContainer.innerHTML = '';

    //jisme image null aa rha h usmai ui kharab hone ke liye mai show hi nae kar rha
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardMerge = newsCardTemplate.content.cloneNode(true);
        //data fill kar dete hain before appending
        fillDataInCard(cardMerge,article);
        cardsContainer.appendChild(cardMerge);
    });
}

function fillDataInCard(cardMerge, article) {
    const newsImg = cardMerge.querySelector('#news-img');
    const newsTitle = cardMerge.querySelector('#news-title');
    const newsSource = cardMerge.querySelector('#news-source');
    const newsDesc = cardMerge.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //for date from tag format to human readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    //click karne pe wahi news pe le jayega blank help karta for opening it in new tab
    cardMerge.firstElementChild.addEventListener("click", () =>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query)
    return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
