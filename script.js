let clicks = 0;
const countEl = document.getElementById('count');

document.getElementById('btn').addEventListener('click', () => {
  clicks++;
  countEl.textContent = `Clicks: ${clicks}`;
});
