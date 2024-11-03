// document.getElementById("donorForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form submission

//     const name = document.getElementById("name").value;
//     const age = document.getElementById("age").value;
//     const organ = document.getElementById("organ").value;

//     // Simulating Blockchain Registration
//     const donorData = {
//         name: name,
//         age: age,
//         organ: organ,
//         registrationTime: new Date().toLocaleString()
//     };

//     // Display a confirmation message (In actual blockchain system, this would involve sending to a smart contract)
//     document.getElementById("output").innerHTML = `
//         <p>Donor Registered Successfully:</p>
//         <ul>
//             <li><strong>Name:</strong> ${donorData.name}</li>
//             <li><strong>Age:</strong> ${donorData.age}</li>
//             <li><strong>Organ:</strong> ${donorData.organ}</li>
//             <li><strong>Registered On:</strong> ${donorData.registrationTime}</li>
//         </ul>
//     `;

//     // Here, you would send the data to the blockchain using web3.js or another blockchain library
// });

var DiamSdk = require("diamnet-sdk");

// create a completely new and unique pair of keys
const pair = DiamSdk.Keypair.random();

pair.secret();
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
console.log(pair.publicKey())
// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB