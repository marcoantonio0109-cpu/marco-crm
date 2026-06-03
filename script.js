let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const tabela = document.getElementById("clientTable");

const totalClientes = document.getElementById("totalClientes");
const totalLeads = document.getElementById("totalLeads");
const totalFechados = document.getElementById("totalFechados");

const btn = document.getElementById("addClientBtn");

const modal = document.getElementById("modal");

const salvarBtn = document.getElementById("salvarCliente");
let chart;
const leadColumn =
document.getElementById("leadColumn");

const contatoColumn =
document.getElementById("contatoColumn");

const propostaColumn =
document.getElementById("propostaColumn");

const fechadoColumn =
document.getElementById("fechadoColumn");
function salvarClientes() {

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );
}

function atualizarDashboard() {

    totalClientes.textContent =
        clientes.length;

    totalLeads.textContent =
        clientes.filter(
            cliente =>
            cliente.status === "Lead"
        ).length;

    totalFechados.textContent =
        clientes.filter(
            cliente =>
            cliente.status === "Fechado"
        ).length;
}function atualizarGrafico() {

    const leads =
        clientes.filter(c => c.status === "Lead").length;

    const contatos =
        clientes.filter(c => c.status === "Contato").length;

    const propostas =
        clientes.filter(c => c.status === "Proposta").length;

    const fechados =
        clientes.filter(c => c.status === "Fechado").length;

    const ctx =
        document.getElementById("crmChart");

    if(chart){

        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Lead",
                "Contato",
                "Proposta",
                "Fechado"

            ],

            datasets: [{

                data: [

                    leads,
                    contatos,
                    propostas,
                    fechados

                ]

            }]

        }

    });
}
function renderizarKanban(){

    leadColumn.innerHTML="";
    contatoColumn.innerHTML="";
    propostaColumn.innerHTML="";
    fechadoColumn.innerHTML="";

    clientes.forEach(cliente => {

        const card = `

        <div class="kanban-card">

            <strong>${cliente.nome}</strong>

            <br>

            ${cliente.telefone}

        </div>

        `;

        if(cliente.status === "Lead"){

            leadColumn.innerHTML += card;
        }

        else if(cliente.status === "Contato"){

            contatoColumn.innerHTML += card;
        }

        else if(cliente.status === "Proposta"){

            propostaColumn.innerHTML += card;
        }

        else if(cliente.status === "Fechado"){

            fechadoColumn.innerHTML += card;
        }

    });
}

function renderizarClientes() {

    tabela.innerHTML = "";

    clientes.forEach((cliente, index) => {

        tabela.innerHTML += `

        <tr>

            <td>${cliente.nome}</td>

            <td>${cliente.telefone}</td>

            <td>${cliente.status}</td>

            <td>

                <button onclick="alterarStatus(${index})">
                    Status
                </button>

                <button onclick="excluirCliente(${index})">
                    Excluir
                </button>

            </td>

        </tr>

        `;
    });

   atualizarDashboard();

atualizarGrafico();

renderizarKanban();

salvarClientes();
}

btn.addEventListener("click", () => {

    modal.classList.add("show");

});

salvarBtn.addEventListener("click", () => {

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    if (!nome || !telefone) {

        alert("Preencha todos os campos");

        return;
    }

    clientes.push({

        nome,
        telefone,
        status: "Lead"

    });

    renderizarClientes();

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";

    modal.classList.remove("show");

});

function excluirCliente(index) {

    const confirmar = confirm(
        "Deseja excluir este cliente?"
    );

    if (confirmar) {

        clientes.splice(index, 1);

        renderizarClientes();
    }
}

function alterarStatus(index) {

    const statusAtual =
        clientes[index].status;

    if (statusAtual === "Lead") {

        clientes[index].status =
            "Contato";

    } else if (
        statusAtual === "Contato"
    ) {

        clientes[index].status =
            "Proposta";

    } else if (
        statusAtual === "Proposta"
    ) {

        clientes[index].status =
            "Fechado";

    } else {

        clientes[index].status =
            "Lead";
    }

    renderizarClientes();
}

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("show");
    }

});

renderizarClientes();