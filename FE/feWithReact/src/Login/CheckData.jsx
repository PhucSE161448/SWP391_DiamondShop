// export function loginUser(userData) {
//     let BaseUrl = "https://663e59f4e1913c47679763a2.mockapi.io/people";
//     console.log("userData", userData);
//     return new Promise((resolve, reject) => {
//         fetch(BaseUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify(userData)
//         })
//             .then(response => response.json())
//             .then(responseJson => {
//                 resolve(responseJson);
//             })
//             .catch(error => {
//                 reject(error);
//             });
//     });
// }

export function validateUser(userData) {
    let BaseUrl = "https://663e59f4e1913c47679763a2.mockapi.io/people";
    return new Promise((resolve, reject) => {
        fetch(BaseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                // So sánh username và password với dữ liệu từ API
                const user = responseJson.find(user =>
                    user.username === userData.username && user.password === userData.password
                );
                resolve(user);
            })
            .catch(error => {
                reject(error);
            });
    });
}