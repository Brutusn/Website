const tabs = document.getElementById("tab-wrap").children;

function tabClick (evt) {
    const article = document.getElementById(this.getAttribute("data-article"));

    article.style.color = "red";
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", tabClick);
}
