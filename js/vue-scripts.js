/**
 Scripts page to practice with Vue.js
*/

const links = new Vue({
  el: "#links",
  data: {
    links: [
      {
        href: "https://github.com/Brutusn",
        text: "GitHub",
        icon: "fa-github"
      }, {
        href: "https://www.youtube.com/user/SahiSionie",
        text: "YouTube",
        icon: "fa-youtube-play"
      }, {
        href: "https://www.facebook.com/proef.abonnement",
        text: "Facebook",
        icon: "fa-facebook-official"
      }, {
        href: "https://twitter.com/iAteTweetTweet",
        text: "Twitter",
        icon: "fa-twitter"
      }, {
        href: "https://www.instagram.com/proef_a/",
        text: "Instagram",
        icon: "fa-instagram"
      }, {
        href: "https://www.linkedin.com/in/bart-niessen-130b6073/",
        text: "LinkedIn",
        icon: "fa-linkedin-square"
      }
    ]
  }
});

const llEvents = new Vue({
    el: "#ll-events",
    data: {
        clName: "test",
        timer: null
    },
    methods: {
        highlight (cl, click) {
            this.changeHighlight(`highlight-${cl}`);

            if (click) {
                this.removeHighlight(true, 2500);
            }
        },
        changeHighlight (cl) {
            this.clName = cl;
        },
        removeHighlight (timed, delay) {
            if (timed) {
                window.clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.changeHighlight("");
                }, delay);
            } else {
                this.changeHighlight("");
            }
        }

    }
});
