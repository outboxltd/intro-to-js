let editors = {};
let timers = {};

// Create animated bubbles
function createBubbles() {
    const bubbleCount = 15;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 100 + 50;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        bubble.style.animationDuration = Math.random() * 10 + 8 + 's';
        document.body.appendChild(bubble);
    }
}

function startExercise(num) {
    const editorContainer = document.getElementById(`editor-container-${num}`);
    editorContainer.classList.add('show');
    
    if (!editors[num]) {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            editors[num] = monaco.editor.create(document.getElementById(`editor-${num}`), {
                value: '// כתבו את הקוד שלכם כאן',
                language: 'html',
                theme: 'vs-dark',
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on'
            });

            // Add auto-preview
            editors[num].onDidChangeModelContent(() => {
                const code = editors[num].getValue();
                const preview = document.querySelector(`#exercise-${num} .exercise-preview`);
                preview.innerHTML = `<iframe style="width:100%;height:200px;border:none;" srcdoc="${encodeURIComponent(code)}"></iframe>`;
            });
        });
    }

    // Start 3-minute timer
    let timeLeft = 180; // 3 minutes in seconds
    const timerElement = document.getElementById(`timer-${num}`);
    const solutionBtn = document.getElementById(`solution-btn-${num}`);
    
    if (timers[num]) {
        clearInterval(timers[num]);
    }
    
    timers[num] = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `זמן נותר: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timers[num]);
            solutionBtn.classList.add('show');
            timerElement.textContent = 'הזמן נגמר! אתם יכולים להמשיך לנסות או לראות את הפתרון.';
        }
        timeLeft--;
    }, 1000);
}

function showSolution(num) {
    if (editors[num]) {
        editors[num].setValue(solutions[num]);
    }
}

function showExercise(num) {
    document.querySelectorAll('.exercise-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(`exercise-${num}`).style.display = 'block';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Exercise navigation
    document.getElementById('btn-exercise-1').addEventListener('click', () => showExercise(1));
    document.getElementById('btn-exercise-2').addEventListener('click', () => showExercise(2));
    document.getElementById('btn-exercise-3').addEventListener('click', () => showExercise(3));

    // Show first exercise by default
    showExercise(1);

    // Create animated background
    createBubbles();
    setInterval(createBubbles, 20000);
});
