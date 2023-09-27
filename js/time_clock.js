let raw_data=[];

getList();
async function getList() {
    let response = await fetch('time_clock/list');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
}

function CreateTble(){
    let str="";
    for(let line of raw_data){
       str+=`<option>${line.FirstName}  ${line.LastName}</option>`;

    }
    document.getElementById("employeeSelect").innerHTML=str;
}

async function deleteLine(id) {
    let objToServer={};
    objToServer.id=id;
    console.log(objToServer);

    let response = await fetch('time_clock/Del', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    // let data = await response.json();
    // console.log(data);
    getList();
}



async function timestart() {
    let objToServer={};
    objToServer.fullname=document.getElementById("employeeSelect").value;
    console.log(objToServer.fullname);
    const d = new Date();
    let time = d.toLocaleTimeString(); // This returns a time string like "hh:mm:ss AM/PM"
    const date = new Date();
    let text = d.toLocaleDateString();
    objToServer.times=time;
    objToServer.date=date;
    console.log(objToServer.times);
    let response = await fetch('time_clock/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}


async function timeEnd() {
    let objToServer={};
    objToServer.fullname=document.getElementById("employeeSelect").value;
    console.log(objToServer.fullname);
    const d = new Date();
    let time = d.toLocaleTimeString(); // This returns a time string like "hh:mm:ss AM/PM"
    const date = new Date();
    let text = d.toLocaleDateString();
    objToServer.times=time;
    objToServer.date=date;
    console.log(objToServer.times);
    let response = await fetch('time_clock/End', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    getList();
}