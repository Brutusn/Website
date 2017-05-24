/**
 * @file index.js
 * @description Script code for Bart's Website.
 * @author Bart Niessen <bart.niessen@gmail.com> {@link https://github.com/Brutusn https://github.com/Brutusn}.
 * @copyright Bart Niessen 2017
 * @license See LICENSE file included in this distribution.
 */

"use strict";

// Define control flags
let isScrolling = false;
let menuClick = false;

// Get references to DOM elements
const navEl = document.querySelector("nav");
const articleEl = document.getElementById("landing"); // The first? article...


/**
 * Simple function that removes classes based on the given class name.
 * @param className
 */
function removeClasses (className) {
    const elements = document.getElementsByClassName(className);

    for (const el of elements) {
        el.classList.remove(className);
    }
}

function hashNoTag (hash) {
    return hash.replace("#", "");
}

function scroller (y) {
    window.scrollTo(0, Math.floor(y));
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
    const nav = navEl.clientHeight;

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
            }
        }
    }

    // Start the animation.
    animation();
}

function onScroll () {
    const navBBox = navEl.getBoundingClientRect();
    const headerBBox = articleEl.getBoundingClientRect();

    // Sticky the navigation!
    if (navBBox.top <= 0 && headerBBox.top <= navBBox.height) {
        navEl.classList.add("nav-sticky-top");
        articleEl.style.marginTop = `${navBBox.height}px`;
    } else {
        //if (box2.top >= box.height) {
        navEl.classList.remove("nav-sticky-top");
        articleEl.style.marginTop = 0;
    }
    isScrolling = false;
}

function requestScroll () {
    if (isScrolling === false) {
        window.requestAnimationFrame(onScroll);
    }
    isScrolling = true;
}

/**
 * What happens when you click a tab..
 * @param {Event} evt
 */
function tabClick (evt) {
    const tabActive = "tab-active";

    location.hash = this.hash;

    // Stop default behaviour.
    evt.preventDefault();

    removeClasses(tabActive);
    this.classList.add(tabActive);

    scrollToElement(hashNoTag(this.hash));
}

/**
 * Function to calculate age from a data, plus action to take if date is current
 * @param {string} date - Date in format DD-MM-YYYY (AND NO OTHER FFS!)
 * @param {Function} onDate
 * @returns {number} - the age value
 */
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

    if (typeof onDate === "function" && tM === hM && tD === hD) {
        onDate(age);
    }

    return age;
}

// initialization functionality, happens once.
(function initialization () {

    const hash = location.hash;
    const tabActive = "tab-active";

    // Calculate age.
    const currentAge = getAge("31-03-1987", (age) => {
        document.getElementById("header-title").textContent = `FEEST! Ik ben vandaag ${age} geworden!`;
    });

    // Add click events to the tabs.
    const baseTabs = document.getElementById("tab-wrap").children;
    for (const baseTab of baseTabs) {
        baseTab.firstChild.addEventListener("click", tabClick);
    }

    // Sets age specific to my birthday (31-03-1987).
    const elements = document.getElementsByClassName("set-age");
    for (const el of elements) {
        el.textContent = currentAge;
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
