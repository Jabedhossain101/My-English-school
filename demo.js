document.addEventListener('DOMContentLoaded', () => {
  loadLessons();
});

function login() {
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();

  if (!username) {
    alert('Please enter your name.');
    return;
  }
  if (password !== '123456') {
    alert('Incorrect password.');
    return;
  }

  alert(`Login successful!
  আপনাকে অভিনন্দন`);
  // alert('আপনাকে অভিনন্দন');
  document.getElementById('banner').classList.add('hidden');
  document.getElementById('faq').classList.remove('hidden');
  document.getElementById('vocab').classList.remove('hidden');
}

function logout() {
  document.getElementById('banner').classList.remove('hidden');
  document.getElementById('faq').classList.add('hidden');
  document.getElementById('vocab').classList.add('hidden');
}
document.getElementById('vocab').classList.add('hidden');

// document.getElementById('nav').classList.add('hidden');

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

async function loadLessons() {
  let lessonButtons = document.getElementById('lessonButtons');
  let response = await fetch('https://api.example.com/lessons'); // Replace with actual API
  let lessons = await response.json();

  if (!lessons || lessons.length === 0) {
    lessonButtons.innerHTML = '<p>No lessons found.</p>';
    return;
  }

  lessons.forEach(lesson => {
    let button = document.createElement('button');
    button.className = 'px-3 py-2 bg-blue-300 text-white rounded';
    button.textContent = `Lesson ${lesson.id}`;
    button.onclick = () => loadWords(lesson.id);
    lessonButtons.appendChild(button);
  });
}

async function loadWords(lessonId) {
  let wordsContainer = document.getElementById('wordsContainer');
  wordsContainer.innerHTML = '<p>Loading...</p>';

  let response = await fetch(
    `https://api.example.com/lessons/${lessonId}/words`
  ); // Replace with actual API
  let words = await response.json();

  if (!words || words.length === 0) {
    wordsContainer.innerHTML = '<p>No words found.</p>';
    return;
  }

  wordsContainer.innerHTML = words
    .map(
      word =>
        `<div class="border p-4 my-2">
            <h3 class="text-lg font-bold">${word.word} (${word.pronunciation})</h3>
            <p>${word.meaning}</p>
        </div>`
    )
    .join('');
}
