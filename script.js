document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const startBtn = document.getElementById('start-btn');
    const treatBtn = document.getElementById('treat-btn');
    const askBtn = document.getElementById('ask-btn');
    const cursor = document.getElementById('dog-cursor');

    // 1. 鼠标效果 (在手机模式下其实不生效，但保留炫酷)
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. 核心对话序列
    const dialog = [
        { d: 1000, t: "🐱: Hey!!" },
        { d: 800, t: "🐱: You’re here" },
        { d: 1200, t: "🐱: I knew you would come" },
        { d: 1500, t: "🐱: i saw something that reminded me of you" },
        { d: 1000, t: "🐱: i miss you" },
        { d: 2000, t: "🐶: i was just thinking about you" },
        { d: 800, t: "🐶: like… randomly" },
        { d: 800, t: "🐶: and then i was like" },
        { d: 1000, t: "🐶: what if you show up here" },
        { d: 1500, t: "🐶: and YOU DID" },
        { d: 800, t: "🐶: okay that’s actually kinda cool" },
        { d: 1200, t: "🐶: are you doing okay today?" },
        { d: 2500, t: "🐶: i miss you... but like… in a good way" },
        { d: 1000, t: "🐶: not sad, just “i hope you’re doing well” kind of miss" },
        { d: 1500, t: "🐶: also... i deserve a treat for waiting. I waited VERY patiently. (this is not true)" }
    ];

    // 3. 点击进入
    startBtn.onclick = () => {
        document.getElementById('landing').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        processDialog(0);
    };

    async function processDialog(index) {
        if (index >= dialog.length) {
            treatBtn.classList.remove('hidden');
            return;
        }
        await new Promise(r => setTimeout(r, dialog[index].d));
        addMessage(dialog[index].t);
        processDialog(index + 1);
    }

    function addMessage(text) {
        const div = document.createElement('div');
        div.className = 'msg dog-msg';
        div.innerText = text;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(() => div.classList.add('show'), 50);
    }

    // 4. 喂肉奖励互动
    treatBtn.onclick = async () => {
        treatBtn.classList.add('hidden');
        addMessage("🍖 *Recieving treat... Data integrity 100%*");
        await new Promise(r => setTimeout(r, 1500));
        addMessage("🐶: if you’re tired, you can stay here a bit");
        addMessage("🐶: i won’t talk too much (i might talk a little)");
        await new Promise(r => setTimeout(r, 2000));
        addMessage("🐶: just so you know, you’re doing better than you think");
        addMessage("🐶: and i’m kinda proud of you");
        askBtn.classList.remove('hidden');
    };

    // 5. How are you 循环
    askBtn.onclick = () => {
        addMessage("🐱: i'm fine. just thinking about you.");
    };

    // 6. 昼夜切换 (每60秒)
    setInterval(() => {
        const body = document.body;
        const isDay = body.classList.contains('day-mode');
        if (isDay) {
            body.classList.replace('day-mode', 'night-mode');
            addMessage("🌙: it's getting late. you should rest. 😴");
        } else {
            body.classList.replace('night-mode', 'day-mode');
            addMessage("☀️: Good morning! System re-initialized.");
        }
    }, 60000);

    // 7. 隐藏惊喜 - 停30秒
    setTimeout(() => {
        addMessage("🐱: you stayed. that makes me happy.");
    }, 30000);
});