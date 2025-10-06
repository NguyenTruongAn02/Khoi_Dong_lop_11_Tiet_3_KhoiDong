// ======= MENU =======
function showGame(id) {
    document.querySelectorAll(".game").forEach((g) => (g.style.display = "none"));
    document.getElementById(id).style.display = "block";
}
showGame("game1");

// ======= GAME 1: Ô chữ =======
const questions = [
    { id: 1, text: "Một trong những đặc điểm của HĐH Linux có thể chạy đồng thời nhiều chương trình gọi là gì?", answer: "đa nhiệm", key: "M" },
    { id: 2, text: "HĐH nào do Google phát triển được sử dụng phổ biến trên điện thoại di động là?", answer: "android", key: "A" },
    { id: 3, text: "Hệ điều hành có nguồn gốc từ Unix?", answer: "linux", key: "N" },
    { id: 4, text: "Ở phiên bản 1 của Windows phát hành năm 1985 có điểm gì?", answer: "giao diện đồ họa", key: "G" },
    { id: 5, text: "Hệ điều hành Windows 95 lần đầu tiên giới thiệu cơ chế gì?", answer: "plug & play", key: "U" },
    { id: 6, text: "Hệ điều hành do Apple phát triển được sử dụng phổ biến trên di động là?", answer: "ios", key: "O" },
    { id: 7, text: "Môi trường để phần mềm ứng dụng khai thác hiệu quả phần cứng gọi là?", answer: "hệ điều hành", key: "N" },
];

let progress = Array(questions.length).fill(false);

const keywordBoard = document.getElementById("keywordBoard");
const questionContainer = document.getElementById("questions");
const message = document.getElementById("message");

function renderBoard() {
    if (!keywordBoard) return;
    keywordBoard.innerHTML = "";
    questions.forEach((q, i) => {
        const box = document.createElement("div");
        box.className = "box";
        box.textContent = progress[i] ? q.key : "_";
        keywordBoard.appendChild(box);
    });
}

