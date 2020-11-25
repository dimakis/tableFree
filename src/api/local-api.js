// export async const getUser = (id) => {
//     return fetch(
//         `http://localhost:3030/users/${id}`,
//          method: "POST /"
//     )


//     .then(res => res.json())
//     .then(json => json.userDetails);

// }

// export async const getUserDeets = id => {
//     try{
//         let res = await fetch(`http://localhost:3030/users/${id}`, 
//         {
//             method:"GET",
//             headers: {
//                 "Content-Type: application/json"
//             },
//             body: JSON.stringify({
//                 username: data.email,
//                 password: data.password
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }