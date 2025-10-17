document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded users (replace with database in future)
    const users = [
        { username: "teacher1", password: "12345" },
        { username: "student1", password: "abcd" }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        // Store login info in localStorage/sessionStorage
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html'; // Redirect to your attendance dashboard
    } else {
        document.getElementById('errorMsg').innerText = "Invalid username or password!";
    }
});
