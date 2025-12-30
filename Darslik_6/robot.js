let isRobotReady = false;
let lastDetectedTopic = null;
let lastDetectedEnd = null;
let autoCloseTimer = null;
let lastPageNum = 0;

/* ===============================
   1. DRAG & DROP (desktop + mobile)
================================ */
const robotMascot = document.getElementById('robotMascot');
const robotDraggable = document.getElementById('robotDraggable');

let isDragging = false;
let startX = 0, startY = 0, currentX = 0, currentY = 0;

function dragStart(e) {
    isDragging = true;
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX - currentX;
    startY = p.clientY - currentY;
    robotDraggable.style.cursor = 'grabbing';
}

function dragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    currentX = p.clientX - startX;
    currentY = p.clientY - startY;
    robotMascot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
}

function dragEnd() {
    isDragging = false;
    robotDraggable.style.cursor = 'grab';
}

robotDraggable.addEventListener('mousedown', dragStart);
robotDraggable.addEventListener('touchstart', dragStart, { passive: false });
document.addEventListener('mousemove', dragMove);
document.addEventListener('touchmove', dragMove, { passive: false });
document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);

/* ===============================
   2. ROBOT START
================================ */
function startLesson() {
    isRobotReady = true;
    const leftArm = document.getElementById('leftArm');
    const welcomeZone = document.getElementById('welcomeZone');
    const mainText = document.getElementById('mainText');

    leftArm.classList.add('is-raised');

    setTimeout(() => {
        welcomeZone.style.display = "none";
        mainText.style.display = "block";
        mainText.innerHTML = "<b>Ajoyib!</b> Keling, birga o‘rganamiz 🚀";
        leftArm.classList.remove('is-raised');
        autoCloseTimer = setTimeout(closeRobotMsg, 5000);
    }, 1200);
}

/* ===============================
   3. SCROLL + PAGE DETECT
================================ */
const pdfWrapper = document.getElementById('pdfWrapper');

pdfWrapper.addEventListener('scroll', () => {
    if (!isRobotReady) return;

    const pages = document.querySelectorAll('.pdf-page');
    if (!pages.length) return;

    const wrapperRect = pdfWrapper.getBoundingClientRect();
    const centerY = wrapperRect.top + wrapperRect.height / 2;

    let currentPage = lastPageNum;

    pages.forEach(page => {
        const rect = page.getBoundingClientRect();
        if (rect.top < centerY && rect.bottom > centerY) {
            currentPage = parseInt(page.dataset.page);
        }
    });

    if (currentPage === lastPageNum) return;
    lastPageNum = currentPage;
    closeRobotMsg();

    if (typeof mavzular === 'undefined') return;

    const topic = mavzular.find(m => m.bet === currentPage);
    const endTopic = mavzular.find(m => m.tugashBet === currentPage);

    if (topic && lastDetectedTopic !== topic.id) {
        lastDetectedTopic = topic.id;
        congratulateTopic(topic.nomi);
    }

    if (endTopic && lastDetectedEnd !== currentPage) {
        lastDetectedEnd = currentPage;
        offerTest(endTopic);
    }
});

/* ===============================
   4. ROBOT MESSAGES
================================ */
function congratulateTopic(name) {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    const robotMsg = document.getElementById("robotMsg");
    const mainText = document.getElementById("mainText");

    robotMsg.style.display = "block";
    mainText.innerHTML = `
        <div style="color:#00f2ff;font-size:14px">Yangi mavzu</div>
        <b style="font-size:16px">${name}</b>
        <div style="margin-top:6px">Zo‘r! Davom eting 👏</div>
    `;

    autoCloseTimer = setTimeout(closeRobotMsg, 7000);
}

function offerTest(topic) {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    const robotMsg = document.getElementById("robotMsg");
    const mainText = document.getElementById("mainText");

    robotMsg.style.display = "block";
    mainText.innerHTML = `
        <div style="margin-bottom:8px">Mavzu tugadi 🏁</div>
        <button onclick="openTest(${topic.id})"
            style="background:#22c55e;color:white;border:none;
            padding:10px;border-radius:10px;width:100%;
            font-weight:bold;font-size:16px">
            Testni boshlash ✍️
        </button>
    `;
}

function closeRobotMsg(e) {
    if (e) e.stopPropagation();
    document.getElementById("robotMsg").style.display = "none";
}

/* ===============================
   5. TEST MODAL
================================ */
function openTest(id) {
    const topicSavollari = savollar[id] || savollar[1];
    const testBody = document.getElementById('testBody');
    document.getElementById('testModal').style.display = "flex";

    let html = `<h3 style="margin-bottom:15px">${topicSavollari[0].savol}</h3>`;
    topicSavollari[0].javoblar.forEach(j => {
        html += `<button class="test-opt"
            onclick="this.style.background='#22c55e';
            setTimeout(closeTest,1000)">${j}</button>`;
    });

    testBody.innerHTML = html;
}

function closeTest() {
    document.getElementById('testModal').style.display = "none";
}
