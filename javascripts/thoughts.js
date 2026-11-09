/* Progressive enhancement only. Every card and article exists in the built HTML. */
(() => {
  const root = document.getElementById('thoughts');
  if (!root) return;
  const cards = [...root.querySelectorAll('.thoughts-card')];
  const month = document.getElementById('thoughts-month');
  const category = document.getElementById('thoughts-category');
  const tag = document.getElementById('thoughts-tag');
  const more = document.getElementById('thoughts-more');
  const count = document.getElementById('thoughts-count');
  let limit = 12;
  function render() {
    const matching = cards.filter(card => {
      const monthMatch = !month.value || card.dataset.month === month.value;
      const categoryMatch = !category.value || card.dataset.category === category.value;
      const tagMatch = !tag.value || (card.dataset.tags && card.dataset.tags.split(',').includes(tag.value));
      return monthMatch && categoryMatch && tagMatch;
    });
    const visible = new Set(matching.slice(0, limit));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    more.hidden = matching.length <= limit;
    count.textContent = '显示 ' + Math.min(limit, matching.length) + ' / ' + matching.length + ' 篇 · 时间倒序';
    return matching;
  }
  month.addEventListener('change', () => { limit = 12; render(); });
  category.addEventListener('change', () => { limit = 12; render(); });
  tag.addEventListener('change', () => { limit = 12; render(); });
  more.addEventListener('click', () => {
    const previous = limit;
    limit += 12;
    const matching = render();
    matching[previous]?.querySelector('h2 a')?.focus({ preventScroll: true });
  });
  render();
})();
