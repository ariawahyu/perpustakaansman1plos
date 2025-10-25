let books = JSON.parse(localStorage.getItem('books')) || [
    {
        title: "Buku digital",
        synopsis: "ini adalah buku digital, klik tombol untuk membaca buku",
        link: "https://fliphtml5.com/bookcase/ycmev"
    }
];
let history = JSON.parse(localStorage.getItem('history')) || [];
let activities = JSON.parse(localStorage.getItem('activities')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];



let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginForm = document.getElementById('login-form');
const booksContainer = document.getElementById('books-container');
const historyContainer = document.getElementById('history-container');
const activityContainer = document.getElementById('activity-container');
const addBookForm = document.getElementById('add-book-form');
const addStudentForm = document.getElementById('add-student-form');
const studentsList = document.getElementById('students-list');
const historyLink = document.getElementById('history-link');
const adminLink = document.getElementById('admin-link');

if (loginBtn) loginBtn.addEventListener('click', toggleLoginDropdown);
if (logoutBtn) logoutBtn.addEventListener('click', logout);
if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (addBookForm) addBookForm.addEventListener('submit', addBook);
if (addStudentForm) addStudentForm.addEventListener('submit', addStudent);





const toggleLogin = document.getElementById('toggle-password-login');
if (toggleLogin) toggleLogin.addEventListener('click', function() {
    togglePasswordVisibility('password', 'toggle-password-login');
});

const toggleStudent = document.getElementById('toggle-password-student');
if (toggleStudent) toggleStudent.addEventListener('click', function() {
    togglePasswordVisibility('student-password', 'toggle-password-student');
});

const toggleGuest = document.getElementById('toggle-password-guest');
if (toggleGuest) toggleGuest.addEventListener('click', function() {
    togglePasswordVisibility('guest-message', 'toggle-password-guest');
});

function toggleLoginDropdown() {
    const dropdown = document.getElementById('login-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const userType = document.getElementById('user-type').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Attempting login:', { userType, username, password });

    if (userType === 'admin' && username === 'admin' && password === 'admin123') {
        console.log('Admin login successful');
        currentUser = { type: 'admin', username: 'admin' };
        showAdminFeatures();
    } else if (userType === 'guru' && username === 'guru' && password === 'guru123') {
        console.log('Guru login successful');
        currentUser = { type: 'guru', username: 'guru' };
        showTeacherFeatures();
    } else if (userType === 'student') {
        console.log('Checking student login, students array:', students);
        const student = students.find(s => s.username === username && s.password === password);
        if (student) {
            console.log('Student login successful for:', username);
            currentUser = { type: 'student', username: username };
            showStudentFeatures();
        } else {
            console.log('Student login failed: student not found or password wrong');
            alert('Login gagal. Periksa kredensial Anda.');
            return;
        }
    } else {
        console.log('Login failed: invalid userType or credentials');
        alert('Login gagal. Periksa kredensial Anda.');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    const dropdown = document.getElementById('login-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    updateUI();
}

function logout() {
    const studentBorrowLink = document.getElementById('student-borrow-link');
    const studentReadLink = document.getElementById('student-read-link');
    if (studentBorrowLink) studentBorrowLink.parentElement.remove();
    if (studentReadLink) studentReadLink.parentElement.remove();

    const teacherReportLink = document.getElementById('teacher-report-link');
    if (teacherReportLink) teacherReportLink.parentElement.remove();

    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUI();
}

function showAdminFeatures() {
    historyLink.style.display = 'none';
    adminLink.style.display = 'block';
    adminLink.textContent = 'Admin';
    document.getElementById('admin').style.display = 'block';
    document.querySelector('#admin h2').textContent = 'Panel Admin';
    if (document.getElementById('add-book-form')) {
        document.getElementById('add-book-form').parentElement.style.display = 'none';
    }
    if (document.getElementById('add-student-form')) {
        document.getElementById('add-student-form').style.display = 'block';
    }
}

function showTeacherFeatures() {
    historyLink.style.display = 'none';
    adminLink.style.display = 'block';
    adminLink.textContent = 'Guru';
    document.getElementById('admin').style.display = 'block';
    document.querySelector('#admin h2').textContent = 'Panel Guru';
    if (document.getElementById('add-book-form')) {
        document.getElementById('add-book-form').parentElement.style.display = 'none';
    }
    if (document.getElementById('add-student-form')) {
        document.getElementById('add-student-form').style.display = 'none';
    }

    const navLinks = document.querySelector('.nav-links');
    if (!document.getElementById('teacher-report-link')) {
        const reportLi = document.createElement('li');
        reportLi.innerHTML = '<button id="teacher-report-link" class="read-btn">talitberhat</button>';
        adminLink.parentElement.insertAdjacentElement('afterend', reportLi);

        document.getElementById('teacher-report-link').addEventListener('click', (e) => {
            e.preventDefault();
            handleOption('teacherReport');
        });
    }

    document.getElementById('logout-btn').parentElement.style.marginLeft = 'auto';
}

function showStudentFeatures() {
    historyLink.style.display = 'none';
    adminLink.style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('history').style.display = 'none';

    document.getElementById('logout-btn').parentElement.style.marginLeft = 'auto';
}

function showGuestFeatures() {
    historyLink.style.display = 'none';
    adminLink.style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    document.getElementById('options').style.display = 'none';

    const navLinks = document.querySelector('.nav-links');
    const allNavItems = navLinks.querySelectorAll('li');
    allNavItems.forEach(item => {
        if (!item.querySelector('a[href="#beranda"]') && !item.querySelector('#logout-btn')) {
            item.style.display = 'none';
        }
    });

    if (!document.getElementById('guest-read-link')) {
        const readLi = document.createElement('li');
        readLi.innerHTML = '<button id="guest-read-link" class="read-btn">Baca Buku</button>';
        navLinks.appendChild(readLi);

        document.getElementById('guest-read-link').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'read-options.html';
        });
    }

    document.getElementById('logout-btn').parentElement.style.marginLeft = 'auto';
}

function renderOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const options = [
        {
            title: "Baca Buku",
            description: "Baca buku digital secara online.",
            action: "readBook"
        },
        {
            title: "Ringkasan",
            description: "setelah membaca klik ringkasan untuk mengisi absen dan ringkasan cerita",
            action: "ringkasan"
        }
    ];

    options.forEach((option, index) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'book-card';
        optionCard.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${option.title}</h3>
                <p class="book-synopsis">${option.description}</p>
                <button class="read-btn" onclick="handleOption('${option.action}')">${option.title}</button>
            </div>
        `;
        optionsContainer.appendChild(optionCard);
    });
}

function handleOption(action) {
    if (action === 'readBook') {
        window.location.href = 'books.html';
    } else if (action === 'ringkasan') {
        window.location.href = 'ringkasan.html';
    } else if (action === 'teacherReport') {
        window.open(teacherReportLink, '_blank');
    }
}

function updateUI() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        if (currentUser.type === 'admin') {
            showAdminFeatures();
        } else if (currentUser.type === 'guru') {
            showTeacherFeatures();
        } else {
            showStudentFeatures();
        }
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        historyLink.style.display = 'none';
        adminLink.style.display = 'none';
        document.getElementById('history').style.display = 'none';
        document.getElementById('admin').style.display = 'none';
        document.getElementById('options').style.display = 'block';
    }
    renderBooks();
    renderHistory();
    renderActivities();
    renderStudents();
    renderStudentStats();
    renderAdminStats();
}

function renderBooks() {
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        let buttons = `<button class="read-btn" onclick="readBook(${index})">Baca Buku</button>`;
        bookCard.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-synopsis">${book.synopsis}</p>
                ${buttons}
            </div>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function readBook(index) {
    const book = books[index];
    const startTime = new Date().getTime();

    const bookViewer = document.createElement('div');
    bookViewer.id = 'book-viewer';
    bookViewer.innerHTML = `
        <div class="viewer-header">
            <h2>${book.title}</h2>
            <button id="close-viewer">Tutup</button>
        </div>
        <iframe src="${book.link}" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>
    `;
    document.body.appendChild(bookViewer);

    document.getElementById('close-viewer').addEventListener('click', () => {
        document.body.removeChild(bookViewer);
    });

    const activity = {
        bookTitle: book.title,
        username: currentUser.username,
        startTime: startTime,
        endTime: null,
        duration: null
    };

    setTimeout(() => {
        const endTime = new Date().getTime();
        activity.endTime = endTime;
        activity.duration = Math.round((endTime - startTime) / 1000);

        activities.push(activity);
        localStorage.setItem('activities', JSON.stringify(activities));

        history.push({
            bookTitle: book.title,
            username: currentUser.username,
            readDate: new Date().toLocaleString(),
            startTime: startTime,
            duration: activity.duration
        });
        localStorage.setItem('history', JSON.stringify(history));

        renderHistory();
        renderActivities();
    }, 5000);
}

function renderHistory() {
    historyContainer.innerHTML = '';
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <h4>${item.bookTitle}</h4>
            <p>Dibaca pada: ${item.readDate}</p>
            <p>Durasi: ${Math.floor(item.duration / 60)} menit ${item.duration % 60} detik</p>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function renderActivities() {
    activityContainer.innerHTML = '';
    activities.forEach((activity, index) => {
        const activityItem = document.createElement('div');
        activityItem.className = 'history-item';
        let userRole = '';
        if (activity.username === 'admin') {
            userRole = 'Admin';
        } else if (activity.username === 'guru') {
            userRole = 'Guru';
        } else {
            userRole = 'Siswa';
        }
        let deleteButton = '';
        if (currentUser && (currentUser.type === 'admin' || currentUser.type === 'guru')) {
            deleteButton = `<button class="delete-btn" onclick="deleteActivity(${index})">Hapus</button>`;
        }
        activityItem.innerHTML = `
            <h4>${activity.bookTitle}</h4>
            <p>${userRole}: ${activity.username}</p>
            <p>Waktu mulai: ${new Date(activity.startTime).toLocaleString()}</p>
            <p>Durasi: ${Math.floor(activity.duration / 60)} menit ${activity.duration % 60} detik</p>
            ${deleteButton}
        `;
        activityContainer.appendChild(activityItem);
    });
}

function addBook(e) {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const synopsis = document.getElementById('book-synopsis').value;
    const cover = document.getElementById('book-cover').value;
    const link = document.getElementById('book-link').value;

    books.push({ title, author, synopsis, cover, link });
    localStorage.setItem('books', JSON.stringify(books));

    renderBooks();
    addBookForm.reset();
    alert('Buku berhasil ditambahkan!');
}

function addStudent(e) {
    e.preventDefault();
    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;

    const existingStudent = students.find(student => student.username === username);
    if (existingStudent) {
        alert('Username siswa sudah ada!');
        return;
    }

    students.push({ username, password });
    localStorage.setItem('students', JSON.stringify(students));

    renderStudents();
    addStudentForm.reset();
    alert('Akun siswa berhasil ditambahkan!');
}

function renderStudents() {
    studentsList.innerHTML = '';
    students.forEach((student, index) => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        let deleteButton = '';
        if (currentUser && currentUser.type === 'admin') {
            deleteButton = `<button class="delete-btn" onclick="deleteStudent(${index})">Hapus</button>`;
        }
        studentItem.innerHTML = `
            <p><strong>Username:</strong> ${student.username}</p>
            ${deleteButton}
        `;
        studentsList.appendChild(studentItem);
    });
}

function deleteStudent(index) {
    if (confirm('Apakah Anda yakin ingin menghapus akun siswa ini?')) {
        const studentToDelete = students[index];

        const studentActivities = activities.filter(activity => activity.username === studentToDelete.username);

        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));

        activities = activities.filter(activity => activity.username !== studentToDelete.username);
        localStorage.setItem('activities', JSON.stringify(activities));

        history = history.filter(item => item.username !== studentToDelete.username);
        localStorage.setItem('history', JSON.stringify(history));

        if (currentUser && currentUser.username === studentToDelete.username) {
            logout();
        }

        renderStudents();
        renderActivities();
        renderHistory();
        renderStudentStats();
        renderAdminStats();

        alert('Akun siswa berhasil dihapus!');
    }
}

function deleteActivity(index) {
    if (confirm('Apakah Anda yakin ingin menghapus aktivitas ini?')) {
        activities.splice(index, 1);
        localStorage.setItem('activities', JSON.stringify(activities));

        renderActivities();
        renderAdminStats();

        alert('Aktivitas berhasil dihapus!');
    }
}

function deleteGuestbookEntry(index) {
    if (confirm('Apakah Anda yakin ingin menghapus entri buku tamu ini?')) {
        guestbookEntries.splice(index, 1);
        localStorage.setItem('guestbookEntries', JSON.stringify(guestbookEntries));

        renderGuestbookEntries();

        alert('Entri buku tamu berhasil dihapus!');
    }
}

const teacherReportLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdSEXk5ejYQFN564mpSL_Lcc8uAUmxUK8wofvdaH_kF4qyS8A/viewform?pli=1';


document.addEventListener('DOMContentLoaded', function() {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
        currentUser = storedUser;
        if (loginBtn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        }
    }
    updateUI();
});

updateUI();

function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

window.onclick = function(event) {
    const dropdown = document.getElementById('login-dropdown');
    if (dropdown && !event.target.matches('.dropbtn') && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
}

function renderStudentStats() {
    const studentStatsContainer = document.getElementById('student-stats');
    if (!studentStatsContainer) return;

    const userActivities = activities.filter(activity => activity.username === currentUser.username);
    const totalReadingTime = userActivities.reduce((total, activity) => total + (activity.duration || 0), 0);
    const averageReadingTime = userActivities.length > 0 ? Math.round(totalReadingTime / userActivities.length) : 0;

    studentStatsContainer.innerHTML = `
        <div class="stats-card">
            <h3>Total Waktu Membaca</h3>
            <p>${Math.floor(totalReadingTime / 60)} menit</p>
        </div>
        <div class="stats-card">
            <h3>Rata-rata Waktu per Buku</h3>
            <p>${Math.floor(averageReadingTime / 60)} menit</p>
        </div>
    `;
}

function renderAdminStats() {
    const adminStatsContainer = document.getElementById('admin-stats');
    if (!adminStatsContainer) return;

    const totalStudents = students.length;
    const totalActivities = activities.length;
    const totalReadingTime = activities.reduce((total, activity) => total + (activity.duration || 0), 0);

    let statsHTML = `
        <div class="stats-card">
            <h3>Total Siswa</h3>
            <p>${totalStudents}</p>
        </div>
    `;

    if (currentUser && currentUser.type === 'admin') {
        statsHTML += `
            <div class="stats-card">
                <h3>Total Aktivitas Membaca</h3>
                <p>${totalActivities}</p>
            </div>
            <div class="stats-card">
                <h3>Total Waktu Membaca</h3>
                <p>${Math.floor(totalReadingTime / 60)} menit</p>
            </div>
        `;
    }

    adminStatsContainer.innerHTML = statsHTML;
}