// public/main.js
document.addEventListener('DOMContentLoaded', () => {
    const randomSetup    = document.getElementById('random-setup');
    const randomDelivery = document.getElementById('random-delivery');
    const categorySelect = document.getElementById('category-select');
    const searchInput    = document.getElementById('category-search');
    const searchButton   = document.getElementById('search-button');
    const jokesUl        = document.getElementById('jokes-ul');
    const addForm        = document.getElementById('add-joke-form');
    const newCategory    = document.getElementById('new-category');
    const newSetup       = document.getElementById('new-setup');
    const newDelivery    = document.getElementById('new-delivery');
  
    // Random joke on load
    fetch('/jokebook/random')
      .then(r => r.json())
      .then(j => {
        randomSetup.textContent    = j.setup;
        randomDelivery.textContent = j.delivery;
      });
  
    // Populate categories dropdown
    fetch('/jokebook/categories')
      .then(r => r.json())
      .then(cats => {
        cats.forEach(cat => {
          const opt = document.createElement('option');
          opt.value       = cat;
          opt.textContent = cat;
          categorySelect.appendChild(opt);
        });
      });
  
    // Helper to render jokes
    function displayJokes(jokes) {
      // clear
      while (jokesUl.firstChild) jokesUl.removeChild(jokesUl.firstChild);
  
      jokes.forEach(({ setup, delivery }) => {
        const li        = document.createElement('li');
        const pSetup    = document.createElement('p');
        const pDelivery = document.createElement('p');
  
        pSetup.textContent    = setup;
        pDelivery.textContent = delivery;
  
        li.appendChild(pSetup);
        li.appendChild(pDelivery);
        jokesUl.appendChild(li);
      });
    }
  
    // Fetch jokes by category
    function fetchJokes(category) {
      fetch(`/jokebook/joke/${encodeURIComponent(category)}`)
        .then(r => {
          if (!r.ok) throw new Error('Category not found');
          return r.json();
        })
        .then(displayJokes)
        .catch(e => alert(e.message));
    }
  
    // On dropdown change
    categorySelect.addEventListener('change', () => {
      const cat = categorySelect.value;
      if (cat) fetchJokes(cat);
    });
  
    // On search button click
    searchButton.addEventListener('click', () => {
      const cat = searchInput.value.trim();
      if (cat) fetchJokes(cat);
    });
  
    // Add Joke form submit
    addForm.addEventListener('submit', e => {
      e.preventDefault();
      const payload = {
        category: newCategory.value.trim(),
        setup:    newSetup.value.trim(),
        delivery: newDelivery.value.trim()
      };
  
      fetch('/jokebook/joke/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      })
        .then(r =>
          r.ok
            ? r.json()
            : r.json().then(err => Promise.reject(err.error))
        )
        .then(jokes => {
          displayJokes(jokes);
          newSetup.value    = '';
          newDelivery.value = '';
        })
        .catch(alert);
    });
  });
  