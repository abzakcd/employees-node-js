let raw_data=[];


async function getList() {
    let response = await fetch('/list');
// console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    raw_data = data;
    console.log(raw_data);
    CreateTble();
}

function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id});">edit</button></td>`;
        str+="<td>"+line.FirstName+"</td>";
        str+="<td>"+line.LastName+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">delete</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}

async function deleteLine(id) {
    let objToServer={};
    objToServer.id=id;
    console.log(objToServer);

    let response = await fetch('/Del', {
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

async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    console.log(objToServer.id);
    objToServer.FirstName=document.getElementById("FirstName").value;
    objToServer.LastName=document.getElementById("LastName").value;

    let response = await fetch('/Edit', {
            method: 'post',
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