"use strict";

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

    if (typeof onDate === "function" && tM === hM && tD === hD) {
        onDate(age);
    }

    return age;
}

// initialization functionality, happens once.
(function initialization () {
    // Sets age specific to my birthday (31-03-1987);
    const currentAge = getAge("31-03-1987", (age) => {
            document.getElementById("header-title").textContent = `FEEST! Ik ben vandaag ${age} geworden!`;
        });

    // Sets age specific to my birthday (31-03-1987);
    const elements = document.getElementsByClassName("set-age");
    for (const el of elements) {
        el.textContent = currentAge;
    }
})();
