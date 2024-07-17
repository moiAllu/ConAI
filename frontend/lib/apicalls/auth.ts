// "use client";
// export default function auth(url:string,data:any,method:string){
//     return fetch(`http://localhost:8000/api${url}`,{
//         method:data? method:"GET",
//         credentials:"include",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify(data),
//     }).then(res=>{
//         return res.json();
//     })
// }