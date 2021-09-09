
import {linkToTheServer} from './links.js'


document.addEventListener('DOMContentLoaded', function(){
    renderJobs();
    document.getElementById("add").addEventListener("click", function(event){
      event.preventDefault();
      createJob()
    })
});

let jobList = document.getElementById("job-list")

async function renderJobs (){
    jobList.innerHTML = "";
    const jobsData = await fetch(linkToTheServer);
    
    let jobs = await jobsData.json();
    jobs.forEach((job)=>{
        let jobBlock = document.createElement("p");
        let removeButton = document.createElement("button");
        removeButton.addEventListener("click",removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id)
        removeButton.setAttribute("class","remove" )

        jobBlock.textContent = 
        `Name: ${job.title};company name: ${job.companyName}; 
         description: ${job.description};  
         salary: ${job.salary}`
        let container =  document.createElement("div");
        jobList.appendChild(container);
        container.appendChild(jobBlock);
        container.appendChild(removeButton);
      })

}

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
    console.log(response)
    renderJobs();
}

async function removeJob(){
    let response = await fetch(`https://61322b39ab7b1e001799b39b.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    renderJobs()
   
}

