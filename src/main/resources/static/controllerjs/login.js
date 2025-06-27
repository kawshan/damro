const users = [
    {username: 'admin', password: '1234', role: 'admin'},
    {username: 'mihika', password: 'mihika1234', role: 'employee'},
    {username: 'umesh', password: 'umesh1234', role: 'employee'},
    {username: 'pravindi', password: 'pravindi1234', role: 'employee'}
];


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user)); // Save user data
        window.location.href = '/dashboard';
    } else {
        alert('Invalid username or password');
    }
}





