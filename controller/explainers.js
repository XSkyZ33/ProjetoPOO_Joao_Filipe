const API_BASE_URL = 'http://localhost:3000';
const ENDPOINT = '/explainer';
const container = document.getElementById('explainers-container');

// Filtros
const nomeInput = document.getElementById('filter-nome');
const nivelSelect = document.getElementById('filter-nivel');
const precoSelect = document.getElementById('filter-preco');
const localSelect = document.getElementById('filter-local');
const disciplinasSelect = document.getElementById('filter-disciplinas');

let explicadores = [];

async function fetchExplainers() {
    const res = await fetch(`${API_BASE_URL}${ENDPOINT}`);
    explicadores = await res.json();
    renderExplainers(explicadores);
}

function renderExplainers(data) {
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<p>Nenhum explicador encontrado.</p>';
        return;
    }

    data.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.backgroundImage = `url(${exp.image})`;

        card.innerHTML = `
            <div class="card-overlay">
                <div class="card-header">
                    <h3>${exp.name}</h3>
                    <span class="rating">${exp.classificacao} ⭐</span>
                </div>
                <p><strong>Local:</strong> ${exp.local}</p>
                <p><strong>Disciplinas:</strong> ${exp.disciplinas.join(', ')}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function applyFilters() {
    let filtered = explicadores;

    const nome = nomeInput.value.toLowerCase();
    const nivel = nivelSelect.value;
    const precoRange = precoSelect.value;
    const local = localSelect.value;
    const disciplinas = Array.from(disciplinasSelect.selectedOptions).map(opt => opt.value);

    filtered = filtered.filter(exp => {
        const matchNome = exp.name.toLowerCase().includes(nome);
        const matchNivel = nivel === '' || exp.nivel === nivel;
        const matchPreco = precoRange === '' || checkPreco(exp.preco, precoRange);
        const matchLocal = local === '' || exp.local === local;
        const matchDisciplinas = disciplinas.length === 0 || disciplinas.every(d => exp.disciplinas.includes(d));

        return matchNome && matchNivel && matchPreco && matchLocal && matchDisciplinas;
    });

    renderExplainers(filtered);
}

function checkPreco(preco, range) {
    const [min, max] = range.split('-').map(Number);
    return preco >= min && preco <= max;
}

// Eventos
[nomeInput, nivelSelect, precoSelect, localSelect, disciplinasSelect].forEach(el => {
    el.addEventListener('input', applyFilters);
});

window.onload = fetchExplainers;
window.addEventListener('DOMContentLoaded', () => {
    fetchExplainers();
});

