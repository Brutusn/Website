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
