<template>
    <div class="login-container">
        <router-link to="/">&lt Назад</router-link>
        <form class="login-form" @submit.prevent="login">
            <h1>Вход</h1>
            <div class="form-field">
                <label>Email</label>
                <input type="email" required v-model="email"/>
            </div>
            <div class="form-field">
                <label>Пароль</label>
                <input type="password" required v-model="password"/>
            </div>
            <hr />
            <button type="submit">Вход</button>
        </form>
        <div>
            Еще нет аккаунта? <router-link to="/signup">Зарегистрироваться</router-link>
        </div>
    </div>
</template>

<style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;     
        min-height: 80vh; 
        gap: 20px;
    }

    button {
        cursor: pointer;
        border: none;
        border-radius: 10px;
        padding: 10px 15px;
        background-color: #b5ce87;
    }

    button:hover {
        transform: scale(1.05);
        transition: 0.3s;
        background-color: #9cc54f;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 300px;
        padding: 40px 20px;
        border-radius: 20px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #b5ce87;
    }

    .login-form input {
        border-radius: 10px;
        padding: 10px 15px;
        border: 1px solid #b5ce87;
        background-color: #f5f7f3;
        outline: none;
    }

    .login-form input:focus {
        border: 1px solid #9cc54f;
        background-color: #fff;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    label {
      align-self: flex-start;
      padding-left: 7px;
    }

    hr {
        border: none;
        border-bottom: 1px solid #000;
        margin: 10px 0;
    }
</style>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            const userData = {
                email: this.email,
                password: this.password,
            };
            
            this.$store
                .dispatch('AUTH_REQUEST', userData)
                .then(() => this.$router.push("/"));
        },
    },
};
</script>