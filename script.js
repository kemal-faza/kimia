const loadAtoms = () => {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json);
}

const konfigurasiSubKulit = subkulit => {
    return subkulit.split(' ').map(subKulit => {
        if (subKulit.includes('^')) {
            subKulit = subKulit.split('^');
            subKulit = `${subKulit[0]}<sup>${subKulit[1]}</sup>`;
        }
        return subKulit;
    }).join(' ');
}

const insertTable = atoms => {
    const table = document.querySelector('#table-atoms');
    let html = ``;

    atoms.forEach((atom, i) => {
        html += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td><sup>${atom.nomorAtom}</sup><sub>${atom.nomorMassa}</sub>${atom.simbol}</td>
            <td>${atom.nomorAtom}</td>
            <td>${atom.nomorAtom}</td>
            <td>${atom.nomorMassa - atom.nomorAtom}</td>
            <td>${atom.konfigurasiKulit}</td>
            <td>${konfigurasiSubKulit(atom.konfigurasiSubKulit)}</td>
            <td>${atom['bilanganKuantum'].join(', ')}</td>
        </tr>
        `;
    });

    table.innerHTML = html;
}

const konversiTabel = atoms => {
    const atomList = document.querySelector('#atoms-list');
    let html = ``;

    atoms.forEach((atom, i) => {
        html += `
        <li class="list-group-item"><sup>${atom.nomorAtom}</sup><sub>${atom.nomorMassa}</sub>${atom.simbol} | p = ${atom.nomorAtom} e = ${atom.nomorAtom} n = ${atom.nomorMassa - atom.nomorAtom} | ${atom.konfigurasiKulit} | ${konfigurasiSubKulit(atom.konfigurasiSubKulit)} | ${atom['bilanganKuantum'].join(', ')}</li>
        `;
    });

    atomList.innerHTML = html;
}

const load = async () => {
    const atoms = await loadAtoms();
    insertTable(atoms);

    const atomModalBtn = document.querySelector('#atomModalBtn');
    atomModalBtn.addEventListener('click', function () {
        konversiTabel(atoms);
    })
}

document.body.onload = load;