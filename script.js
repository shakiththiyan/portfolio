// ================= THEME TOGGLE (Dark & Light with DarkVeil) =================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    // icon maari kaatu
    toggleBtn.textContent = isLight ? "☀️" : "🌙";

    // DarkVeil background irundhaa theme update pannunga
    if (window.setDarkVeilTheme) {
      window.setDarkVeilTheme(isLight ? "light" : "dark");
    }
  });
}

// ================= SKILLS CIRCLE (unchanged) ====================
let cfIndex = 2;
$(document).ready(function(){
    var radius = 200;
    var fields = $('.cf-itemDot');
    var container = $('.cf-dotCircle');
    var width = container.width();
    radius = width/2.5;
    var height = container.height();
    var angle = 0, step = (2*Math.PI)/fields.length;

    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        $(this).css({ left: x+'px', top: y+'px' });
        angle += step;
    });

    $('.cf-itemDot').click(function(){
        var dataTab= $(this).data("tab");
        $('.cf-itemDot').removeClass('active');
        $(this).addClass('active');
        $('.cf-CirItem').removeClass('active');
        $('.cf-CirItem'+dataTab).addClass('active');
        cfIndex=dataTab;

        $('.cf-dotCircle').css({"transform":"rotate("+(360-(cfIndex-1)*36)+"deg)","transition":"2s"});
        $('.cf-itemDot').css({"transform":"rotate("+((cfIndex-1)*36)+"deg)","transition":"1s"});
    });

    setInterval(function(){
        if(cfIndex>6) cfIndex=1;
        $('.cf-itemDot').removeClass('active');
        $('[data-tab="'+cfIndex+'"]').addClass('active');
        $('.cf-CirItem').removeClass('active');
        $('.cf-CirItem'+cfIndex).addClass('active');

        $('.cf-dotCircle').css({"transform":"rotate("+(360-(cfIndex-1)*36)+"deg)","transition":"2s"});
        $('.cf-itemDot').css({"transform":"rotate("+((cfIndex-1)*36)+"deg)","transition":"1s"});

        cfIndex++;
    }, 5000);
});


// ================= SMOOTH SCROLL WITH NAVBAR OFFSET =================
const navbar = document.querySelector(".navbar");
const NAV_OFFSET = navbar ? navbar.offsetHeight + 10 : 80; 
// navbar height + small gap

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const scrollToY = elementTop - NAV_OFFSET;

    window.scrollTo({
      top: scrollToY,
      behavior: "smooth"
    });
  });
});

// Smooth Scroll for Contact Me buttons (with offset)
document.querySelectorAll(".contact-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const targetEl = document.querySelector("#contact");
    if (!targetEl) return;

    const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const scrollToY = elementTop - NAV_OFFSET;

    window.scrollTo({
      top: scrollToY,
      behavior: "smooth"
    });
  });
});


// ================= SCROLL REVEAL (mouse & scrollbar) =================
(function () {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Old browser → just show everything
    reveals.forEach(el => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach((el) => observer.observe(el));
})();


// ========== SCROLL PROGRESS BAR ==========
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// ========== HERO TYPING EFFECT ==========
const words = ["Full-Stack  Developer", "Graphic Designer", "IT Professional"];
const typedSpan = document.getElementById("typedText");

if (typedSpan) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1200); // full word stop
        return;
      }
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(typeLoop, speed);
  }

  typeLoop();
}
// ========== REFRESH PANNUMBOTHU SMOOTH-AA TOP-KU POGANUM ==========
window.addEventListener("load", () => {
  const homeSection = document.getElementById("home");
  if (!homeSection) return;

  // Scroll position 0 illainna (footer / middle la irundhaa)
  if (window.scrollY > 0) {
    // Little delay so browser scroll restore aachi nu apram smooth scroll
    setTimeout(() => {
      homeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 200);
  }
});
