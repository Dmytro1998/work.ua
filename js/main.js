
import {linkToTheServer} from './links.js'

 
//  document.getElementById('company_name').value,
//  document.getElementById('description').value,
//  document.getElementById('salary').value,

document.addEventListener('DOMContentLoaded', function(){
    renderJobs();
    document.getElementById("add").addEventListener("click", function(event){
        event.preventDefault();
     this.createJob()
    })
});


let jobList = document.getElementById("job-list")


async function renderJobs (){

    jobList.innerHTML = "";
    const jobsData = await fetch(linkToTheServer);
    
    let jobs = await jobsData.json();
    jobs.forEach((job)=>{
        // let jobBlock = document.createElement("p");
        let removeButton = document.createElement("button");
        removeButton.addEventListener("click",removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id)
        removeButton.setAttribute("class","remove" )

        let editButton = document.createElement("button");
        editButton.addEventListener("click",removeJob);
        editButton.textContent = "Edit";
        editButton.setAttribute("class","edit" )

        // jobBlock.textContent = 
        // `Name: ${job.title};company name: ${job.companyName}; 
        //  description: ${job.description};  
        //  salary: ${job.salary}`
        let container =  document.createElement("div");
        container.setAttribute('id',job.id)
     



        let nameBlock = document.createElement("input");
        nameBlock.classList.add('name');
        nameBlock.classList.add('block');
        nameBlock.value = `${job.title}`

        let companyBlock = document.createElement("input");
        companyBlock.classList.add('salary');
        companyBlock.classList.add('block');
        companyBlock.value = `${job.companyName}`

        let salaryBlock = document.createElement("input");
        salaryBlock.classList.add('company');
        salaryBlock.classList.add('block');
        salaryBlock.value = `${job.salary}`

        let descriptionBlock = document.createElement("input");
        descriptionBlock.classList.add('description');
        descriptionBlock.classList.add('block');
        descriptionBlock.value = `${job.description}`

        jobList.appendChild(container);
        container.appendChild(nameBlock);
        container.appendChild(companyBlock);
        container.appendChild(salaryBlock);
        container.appendChild(descriptionBlock);
        container.appendChild(removeButton);
        container.appendChild(editButton);
      })

}
// async function editJob(){
//     const jobsData = await fetch(`${linkToTheServer}`);
//     let jobs = await jobsData.json();
//     let currentJob = this.parentNode.id;

//     let firstElement = this.parentNode.firstChild;
//     let secondElement = firstElement.nextElementSibling;
//     let thirdElement = secondElement.nextElementSibling;
    

//     let newValue = this.parentNode.firstChild.value;
//      let newCompany = firstElement.nextElementSibling.value;
//      let newSalary = secondElement.nextElementSibling.value;
//      let newDescription = thirdElement.nextElementSibling.value;



// }

async function createJob(){
    let job = {
      title: document.getElementById('title').value,
      companyName: document.getElementById('company_name').value,
      description: document.getElementById('description').value,
      salary: document.getElementById('salary').value,

    };
  


 let response = await fetch(linkToTheServer, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(job)
    });
    let result = await response.json();
    
    renderJobs();
}

async function removeJob(){
    let response = await fetch(`https://61322b39ab7b1e001799b39b.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    renderJobs()
   
}

