document.addEventListener('DOMContentLoaded', function () {
  // Sélectionne le champ de recherche et ajoute un écouteur d'événements
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchPosts();
    });
    const toggleButton = document.getElementById('mode-toggle');
    const isDark = localStorage.getItem('theme') === 'dark';
  
    if (isDark) {
      document.body.classList.add('dark-mode');
      toggleButton.textContent = 'Light mode';
    }
  
    toggleButton.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
  
      toggleButton.textContent = isDarkMode ? 'Light mode' : 'Dark mode';
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }

  const postsContainer = document.getElementById('posts-container');
  if (postsContainer) {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'post';
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <h4>Post ID: ${post.id} - User ID: ${post.userId}</h4>
          `;
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('Erreur :', error);
        postsContainer.innerHTML = '<h1>Erreur de chargement</h1>';
      });
  }
});

// Navigation latérale
const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
let menuOpen = false;

if (openBtn && closeBtn && sidenav) {
  openBtn.onclick = openNav;
  closeBtn.onclick = closeNav;
}

function openNav() {
  sidenav.classList.add("active");

  // Ajoute l'animation de rotation au bouton burger
  openBtn.classList.add("rotate");

  // Une fois l'animation terminée, on le cache
  setTimeout(() => {
    openBtn.style.display = "none";
    openBtn.classList.remove("rotate"); // Clean
  }, 600); // correspond à la durée de l'anim

  // Montre le bouton "×" avec animation
  closeBtn.style.display = "block";
  closeBtn.classList.add("rotate");

  // Retire la classe après animation pour éviter conflits
  setTimeout(() => {
    closeBtn.classList.remove("rotate");
  }, 600);

  menuOpen = true;
}

function closeNav() {
  sidenav.classList.remove("active");

  // Inverse le process
  closeBtn.classList.add("rotate");
  setTimeout(() => {
    closeBtn.style.display = "none";
    closeBtn.classList.remove("rotate");
  }, 600);

  openBtn.style.display = "block";
  openBtn.classList.add("rotate");
  setTimeout(() => {
    openBtn.classList.remove("rotate");
  }, 600);

  menuOpen = false;
}

function searchPosts() {
  const input = document.getElementById('search');
  const searchValue = input ? input.value.toLowerCase() : '';
  const posts = document.querySelectorAll('.post');
  let resultsFound = false;

  posts.forEach(post => {
    const title = post.querySelector('h2').textContent.toLowerCase();
    const body = post.querySelector('p').textContent.toLowerCase();
    if (title.includes(searchValue) || body.includes(searchValue)) {
      post.style.display = 'block';
      resultsFound = true;
    } else {
      post.style.display = 'none';
    }
  });

  const noResultsMessage = document.getElementById('no-results');
  if (noResultsMessage) {
    noResultsMessage.style.display = resultsFound ? 'none' : 'block';
  }
}


function toggleItemDisplay() {
  if (window.innerWidth < 768 && menuOpen) {
    closeBtn.style.display = "block";
  } else {
    closeBtn.style.display = "none";
  }
}

// Appel initial au chargement
toggleItemDisplay();

// Réagit au redimensionnement
window.addEventListener("resize", toggleItemDisplay);

console.log('✅ Script chargé !');