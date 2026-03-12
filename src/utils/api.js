const API = process.env.VUE_APP_API;

const getToken = () => localStorage.getItem('myAppToken');

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
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

export const registerRequest = async (userData) => {
    const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
    }

    const result = await response.json();
    return result.data.user_token;
};

export const getProductsRequest = async () => {
    const response = await fetch(`${API}/products`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Не удалось загрузить товары');
    }

    const result = await response.json();
    return result.data;
};

export const getCartRequest = async () => {
    const token = getToken();
    const response = await fetch(`${API}/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка загрузки корзины');
    }

    const result = await response.json();
    return result.data;
};

export const addToCartRequest = async (productId) => {
    const token = getToken();
    const response = await fetch(`${API}/cart/${productId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка добавления в корзину');
    }

    const result = await response.json();
    return result.data;
};

export const removeFromCartRequest = async (itemId) => {
    const token = getToken();
    const response = await fetch(`${API}/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка удаления из корзины');
    }

    const result = await response.json();
    return result.data;
};

export const createOrderRequest = async () => {
    const token = getToken();
    const response = await fetch(`${API}/order`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка оформления заказа');
    }

    const result = await response.json();
    return result.data;
};

export const getOrdersRequest = async () => {
    const token = getToken();
    const response = await fetch(`${API}/order`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка загрузки заказов');
    }

    const result = await response.json();
    return result.data;
};