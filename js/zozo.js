'use strict';

// back-to-top
$(document).ready((function (_this) {
  return function () {
    let bt
    bt = $('#back_to_top')
    if ($(document).width() > 480) {
      $(window).scroll(function () {
        let st
        st = $(window).scrollTop()
        if (st > 30) {
          return bt.css('display', 'block')
        } else {
          return bt.css('display', 'none')
        }
      })
      return bt.click(function () {
        $('body,html').animate({
          scrollTop: 0,
        }, 800)
        return false
      })
    }
  }
})(this))

// nav-toggle
$(document).ready((function (_this) {
  return function () {
    let nav,icon
    icon = $('#menu_icon')
    nav = $('#site_nav')
    icon.click(function () {
      nav.slideToggle(250)
    })
  }
})(this))

// FancyBox
$('[data-fancybox="gallery"]').fancybox({
  arrows: false,
  infobar: false,
  buttons: [],
  clickContent: "close",
  autoFocus: false,
  backFocus: false,
  wheel: false,
  mobile: {
    clickContent: "close",
    clickSlide: "close",
    dblclickContent: false,
    dblclickSlide: false
  },
});

// Lazy load images in post content
document.querySelectorAll('.post_content.markdown img:not([loading])').forEach(function(img) {
  img.setAttribute('loading', 'lazy');
});

// Auto-detect FAQ sections and inject FAQPage schema
(function() {
  var faqs = [];
  var headings = document.querySelectorAll('.post_content.markdown strong');
  headings.forEach(function(el) {
    var text = el.textContent.trim();
    if (text.match(/^Q[：:]/)) {
      var question = text.replace(/^Q[：:]\s*/, '');
      var answer = '';
      var sibling = el.parentElement;
      while (sibling && sibling.nextSibling) {
        sibling = sibling.nextSibling;
        if (sibling.nodeType === 3) continue;
        if (sibling.querySelector && sibling.querySelector('strong') && sibling.querySelector('strong').textContent.match(/^Q[：:]/)) break;
        if (sibling.textContent) answer += sibling.textContent.trim() + ' ';
        if (sibling.tagName === 'H2' || sibling.tagName === 'H3') break;
      }
      answer = answer.trim();
      if (question && answer) {
        faqs.push({question: question, answer: answer});
      }
    }
  });
  if (faqs.length >= 2) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(function(f) {
        return {
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        };
      })
    };
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
})();
