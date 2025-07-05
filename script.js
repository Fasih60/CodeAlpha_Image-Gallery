let images = [
  {
    url: 'images/nature1.png',
    category: 'nature',
    caption: 'Beautiful green forest'
  },
  {
    url: 'images/nature2.jpg',
    category: 'nature',
    caption: 'Sunset by the lake'
  },
  {
    url: 'images/nature3.jpg',
    category: 'nature',
    caption: 'Flower on a water'
  },
  {
    url: 'images/nature4.jpg',
    category: 'nature',
    caption: 'Sunrise'
  },
  {
    url: 'images/nature5.jpg',
    category: 'nature',
    caption: 'Forest trees'
  },
  {
    url: 'images/nature6.jpg',
    category: 'nature',
    caption: 'WaterFall'
  },
  {
    url: 'images/nature7.jpg',
    category: 'nature',
    caption: 'View of mountains '
  },
  {
    url: 'images/nature8.jpg',
    category: 'nature',
    caption: 'WaterFall'
  },
  {
    url: 'images/nature9.jpg',
    category: 'nature',
    caption: 'National Park - Margala Hills'
  },
  {
    url: 'images/nature10.jpg',
    category: 'nature',
    caption: 'Water'
  },
  {
    url: 'images/architecture1.jpg',
    category: 'architecture',
    caption: 'Modern building at night'
  },
  {
    url: 'images/architecture2.jpg',
    category: 'architecture',
    caption: 'Old historical monument'
  },
  {
    url: 'images/architecture3.jpg',
    category: 'architecture',
    caption: 'Pyramid'
  },
  {
    url: 'images/architecture4.jpg',
    category: 'architecture',
    caption: 'Beautiful Mosque'
  },
  {
    url: 'images/architecture5.jpg',
    category: 'architecture',
    caption: 'architecture'
  },
  {
    url: 'images/architecture6.jpg',
    category: 'architecture',
    caption: 'Old historical monument'
  },
  {
    url: 'images/architecture7.jpg',
    category: 'architecture',
    caption: 'Old historical monument'
  },
  {
    url: 'images/architecture8.jpg',
    category: 'architecture',
    caption: 'Historical Building'
  },
  {
    url: 'images/architecture9.jpg',
    category: 'architecture',
    caption: 'Nice sunset View'
  },
  {
    url: 'images/architecture10.jpg',
    category: 'architecture',
    caption: 'Beautiful Building'
  },
  {
    url: 'images/people1.jpg',
    category: 'people',
    caption: 'Smiling girl in sunlight'
  },
  {
    url: 'images/people2.jpg',
    category: 'people',
    caption: 'Jennifer'
  },
  {
    url: 'images/people3.jpg',
    category: 'people',
    caption: 'Katherine'
  },
  {
    url: 'images/people4.jpg',
    category: 'people',
    caption: 'Emma Watson'
  },
  {
    url: 'images/people5.jpg',
    category: 'people',
    caption: 'Thor'
  },
  {
    url: 'images/people6.jpg',
    category: 'people',
    caption: 'Captain america'
  },
  {
    url: 'images/people7.jpg',
    category: 'people',
    caption: 'Black widow'
  },
  {
    url: 'images/people8.jpg',
    category: 'people',
    caption: 'Iron Man'
  },
  {
    url: 'images/people9.jpg',
    category: 'people',
    caption: 'Spider Man'
  },
  {
    url: 'images/people10.jpg',
    category: 'people',
    caption: 'Hulk'
  }
];
let currentFilter = 'all';
let searchTerm = '';

function loadGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  const filteredImages = images.filter(img => {
    const matchCat = currentFilter === 'all' || img.category === currentFilter;
    const matchSearch = img.caption.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  filteredImages.forEach(img => {
    const a = document.createElement('a');
    a.href = img.url;
    a.className = 'glightbox';
    a.setAttribute('data-gallery', 'gallery');
    a.setAttribute('data-title', img.caption);

    const image = document.createElement('img');
    image.src = img.url;
    image.alt = img.caption;

    a.appendChild(image);
    gallery.appendChild(a);
  });

  refreshLightbox();
}

function refreshLightbox() {
  if (window.lightboxInstance) window.lightboxInstance.destroy();
  window.lightboxInstance = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
    autoplayVideos: false
  });
}

document.getElementById('uploadInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const newImage = {
      url: e.target.result,
      category: 'uploaded',
      caption: file.name.split('.')[0]
    };
    images.unshift(newImage);
    loadGallery();
  };
  reader.readAsDataURL(file);
});

document.getElementById('searchInput').addEventListener('input', function (event) {
  searchTerm = event.target.value;
  loadGallery();
});

function filterGallery(category) {
  currentFilter = category;
  loadGallery();

  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(category)) {
      btn.classList.add('active');
    }
  });
}

window.onload = () => {
  loadGallery();
};

document.addEventListener('DOMContentLoaded', function () {
  // Submenu toggle
  document.querySelectorAll('.submenu-header').forEach(header => {
    header.addEventListener('click', function () {
      const submenu = this.parentElement.querySelector('.submenu');
      const icon = this.querySelector('.fa-chevron-down, .fa-chevron-up');
      submenu.classList.toggle('active');
      icon.classList.toggle('fa-chevron-down');
      icon.classList.toggle('fa-chevron-up');
    });
  });

  // Sidebar filtering
  const navLinks = document.querySelectorAll('.sidebar-menu a[data-filter]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      currentFilter = this.getAttribute('data-filter');
      loadGallery();

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // New Folder
  document.getElementById('newFolderBtn').addEventListener('click', function (e) {
    e.preventDefault();
    const folderName = prompt('Enter new folder name:');
    if (folderName) alert(`Folder "${folderName}" created.`);
  });
});