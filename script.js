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

const insertTableElektron = atoms => {
    const table = document.querySelector('#table-atoms');
    let html = ``;
    if (!table) {
        return;
    }

    atoms.forEach((atom, i) => {
        html += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td><sup>${atom.nomorMassa}</sup><sub>${atom.nomorAtom}</sub>${atom.simbol}</td>
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

const konversiTabelElektron = atoms => {
    const atomList = document.querySelector('#atoms-list');
    let html = ``;
    if (!atomList) {
        return;
    }

    atoms.forEach(atom => {
        html += `
        <li class="list-group-item"><sup>${atom.nomorAtom}</sup><sub>${atom.nomorMassa}</sub>${atom.simbol} | p = ${atom.nomorAtom} e = ${atom.nomorAtom} n = ${atom.nomorMassa - atom.nomorAtom} | ${atom.konfigurasiKulit} | ${konfigurasiSubKulit(atom.konfigurasiSubKulit)} | ${atom['bilanganKuantum'].join(', ')}</li>
        `;
    });

    atomList.innerHTML = html;
}

const insertTabelGol = atoms => {
    const tableBody = document.querySelector('#table-atoms-gol');
    let html = ``;
    if (!tableBody) {
        return;
    }

    atoms.forEach((atom, i) => {
        html += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td><sup>${atom['nomorMassa']}</sup><sub>${atom['nomorAtom']}</sub>${atom['simbol']}</td>
            <td>${konfigurasiSubKulit(atom['konfigurasiSubKulit'])}</td>
            <td>${atom['golongan']}</td>
            <td>${atom['periode']}</td>
        </tr>
        `;
    });

    tableBody.innerHTML = html;
}

const konversiTabelGol = atoms => {
    const atomsList = document.querySelector('#atoms-gol-list');
    let html = ``;
    if (!atomsList) {
        return;
    }

    atoms.forEach(atom => {
        html += `
        <li class="list-group-item"><sup>${atom['nomorMassa']}</sup><sub>${atom['nomorAtom']}</sub>${atom['simbol']} | ${atom.konfigurasiSubKulit} | ${atom.golongan} | ${atom.periode}</li>
        `;
    });

    atomsList.innerHTML = html;
}

const load = async () => {
    const atoms = await loadAtoms();
    insertTableElektron(atoms);
    insertTabelGol(atoms.filter(atom => atom.golongan));

    const atomModalBtn = document.querySelector('#atomModalBtn');
    atomModalBtn.addEventListener('click', function () {
        konversiTabelElektron(atoms);
        konversiTabelGol(atoms.filter(atom => atom.golongan));
    });

}

document.body.onload = load;