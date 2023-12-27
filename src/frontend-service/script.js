const backendUrl = 'http://backend-service'; 

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('upload-section').style.display = 'block';
        document.getElementById('download-section').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function uploadVideo() {
    const videoFile = document.getElementById('videoFile').files[0];
    const formData = new FormData();
    formData.append('video', videoFile);
    
    fetch(`${backendUrl}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => console.error('Error:', error));
}

function downloadMp3() {
    const fileId = document.getElementById('fileId').value;
    
    window.location.href = `${backendUrl}/download?fid=${fileId}&token=${localStorage.getItem('token')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('upload-section').style.display = 'block';
        document.getElementById('download-section').style.display = 'block';
    }
});
