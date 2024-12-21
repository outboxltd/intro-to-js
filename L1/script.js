// מערך של הודעות מעודדות
const messages = [
    "כל הכבוד!",
    "אתם אלופים!",
    "מצוין!",
    "המשיכו ככה!",
    "יופי!",
    "נהדר!",
    "מדהים!"
];

// משתנה לספירת הלחיצות
let count = 0;

// תפיסת האלמנטים מה-HTML
const myButton = document.getElementById("myButton");
const resetButton = document.getElementById("resetButton");
const counterDiv = document.getElementById("counter");
const title = document.getElementById("title");

// פונקציה לקבלת צבע רנדומלי
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// פונקציה לקבלת הודעה רנדומלית
function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// פונקציה לאיפוס המשחק
function resetGame() {
    count = 0;
    counterDiv.textContent = "לחצת 0 פעמים";
    document.body.style.backgroundColor = "#ffffff";
    title.textContent = "ברוכים הבאים!";
}

// הוספת מאזין אירועים ללחיצה על הכפתור הראשי
myButton.addEventListener("click", function() {
    // הגדלת מספר הלחיצות
    count = count + 1;
    
    // עדכון הטקסט בדף
    counterDiv.textContent = "לחצת " + count + " פעמים";
    
    // שינוי הכותרת להודעה מעודדת
    title.textContent = getRandomMessage();
    
    // שינוי צבע הרקע באופן אקראי
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
});

// הוספת מאזין אירועים לכפתור האיפוס
resetButton.addEventListener("click", resetGame);
