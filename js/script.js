"use strict";

const navElem = document.querySelector("nav");
const firstArticle = document.getElementById("landing");

let isScrolling = false;
let menuClick = false;

// Simple function that removes classes based on the given class name.
function removeClasses (classname) {
    const elems = document.getElementsByClassName(classname);

    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(classname);
    }
}

function hashNoTag (hash) {
    return hash.replace("#", "");
}

function scroller (y) {
    window.scrollTo(0, Math.floor(y));
}

function bBox (elem) {
    return elem.getBoundingClientRect();
}

// t: current time, b: begin value, c: change in value thus end - begin, d: duration
function easeOutQuad (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
}

function scrollToElement (id) {
    const elementOffset = document.getElementById(id).offsetTop;
    const currentScroll = window.pageYOffset;
    const range = 1;
    const scrollTime = 50;
    const scrollTo = {
        start: 0,
        top: 0,
        positive: true
    };
    const nav = navElem.clientHeight;

    console.info(id, elementOffset);

    let pos;
    let i = 0;

    function inRange (x, y) {
        const rangeSmall = y.top - range;
        const rangeLarge = y.offset + range;

        console.info(y, x);

        // Scroll is positive
        if (y.positive === true) {
            // Normal positive version
            return x >= rangeSmall && x <= rangeLarge;
        }
        // Negative version
        x *= -1;
        return x >= rangeLarge && x <= rangeSmall;
    }

    function animateScroll () {
        scroller(pos);
        animation();
    }

    if (currentScroll < elementOffset) {
        scrollTo.start = (elementOffset - nav) - currentScroll;
        scrollTo.top = elementOffset - nav;
        scrollTo.positive = true;
    } else {
        scrollTo.start = (currentScroll - (elementOffset - nav)) * -1;
        scrollTo.top = (elementOffset - nav) * -1;
        scrollTo.positive = false;
    }

    // Start the animation.
    function animation() {
        //setTimeout(function (){},fps);
        if (i < scrollTime) {
            pos = easeOutQuad(i, currentScroll, scrollTo.start, scrollTime);
            //console.info("position", pos);
            console.info("inrange", inRange(pos, scrollTo));
            if (inRange(pos, scrollTo) === false) {
                window.requestAnimationFrame(animateScroll);
                i++;
            } else {
                // If it's within range set is to stick to the place we want.
                scroller(scrollTo.top);
                menuClick = false;
                return;
            }
        }
    }
    animation();
}

function onScroll () {
    const nav = bBox(navElem);
    const header = bBox(firstArticle);

    // Sticky the navigation!
    if (nav.top <= 0 && header.top <= nav.height) {
        navElem.classList.add("nav-sticky-top");
        firstArticle.style.marginTop = `${nav.height}px`;
    } else {
        //if (box2.top >= box.height) {
        navElem.classList.remove("nav-sticky-top");
        firstArticle.style.marginTop = 0;
    }
    isScrolling = false;
}

function requestScroll () {
    if (isScrolling === false) {
        window.requestAnimationFrame(onScroll);
    }
    isScrolling = true;
}

// What happens when you click a tab..
function tabClick (evt) {
    const tabActive = "tab-active";

    location.hash = this.hash;

    // Stop default behaviour.
    evt.preventDefault();

    removeClasses(tabActive);
    this.classList.add(tabActive);

    scrollToElement(hashNoTag(this.hash));
}

// Function to calculate age from a data, plus action to take if date is current
// Date in format DD-MM-YYYY (AND NO OTHER FFS!)
function getAge (date, onDate) {
    // Manual parse to avoid inconsistancies with Date.parse implementation.
    const unparsedArr = date.split("-");
    const history = new Date(+unparsedArr[2], (+unparsedArr[1] - 1), (+unparsedArr[0] + 1));
    const today = new Date();
    const tY = today.getUTCFullYear();
    const hY = history.getUTCFullYear();
    const tM = today.getUTCMonth();
    const hM = history.getUTCMonth();
    const tD = today.getUTCDate();
    const hD = history.getUTCDate();

    let age = tY - hY;
    let month = tM - hM;

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

// initialization functionality, happens once.
(function initialization () {
    const baseTabs = document.getElementById("tab-wrap").children;
    const elems = document.getElementsByClassName("set-age");
    const currentAge = getAge("31-03-1987", (age) => {
            // Sets age specific to my birthday (31-03-1987);
            document.getElementById("header-title").textContent = `FEEST! Ik ben vandaag ${age} geworden!`;
        });
    const hash = location.hash;
    const tabActive = "tab-active";

    // Add click events to the tabs.
    for (let i = 0; i < baseTabs.length; i++) {
        baseTabs[i].firstChild.addEventListener("click", tabClick);
    }

    // Sets age specific to my birthday (31-03-1987);
    for (let i = 0; i < elems.length; i++) {
        elems[i].textContent = currentAge;
    }

    // Function that runs to check the location hash and enables the according tab.
    if (hash) {
        const tabs = document.getElementById("tab-wrap");
        const findTab = tabs.querySelector(`[href="${hash}"]`);

        removeClasses(tabActive);

        if (findTab !== null) {
            findTab.classList.add(tabActive);
            scrollToElement(hashNoTag(hash));
        }
    }
})();

window.addEventListener("scroll", requestScroll);
