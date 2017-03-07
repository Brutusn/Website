const tabs = document.getElementById("tab-wrap").children;

function tabClick () {
    const article = this.getAttribute("data-article"),
        aClass = "tab-active";

    location.hash = article;

    removeClasses(aClass);
    this.classList.add(aClass);
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", tabClick);
}

// Simple function that removes classes based on the given class name.
function removeClasses (classname) {
    const elems = document.getElementsByClassName(classname);

    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(classname);
    }
}

// Function that runs to check the location hash and enables the according tab.
function hashParser () {
    const hash = location.hash.replace("#", ""),
        aClass = "article-active";

        console.info(hash);

    if (hash) {
        article = document.getElementById(hash);

        if (article) {
            removeClasses(aClass);
            article.classList.add(aClass);
        }
    }
}

// Execute as soon as the script is parsed, a hash could be available;
hashParser();
// Look for hash changes (tab click);
window.addEventListener("hashchange", hashParser);