function renderQuestions() {
    if (!questionContainer) return;
    questionContainer.innerHTML = "";
    questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
      <div class="question"><b>Câu ${q.id}:</b> ${q.text}</div>
      <input type="text" id="answer${i}" placeholder="Nhập câu trả lời...">
      <button class="answer-btn" onclick="checkAnswer(${i})">Trả lời</button>
      <span id="result${i}"></span>
    `;
        questionContainer.appendChild(div);
    });
}

function checkAnswer(index) {
    const input = document.getElementById("answer" + index);
    const result = document.getElementById("result" + index);
    let userAns = input.value.trim().toLowerCase();

    if (userAns === questions[index].answer.toLowerCase()) {
        progress[index] = true;
        result.textContent = `✔ Đúng! Ký tự: ${questions[index].key}`;
        result.className = "correct";
        renderBoard();
        if (progress.every((p) => p)) {
            message.innerHTML = `<h3 class="correct">🎉 Chúc mừng! Từ khóa là: MÃ NGUỒN 🎉</h3>`;
        }
    } else {
        result.textContent = "✘ Sai rồi!";
        result.className = "wrong";
    }
}

function checkKeyword() {
    const input = document.getElementById("keywordInput").value.trim().toLowerCase();
    const result = document.getElementById("keywordResult");
    if (input === "mã nguồn" || input === "ma nguon") {
        result.innerHTML = `<p class="correct">🎉 Chính xác! Từ khóa là: MÃ NGUỒN 🎉</p>`;
        message.innerHTML = `<h3 class="correct">👏 Bạn đã đoán đúng từ khóa!</h3>`;
    } else {
        result.innerHTML = `<p class="wrong">❌ Sai, hãy thử lại!</p>`;
    }
}

renderBoard();
renderQuestions();

// ======= GAME 2: Mapping =======
const items = [
    "Microsoft Office", "Photoshop", "Unikey",
    "Acrobat Reader", "Acrobat Pro DC",
    "LibreOffice", "Inkscape", "GIMP", "Linux Ubuntu", "Python"
];

const itemIcons = {
    "Microsoft Office": "https://img.icons8.com/color/48/microsoft-office-2019.png",
    "Photoshop": "https://img.icons8.com/color/48/adobe-photoshop.png",
    "Unikey": "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_11_23_638363296269865052_unikey-bi-loi-thumb.jpg",
    "Acrobat Reader": "https://img.icons8.com/color/48/adobe-acrobat.png",
    "Acrobat Pro DC": "https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/Adobe-Acrobat-Pro-DC-2021.jpg",
    "LibreOffice": "https://sadesign.vn/pictures/picfullsizes/2024/11/25/tai-libreoffice-phan-mem-thay-the-office-cho-macbook-1.jpg",
    "Inkscape": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg",
    "GIMP": "https://upload.wikimedia.org/wikipedia/commons/4/45/The_GIMP_icon_-_gnome.svg",
    "Linux Ubuntu": "https://img.icons8.com/color/48/ubuntu--v1.png",
    "Python": "https://img.icons8.com/color/48/python.png"
};

const correctGroups = {
    thuongmai: ["Microsoft Office", "Photoshop", "Acrobat Pro DC"],
    tudo: ["Unikey", "Acrobat Reader"],
    nguonmo: ["LibreOffice", "Inkscape", "GIMP", "Linux Ubuntu", "Python"]
};

const itemsContainer = document.getElementById("items");
if (itemsContainer) {
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.draggable = true;
        div.id = "item-" + item.replace(/\s+/g, '');
        div.dataset.name = item;
        div.ondragstart = drag;
        div.innerHTML = `
      <img src="${itemIcons[item]}" alt="${item}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
      ${item}
    `;
        itemsContainer.appendChild(div);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev, targetId) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const node = document.getElementById(data);
    ev.target.appendChild(node);
}

function checkMapping() {
    let score = 0;
    for (let group in correctGroups) {
        const children = Array.from(document.getElementById(group).children).map(c => c.dataset.name);
        const correct = correctGroups[group];
        let correctCount = children.filter(c => correct.includes(c)).length;
        score += correctCount;
    }
    document.getElementById("mapResult").innerHTML =
        `<p class="correct">Bạn ghép đúng ${score}/${items.length} phần mềm!</p>`;
}

// ======= GAME 3: Đua ngựa =======
let horses = [];
let raceInterval;
let finished = false;

function setupRace() {
    const num = parseInt(document.getElementById("numHorses").value);
    if (isNaN(num) || num < 2) {
        alert("Hãy nhập số học sinh (tối thiểu 2)!");
        return;
    }
    const track = document.getElementById("raceTrack");
    track.innerHTML = "";

    horses = [];
    finished = false;
    clearInterval(raceInterval);

    for (let i = 0; i < num; i++) {
        const lane = document.createElement("div");
        lane.className = "lane";

        const container = document.createElement("div");
        container.className = "horse-container";
        container.style.left = "0px";

        const horse = document.createElement("img");
        horse.src = "https://img.icons8.com/emoji/96/horse-emoji.png";
        horse.className = "horse";

        const number = document.createElement("span");
        number.className = "horse-number";
        number.textContent = i + 1;

        container.appendChild(horse);
        container.appendChild(number);
        lane.appendChild(container);
        track.appendChild(lane);

        horses.push(container);
    }

    const finish = document.createElement("div");
    finish.className = "finish-line";
    track.appendChild(finish);

    document.getElementById("raceResult").innerHTML = "";
}

function startRace() {
    if (horses.length === 0) {
        alert("Hãy tạo đường đua trước!");
        return;
    }
    finished = false;
    clearInterval(raceInterval);
    const trackWidth = document.getElementById("raceTrack").offsetWidth - 100;

    raceInterval = setInterval(() => {
        horses.forEach((container) => {
            let pos = parseInt(container.style.left) || 0;
            let move = Math.random() * 20;
            container.style.left = Math.min(pos + move, trackWidth) + "px";

            if (!finished && pos + move >= trackWidth) {
                finished = true;
                clearInterval(raceInterval);
                const winner = container.querySelector(".horse-number").textContent;
                document.getElementById("raceResult").innerHTML =
                    `🎉 Ngựa số <b>${winner}</b> đã thắng!`;
            }
        });
    }, 200);
}

// ======= GAME 4: Đồng hồ đếm ngược có âm thanh =======
let countdown, secondsLeft = 0;
const sound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

function startTimer() {
    const input = document.getElementById("timerInput");
    const display = document.getElementById("timerDisplay");
    secondsLeft = parseInt(input.value);
    if (isNaN(secondsLeft) || secondsLeft <= 0) {
        alert("Hãy nhập số giây hợp lệ!");
        return;
    }
    clearInterval(countdown);
    updateDisplay();

    countdown = setInterval(() => {
        secondsLeft--;
        updateDisplay();
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            display.textContent = "⏰ Hết giờ!";
            display.style.color = "red";
            sound.play();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
    const display = document.getElementById("timerDisplay");
    display.textContent = "⏸️ Dừng lại";
    display.style.color = "gray";
}

function updateDisplay() {
    const display = document.getElementById("timerDisplay");
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    display.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    display.style.color = "darkblue";
}
