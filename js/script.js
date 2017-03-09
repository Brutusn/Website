const tabs = document.getElementById("tab-wrap").children,
    tabActive = "tab-active",
    articleActive = "article-active";

// What happens when you click a tab..
function tabClick () {
    const article = this.getAttribute("data-article");

    location.hash = article;

    removeClasses(tabActive);
    this.classList.add(tabActive);
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
    const hash = location.hash.replace("#", "");

    if (hash) {
        article = document.getElementById(hash);

        if (article) {
            removeClasses(articleActive);
            article.classList.add(articleActive);

            // And tab..
            removeClasses(tabActive);
            tabs[0].parentNode.querySelector(`[data-article="${hash}"]`).classList.add(tabActive);
        }
    }
}

// Function to calculate age from a data, plus action to take if date is current
// Date in format DD-MM-YYYY (AND NO OTHER FFS!)
function getAge (date, onDate) {
    // Manual parse to avoid inconsistancies with Date.parse implementation.
    const unparsedArr = date.split("-"),
        history = new Date(+unparsedArr[2], (+unparsedArr[1] - 1), (+unparsedArr[0] + 1)),
        today = new Date(),
        tY = today.getUTCFullYear(),
        hY = history.getUTCFullYear(),
        tM = today.getUTCMonth(),
        hM = history.getUTCMonth(),
        tD = today.getUTCDate(),
        hD = history.getUTCDate();

    let age = tY - hY,
        month = tM - hM;

    if (month < 0 || (month === 0 && (tD < hD))) {
        age--;
    }

    if (onDate) {
        if (tM === hM && tD === hD) {
            onDate(age);
        }
    }
    return age;
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", tabClick);
}
// Execute as soon as the script is parsed, a hash could be available;
hashParser();
// Look for hash changes (tab click);
window.addEventListener("hashchange", hashParser);

// Sets age specific to my birthday (31-03-1987);
(function setAge() {
    const elems = document.getElementsByClassName("set-age"),
        currentAge = getAge("31-03-1987", (age) => {
            document.getElementById("header-title").textContent = `FEEST! Ik ben vandaag ${age} geworden!`;
        });

    for (let i = 0; i < elems.length; i++) {
        elems[i].textContent = currentAge;
    }
})();
