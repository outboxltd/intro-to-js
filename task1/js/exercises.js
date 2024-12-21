const solutions = {
    1: `<!DOCTYPE html>
<html>
<head>
    <title>דוגמה לאינטראקטיביות עם JavaScript</title>
</head>
<body>

<h1 id="welcomeMessage">ברוכים הבאים לאתר שלי!</h1>
<button onclick="changeText()">לחץ כדי לשנות טקסט</button>

<script>
    function changeText() {
        document.getElementById("welcomeMessage").innerHTML = "תודה שלחצת על הכפתור!";
    }
</script>

</body>
</html>`,
    2: `<!DOCTYPE html>
<html>
<head>
    <title>משימת שינוי צבע רקע</title>
</head>
<body>

<h1>משחק החלפת צבע רקע</h1>
<button onclick="changeBackgroundColor()">החלף צבע רקע</button>

<script>
    function changeBackgroundColor() {
        document.body.style.backgroundColor = "lightgreen";
    }
</script>

</body>
</html>`,
    3: `<!DOCTYPE html>
<html>
<head>
    <title>משימת שינוי צבע רקע אקראי</title>
</head>
<body>

<h1>משחק החלפת צבע רקע אקראי</h1>
<button onclick="changeBackgroundColor()">החלף צבע רקע</button>

<script>
    function changeBackgroundColor() {
        const colors = ["lightgreen", "lightblue", "lightpink", "lightyellow", "lightgray"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }
</script>

</body>
</html>`
};
