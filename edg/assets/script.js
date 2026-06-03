
// Filter products in tienda
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#products-grid .product-card');

  if (chips.length && cards.length) {
    // Check URL for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const initialCat = urlParams.get('cat');
    if (initialCat) {
      const targetChip = Array.from(chips).find(c => c.dataset.filter === initialCat);
      if (targetChip) {
        chips.forEach(c => c.classList.remove('active'));
        targetChip.classList.add('active');
        cards.forEach(card => {
          card.style.display = (card.dataset.cat === initialCat || initialCat === 'all') ? '' : 'none';
        });
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        cards.forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
        });
      });
    });
  }

  // Gallery thumbs (product page)
  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  // Newsletter form (Brevo)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    const btn = document.getElementById('newsletter-btn');
    const msg = document.getElementById('newsletter-msg');

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterForm.email.value.trim();
      if (!email) return;

      btn.disabled = true;
      btn.textContent = 'Enviando...';
      msg.hidden = true;

      try {
        const response = await fetch('/.netlify/functions/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (response.ok && data.ok) {
          msg.textContent = data.message || '¡Gracias! Te suscribiste.';
          msg.className = 'newsletter-msg ok';
          newsletterForm.reset();
        } else {
          msg.textContent = data.error || 'Algo salió mal. Intentá de nuevo.';
          msg.className = 'newsletter-msg error';
        }
      } catch (err) {
        msg.textContent = 'No pudimos conectar. Probá en unos minutos.';
        msg.className = 'newsletter-msg error';
      } finally {
        msg.hidden = false;
        btn.disabled = false;
        btn.textContent = 'Suscribirme';
      }
    });
  }
});
