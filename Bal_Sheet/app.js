                                            // Jquery //

// Save transaction in LocalStorage
let bal = 0;
$(document).ready(() => {
  let transactions = JSON.parse(localStorage.getItem("Transactions")) || [];
  transactions.forEach(function (item) {
    let debitVal = item.type === "debit" ? item.val : "";
    let creditVal = item.type === "credit" ? Math.abs(item.val) : "";
    bal = 0;

    $("#tab").append(`
            <tbody class= "tbody">
                <tr>
                    <th>${item.desc}</th>
                    <td>${debitVal}</td>
                    <td>${creditVal}</td>
                    <td>${item.bal}</td>
                </tr>
            </tbody>
        `);
    bal = item.bal;
  });
});

$("#myForm").on("submit", (e) => {
  e.preventDefault();
  let val = Number($("#input").val());
  let desc = $("#desc").val();

  if (val == 0 && desc == "") {
    Swal.fire({
      title: "Wrong!!",
      text: "Fill both values",
      icon: "error",
    });
  } else if (desc == "") {
    Swal.fire({
      title: "Wrong!!",
      text: "Fill description",
      icon: "error",
    });
  } else if (val == 0) {
    Swal.fire({
      title: "Wrong!!",
      text: "You cannot debit or credit 0 to balance sheet",
      icon: "error",
    });

    $("#input").val("");
  } else if (val != Number(val)) {
    Swal.fire({
      title: "Wrong!!",
      text: "You cannot add text in amount field",
      icon: "error",
    });
    $("#input").val("");
  } else if (val > 0) {
    bal += val;

    $("#tab").append(`
        <tbody class= "tbody">
            <tr class= "trow ">
                <th>${desc}</th>
                <td>${val}</td>
                <td></td>
                <td>${bal}</td>
            </tr>
        </tbody>
        `);

    saveTrans({ desc: desc, val: val, bal: bal, type: "debit" });

    $("#input").val("");
    $("#desc").val("");
  } else if (val < 0) {
    let amountToWithdraw = Math.abs(val);

    if (amountToWithdraw > bal) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Your Balance is ${bal} and value you want to credit is ${Math.abs(val)} which is greater and cannot be credited`,
      });
    } else {
      bal += val;

      $("#tab").append(`

                <tbody class= "tbody">
                     <tr>
                        <th>${desc}</th>
                        <td></td>
                        <td>${Math.abs(val)}</td>
                        <td>${bal}</td>
                    </tr>
                </tbody>
 
               
            `);

      saveTrans({ desc: desc, val: val, bal: bal, type: "credit" });
      $("#input").val("");
      $("#desc").val("");
    }
  }
});

function saveTrans(transObj) {
  let transactions = JSON.parse(localStorage.getItem("Transactions")) || [];
  transactions.push(transObj);
  localStorage.setItem("Transactions", JSON.stringify(transactions));
}

// Clear Btn //
$("#btn2").click(() => {
  localStorage.removeItem("Transactions");
  $(".tbody").empty();
  bal = 0;
});

// Export Btn //
const now = new Date();
const hrs = now.getHours();
const data = $("#tab").get(0);

$("#btn3").click(() => {
  const tab = document.querySelector("#tab");
  if (!tab || tab.querySelectorAll("Tbody tr").length == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your Table is Empty",
    });
    return;
  } else {
    const workSht = XLSX.utils.table_to_sheet(data);
    const workBk = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBk, workSht, "Balance_Sheet");
    XLSX.writeFile(workBk, `Balance_sheet${now.getMinutes()}.xlsx`);
  }
});

// Import Btn //
$("#importBtn").click(() => {
  $("#importFile").click();
});

$("#importFile").on("change", (e) => {
  const file = e.target.files[0];
 
  if (!file) return;
  
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (ee) =>{
    try{
        const data = new Uint8Array(ee.target.result)  
        const workBk = XLSX.read(data , {type : 'array'});
        const fSheet = workBk.SheetNames[0];
        const workSheet = workBk.Sheets[fSheet]
        const jsonOut = XLSX.utils.sheet_to_json(workSheet,{header: 1})

        if (jsonOut.length <= 1){
            Swal.fire({
                icon:"error",
                title:"Oops...",
                text:"Your Table is Empty"
                });
            return;
        }

        for (let i = 0; i < jsonOut.length; i++) {
            const row = jsonOut[i]

            if(!row || row.length === 0) return;

            const desc = row[0] 
            const deb = row[1] 
            const cre = row[2] 
            let val = 0;
            let type = "";

            if (deb > 0 ) {
                val = deb;
                type = "debit"
                bal += val
            }else if(cre > 0){
                val = cre;
                type = "credit";
                bal += val
            }else continue;

            
            $('#tab').append(
                `<tbody class="tbody">
                         <tr>
                             <td>${desc}</td>
                             <td>${type === "debit" ? val : ""}</td>
                             <td>${type === "credit" ? Math.abs(val) : ""}</td>
                             <td>${bal}</td>
                         </tr>
                 </tbody>`
            )

            saveTrans({desc:desc , val:val , bal:bal , type:type })
            $("#importFile").val("");
            Swal.fire({
                title:"Success!",
                text:"Data imported successfully!",
                icon:"success"
            });

        }
      }catch(error){Swal.fire({
        title:"Error!!",
        text:"Data import fail!",
        icon:"error"
        });}

  }
});