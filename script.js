// THEME TOGGLE (persists)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const applyTheme = (mode) => {
    document.body.classList.toggle('dark', mode === 'dark');
    themeToggle.textContent = mode === 'dark' ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('theme', mode);
  };
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  themeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  });
}

// HTML PAGE: Bootstrap validation styling
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      alert('Form submitted (demo).');
      form.reset();
    }
    form.classList.add('was-validated');
  });
})();

// FULLSTACK PAGE: mock "API" calls (local simulation)
const fakeUsers = [
  { id: 1, name: 'Aarav' },
  { id: 2, name: 'Sita' },
  { id: 3, name: 'Kiran' },
];
function mockFetchUsers() {
  return new Promise(resolve => setTimeout(() => resolve(fakeUsers), 500));
}
(async () => {
  const btn = document.getElementById('loadUsers');
  const list = document.getElementById('userList');
  if (!btn || !list) return;
  btn.addEventListener('click', async () => {
    list.innerHTML = '<li class="list-group-item">Loading…</li>';
    const users = await mockFetchUsers();
    list.innerHTML = '';
    users.forEach(u => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `${u.id}. ${u.name}`;
      list.appendChild(li);
    });
  });
})();

// JS PAGE: DOM toggle highlight
(() => {
  const btn = document.getElementById('toggleBtn');
  const text = document.getElementById('demoText');
  if (!btn || !text) return;
  btn.addEventListener('click', () => {
    text.classList.toggle('bg-warning');
    text.classList.toggle('px-2');
  });
})();

// JS PAGE: login form validation (custom)
(() => {
  const form = document.getElementById('loginForm');
  const u = document.getElementById('u');
  const p = document.getElementById('p');
  const msg = document.getElementById('loginMsg');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    if (u.value.trim().length < 3) { msg.textContent = 'Username too short.'; return; }
    if (p.value.length < 6) { msg.textContent = 'Password must be ≥ 6 chars.'; return; }
    msg.classList.replace('text-danger','text-success');
    msg.textContent = 'Valid! (demo only)';
    form.reset();
  });
})();

// JS PAGE: Fetch API (mock)
const fakePosts = [
  { id: 1, title: 'Intro to HTTP', body: 'Requests, responses, and JSON.' },
  { id: 2, title: 'Async JS', body: 'Promises and async/await basics.' },
  { id: 3, title: 'Web Storage', body: 'localStorage vs sessionStorage.' },
];
function mockFetchPosts() {
  return new Promise(resolve => setTimeout(() => resolve(fakePosts), 500));
}
(() => {
  const btn = document.getElementById('loadPosts');
  const list = document.getElementById('postList');
  if (!btn || !list) return;
  btn.addEventListener('click', async () => {
    list.innerHTML = '<li class="list-group-item">Loading…</li>';
    const posts = await mockFetchPosts();
    list.innerHTML = '';
    posts.forEach(p => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<strong>${p.title}</strong> — ${p.body}`;
      list.appendChild(li);
    });
  });
})();

// JS PAGE: To-Do with localStorage
(() => {
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const list = document.getElementById('todoList');
  if (!form || !input || !list) return;

  const KEY = 'todos';
  const load = () => JSON.parse(localStorage.getItem(KEY) || '[]');
  const save = (todos) => localStorage.setItem(KEY, JSON.stringify(todos));
  const render = () => {
    list.innerHTML = '';
    load().forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `<span>${t}</span>
        <button class="btn btn-sm btn-outline-danger">Delete</button>`;
      li.querySelector('button').addEventListener('click', () => {
        const arr = load(); arr.splice(i,1); save(arr); render();
      });
      list.appendChild(li);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    const arr = load(); arr.push(val); save(arr); input.value=''; render();
  });

  render();
})();
