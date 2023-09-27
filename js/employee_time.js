let raw_data=[];
let raw_data2=[];
listmain();
getList();

;async function getList() {
    let response = await fetch('employee_time/list');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
}

;async function getList() {
    let response = await fetch('employee_time/list');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    CreateTble();
}

function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+=`<option>${line.fullname}</option>`;
    }
    document.getElementById("employeeSelect").innerHTML=str;
}



function listmain(){


    let str="";
    let fullname=document.getElementById("employeeSelect").value;

    for(let line of raw_data){
        const date = new Date(line.start);
        const dayOfWeek = date.getDay();
            const originalDate = new Date(line.start);
            const start = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
            const originalDate2 = new Date(line.end);
            const end = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
            str += "<tr>";
        str += "<td>" + daysOfWeek[dayOfWeek]+ "</td>";

        str += "<td>" + line.fullname + "</td>";
            str += "<td>" + start + "</td>";
            str += "<td>" + end + "</td>";

            str += "</tr>";

    }
    document.getElementById("mainTable").innerHTML=str;
    console.log(str);
}



// You can convert the number to the corresponding day name
let daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const originalDate = new Date(line.start);
const start = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;



function listEp(){
    let str="";
    let fullname=document.getElementById("employeeSelect").value;
    let x = 0;
    for(let line of raw_data){
        const date = new Date(line.start);
        const dayOfWeek = date.getDay();
        if (fullname == line.fullname) {
            x++
            const originalDate = new Date(line.start);
            const start = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
            const originalDate2 = new Date(line.end);
            const end = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
            str += "<tr>";
            str += "<td>" + daysOfWeek[dayOfWeek]+ "</td>";
            str += "<td>" + line.fullname + "</td>";
            str += "<td>" + start + "</td>";
            str += "<td>" + end + "</td>";

            str += "</tr>";
        }
    }
    document.getElementById("mainTable").innerHTML=str;
    document.getElementById("sumdays").innerHTML="סך הכל ימי עבודה"+" "+ x;
    console.log(str);
}





async function deleteLine(id) {
    let objToServer={};
    objToServer.id=id;
    console.log(objToServer);

    let response = await fetch('employee_time/Del', {
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
    let response = await fetch('employee_time/start', {
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
    let response = await fetch('employee_time/End', {
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


