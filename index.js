const taskContainer = document.querySelector(".task_container");
let globalStorage = [];

const generateNewCard=(taskData)=>`<div class="col-md-6 col-lg-4" >
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success" ><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)" ><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
    </div>
    <div class="card-body">
        <img src=${taskData.imageUrl} class="card-img-top">
      <h5 class="card-title">${taskData.taskTittle}</h5>
      <p class="card-text">${taskData.taskDescription}</p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary float-end">Open Task</button>
    </div>
  </div>
</div>`;



const loadInitialCardData = () => {
    //local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky")

    //convert  from string to normal js object
    const {cards} = JSON.parse(getCardData);

    //loop over thoosr array of task objrct to creart html and inject it
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        //update our globalStorage
        globalStorage.push(cardObject);
    })

    

};
const saveChanges = () => {
    const taskData={
        id:`${Date.now()}`, //unqiue number everusecond for id
        imageUrl: document.getElementById("imageurl").value,
        taskTittle:document.getElementById("tasktittle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };
   


taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
globalStorage.push(taskData);
localStorage.setItem("tasky",JSON.stringify({cards:globalStorage}));
};

const deleteCard = (event) =>{
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagName = event.target.tagname;//this checks what tag and givess out put in CAPS
    //match the id of the element with id inside the globatStore
    globalStorage = globalStorage.filter((cardObject)=>cardObject.id != targetID)
    //if match found remove

    localStorage.setItem("tasky",JSON.stringify({cards:globalStorage}));//updating localstorage again so that card do no comeback after delting


    if(tagName === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
   // task_container.removeChild(getElementById(targetID));
};