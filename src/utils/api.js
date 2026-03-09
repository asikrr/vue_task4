const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
    fetch (`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    })    
        .then((response) => response.json())
        .then((result) => resolve(result.data.user_token))
        .catch((error) => {
            reject(error);
        });
    });
};

export const logoutRequest = async (token) => {
    const response = await fetch(`${API}/logout`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    const result = await response.json();
    return result.data;
};