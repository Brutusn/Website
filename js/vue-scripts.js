/**
 Scripts page to practice with Vue.js
*/

const links = new Vue({
  el: "#links",
  data: {
    links: [
      {
        href: "https://github.com/Brutusn",
        text: "GitHub"
      }, {
        href: "https://www.youtube.com/user/SahiSionie",
        text: "YouTube"
      }, {
        href: "https://www.facebook.com/proef.abonnement",
        text: "Facebook"
      }, {
        href: "https://twitter.com/iAteTweetTweet",
        text: "Twitter"
      }, {
        href: "https://www.instagram.com/proef_a/",
        text: "Instagram"
      }, {
        href: "https://www.linkedin.com/in/bart-niessen-130b6073/",
        text: "LinkedIn"
      }
    ]
  }
});
