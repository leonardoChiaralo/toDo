const taskList = document.getElementById("taskList");
const addTask = document.getElementById("addTask");
const addContainer = document.getElementById("addContainer");

addContainer.style.display = "none";

//Função p/ abrir a tela de add task
function openAdd() {
  if (addContainer.style.display == "none") {
    addContainer.style.display = "block";
  } else {
    addContainer.style.display = "none";
  }
}

//Função p/ cancelar a adição de task
function cancelTask() {
  addTask.value = "";

  if (addContainer.style.display == "block") {
    addContainer.style.display = "none";
  } else {
    addContainer.style.display = "block";
  }
}

//Função para listar as tasks na tela e criar botão p/ excluir
async function fetchData() {
  try {
    const response = await fetch("/list");
    const data = await response.json();

    data.forEach((tasks) => {
      const task = document.createElement("li");
      const button = document.createElement("button");

      //Função para remover task através do botão
      button.addEventListener("click", async () => {
        try {
          await fetch(`/list/${tasks._id}`, {
            method: "DELETE",
          });
          taskList.remove();
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      });

      task.textContent = tasks.content;
      task.id = tasks._id;
      taskList.appendChild(task);

      button.textContent = "X";
      task.appendChild(button);
    });
  } catch (error) {
    console.error(error);
  }
}

window.onload = fetchData;
