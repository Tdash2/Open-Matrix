let matrix = null;

async function loadMatrix() {

    const response =
        await fetch('/api/matrix');

    matrix =
        await response.json();

    populateOutputs();
}

function populateOutputs() {

    const select =
        document.getElementById(
            'outputSelect');

    select.innerHTML = '';

    matrix.outputs.forEach(output => {

        const option =
            document.createElement(
                'option');

        option.value =
            output.number;

        option.textContent =
            `${output.number} - ${output.name}`;

        select.appendChild(option);
    });

    select.addEventListener(
        'change',
        () => loadOutput(
            select.value));

    if (matrix.outputs.length > 0)
    {
        loadOutput(
            matrix.outputs[0].number);
    }
}

async function loadOutput(output) {

    const response =
        await fetch(
            `/api/output/${output}`);

    const crosspoints =
        await response.json();

    renderCrosspoints(
        output,
        crosspoints);
}

function renderCrosspoints(
    output,
    crosspoints)
{
    const body =
        document.getElementById(
            'crosspoints');

    body.innerHTML = '';

    crosspoints.forEach(cp => {

        const row =
            document.createElement('tr');

        const inputCell =
            document.createElement('td');

        inputCell.textContent =
            `${cp.number} - ${cp.name}`;

        const stateCell =
            document.createElement('td');

        const checkbox =
            document.createElement('input');

        checkbox.type =
            'checkbox';

        checkbox.checked =
            cp.connected;

        checkbox.addEventListener(
            'change',
            async () =>
        {
            await fetch(
                '/api/crosspoint',
                {
                    method:'POST',

                    headers:
                    {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        input: cp.number,
                        output: parseInt(output),
                        connected:
                            checkbox.checked
                    })
                });
        });

        stateCell.appendChild(
            checkbox);

        row.appendChild(
            inputCell);

        row.appendChild(
            stateCell);

        body.appendChild(
            row);
    });
}

loadMatrix();