const trail = document.getElementById('c-trail'), dot = document.getElementById('c-dot');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

(function loop() {
    tx += (mx - tx) * .09;
    ty += (my - ty) * .09;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(loop);
})();

document.querySelectorAll('a,button,.pzone,.pcard').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

function toggleNav() {
    document.getElementById('ham').classList.toggle('open');
    document.getElementById('mob').classList.toggle('open');
}

function closeNav() {
    document.getElementById('ham').classList.remove('open');
    document.getElementById('mob').classList.remove('open');
}

document.getElementById('ph-file').addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
        const img = document.getElementById('ph-img');
        img.src = ev.target.result;
        img.classList.add('on');
        document.getElementById('ph-ph').style.display = 'none';
    };
    r.readAsDataURL(f);
});

const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('on');
            ro.unobserve(e.target);
        }
    });
}, { threshold: 0.07 });

document.querySelectorAll('.rev').forEach(el => ro.observe(el));

const secs = document.querySelectorAll('section'),
    links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => {
        if (window.scrollY >= s.offsetTop - 90) cur = s.id;
    });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

function sendForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.fsend');
    const ok = document.getElementById('fok');
    const formData = new FormData(e.target);

    btn.style.opacity = '.45';
    btn.disabled = true;
    btn.innerText = "Sending...";

    fetch('https://formspree.io/f/xvzwonwy', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(res => {
        btn.style.opacity = '';
        btn.disabled = false;
        btn.innerHTML = 'Send Message &nbsp;&#x2192;';
        if (res.ok) {
            e.target.reset();
            ok.classList.add('show');
            setTimeout(() => ok.classList.remove('show'), 5000);
        } else {
            e.target.action = 'https://formspree.io/f/xvzwonwy';
            e.target.method = 'POST';
            e.target.submit();
        }
    }).catch(() => {
        e.target.action = 'https://formspree.io/f/xvzwonwy';
        e.target.method = 'POST';
        e.target.submit();
    });
}

// Global functions for inline onsubmit/onclick
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.sendForm = sendForm;
