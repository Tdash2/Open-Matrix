async function loadLabels() {
    const response =
        await fetch('/api/labels');

    const data =
        await response.json();

    renderOutputs(data.outputs);
    renderInputs(data.inputs);
}

function renderOutputs(outputs) {
    const body =
        document.getElementById('outputs');

    body.innerHTML = '';

    outputs.forEach(o => {
        const row =
            document.createElement('tr');

        row.innerHTML = `
            <td>${o.number}</td>
            <td>
                <input
                    id="out-${o.number}"
                    value="${o.name}">
            </td>
        `;

        const input =
            row.querySelector('input');

        input.addEventListener(
            'blur',
            () => saveOutput(o.number)
        );

        body.appendChild(row);
    });
}

function renderInputs(inputs) {
    const body =
        document.getElementById('inputs');

    body.innerHTML = '';

    inputs.forEach(i => {
        const row =
            document.createElement('tr');

        row.innerHTML = `
            <td>${i.number}</td>
            <td>
                <input
                    id="in-${i.number}"
                    value="${i.name}">
            </td>
        `;

        const input =
            row.querySelector('input');

        input.addEventListener(
            'blur',
            () => saveInput(i.number)
        );

        body.appendChild(row);
    });
}

async function saveOutput(number) {
    const el =
        document.getElementById(`out-${number}`);

    await fetch('/api/outputlabel',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name: el.value
            })
        });
}

async function saveInput(number) {
    const el =
        document.getElementById(`in-${number}`);

    await fetch('/api/inputlabel',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name: el.value
            })
        });
}

loadLabels();