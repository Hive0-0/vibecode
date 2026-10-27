gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cover",
    start: "top top",
    end: "bottom 40%",
    scrub: 1
  }
});

// 1. Билет рвётся: половинки расходятся в стороны
tl.to(".ticket-left", { x: "-25vw", y: "3vw", rotation: -6, duration: 1 }, 0);
tl.to(".ticket-right", { x: "25vw", y: "-2vw", rotation: 4, duration: 1 }, 0);

// 2. Потом всё плавно исчезает
tl.to(".ticket-left, .ticket-right", { opacity: 0, duration: 0.7 }, 0.8);
tl.to(".cover-title, .star", { opacity: 0, duration: 0.7 }, 0.6);
const intro = gsap.timeline({
  scrollTrigger: {
    trigger: ".screen2",
    start: "top 95%",
    end: "top -10%",
    scrub: 2
  }
});

intro.from(".screen2-title", { opacity: 0, y: 120, duration: 2, ease: "power2.out" }, 0);
intro.from(".screen2-text p", { opacity: 0, y: 80, stagger: 1, duration: 2, ease: "power2.out" }, 1.5);
const curtainTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stage-section",
    start: "center center",
    end: "+=250%",
    pin: true,
    scrub: 0.5
  }
});

curtainTl.to(".curtain-left", { scaleX: 0.1, ease: "none", duration: 1 }, 0);
curtainTl.to(".curtain-right", { scaleX: 0.1, ease: "none", duration: 1, onComplete: startLoop }, 0);
curtainTl.to({}, { duration: 1.5 });
const pins = [1, 2, 3, 4, 5, 6, 7, 8].map(n => "images/pin-" + n + ".png");
pins.forEach(src => { new Image().src = src; });

const slots = document.querySelectorAll(".slot");
const slotState = [];
let loopTimer = null;
let started = false;

slots.forEach((slot, i) => {
  slotState.push({ index: i * 3, picked: false });
  const img = slot.querySelector(".item");
  img.src = pins[slotState[i].index];

  slot.addEventListener("click", () => {
    if (!started || slotState[i].picked) return;
    slotState[i].picked = true;
    slot.classList.add("picked");
    if (slotState.every(s => s.picked)) finish();
  });
});

function nextItem(i) {
  slotState[i].index = (slotState[i].index + 1) % pins.length;
  slots[i].querySelector(".item").src = pins[slotState[i].index];
}

function startLoop() {
  if (started) return;
  started = true;
  document.querySelector(".stage-items").classList.add("visible");
  loopTimer = setInterval(() => {
    slots.forEach((slot, i) => {
      if (!slotState[i].picked) nextItem(i);
    });
  }, 2500);
}

function finish() {
  clearInterval(loopTimer);
  document.querySelector(".result-text").classList.add("show");
}
const intro3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".screen3",
    start: "top 95%",
    end: "top 10%",
    scrub: 2
  }
});

intro3.from(".screen3-title", { opacity: 0, y: 120, duration: 2, ease: "power2.out" }, 0);
intro3.from(".screen3-text p", { opacity: 0, y: 80, duration: 2, ease: "power2.out" }, 1);
gsap.utils.toArray(".mask-block").forEach(block => {
  const tlMask = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: "top 90%",
      end: "bottom 30%",
      scrub: 2
    }
  });

  tlMask.from(block.querySelector(".mask-img"), { opacity: 0, scale: 0.55, y: 80, duration: 2, ease: "power2.out" }, 0);
  tlMask.from(block.querySelectorAll(".fact p"), { opacity: 0, y: 40, stagger: 0.6, duration: 1.5, ease: "power2.out" }, 1.5);
});
const intro4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".screen4",
    start: "top 95%",
    end: "top 10%",
    scrub: 2
  }
});

intro4.from(".screen4-title", { opacity: 0, y: 120, duration: 2, ease: "power2.out" }, 0);
intro4.from(".screen4-text p", { opacity: 0, y: 80, stagger: 0.8, duration: 2, ease: "power2.out" }, 1);
const panaTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pana-section",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1.5
  }
});

panaTl.from(".pana", { opacity: 0, duration: 1, stagger: 0.3 }, 0);
panaTl.from(".pana-1", { y: "6vw", rotation: -8, duration: 3 }, 0);
panaTl.from(".pana-2", { y: "-5vw", rotation: 6, duration: 3 }, 0);
panaTl.from(".pana-3", { y: "-8vw", rotation: -4, duration: 3 }, 0);
panaTl.from(".pana-4", { y: "5vw", rotation: 7, duration: 3 }, 0);
panaTl.from(".pana-5", { y: "-3vw", rotation: -6, duration: 3 }, 0);

panaTl.from(".screen4-fact p", { opacity: 0, y: 40, duration: 1.5, ease: "power2.out" }, 3.5);
panaTl.to({}, { duration: 1.5 });
const intro5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".screen5",
    start: "top 95%",
    end: "top 10%",
    scrub: 2
  }
});

intro5.from(".screen5-title", { opacity: 0, y: 120, duration: 2, ease: "power2.out" }, 0);
intro5.from(".screen5-text p", { opacity: 0, y: 80, duration: 2, ease: "power2.out" }, 1);
window.addEventListener("load", () => {
  const outfits = gsap.utils.toArray(".outfit");

  gsap.set(outfits, { opacity: 0 });
  gsap.set(outfits[0], { opacity: 1 });

  const outfitTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".outfits",
      start: "top top",
      end: "+=700%",
      pin: true,
      scrub: 0.3,
      invalidateOnRefresh: true
    }
  });

  outfits.forEach((el, i) => {
    if (i > 0) {
      outfitTl.to(el, { opacity: 1, duration: 0.12, ease: "none" });
    }
    outfitTl.to(el, {
      y: () => Math.min(0, window.innerHeight - el.offsetHeight),
      duration: 2,
      ease: "none"
    });
    if (i < outfits.length - 1) {
      outfitTl.to(el, { opacity: 0, duration: 0.12, ease: "none" });
    }
  });

  const end5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".screen5-end",
      start: "top 85%",
      end: "top 20%",
      scrub: 2
    }
  });

  end5.from(".screen5-end-text p", { opacity: 0, y: 80, duration: 2, ease: "power2.out" }, 0);
    const finale = gsap.timeline({
    scrollTrigger: {
      trigger: ".finale",
      start: "top 85%",
      end: "top 10%",
      scrub: 2
    }
  });

  finale.from(".finale-title", { opacity: 0, y: 120, duration: 2, ease: "power2.out" }, 0);
  finale.from(".credit", { opacity: 0, y: 60, stagger: 0.4, duration: 1.5, ease: "power2.out" }, 1.5);
  finale.from(".nav", { opacity: 0, y: 60, duration: 1.5, ease: "power2.out" }, 2.5);
});