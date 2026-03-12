<template>
    <div class="login-container">
        <router-link to="/">&lt; Назад в каталог</router-link>
        <form class="login-form" @submit.prevent="login">
            <h1>Вход</h1>

            <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </p>

            <div class="form-field">
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    v-model="email"
                    :class="{ 'input-error': hasError }"
                    @input="resetError"
                    placeholder="example@gmail.com" 
                />
            </div>
            <div class="form-field">
                <label>Пароль</label>
                <input 
                    type="password" 
                    required 
                    v-model="password"
                    :class="{ 'input-error': hasError }"
                    @input="resetError"
                />
            </div>
            <hr />
            <button type="submit" class="default-button">Вход</button>
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
        transition: border 0.3s;
    }

    .login-form input:focus {
        border: 1px solid #9cc54f;
        background-color: #fff;
    }

    .login-form input.input-error {
        border: 1px solid #d9534f;
        background-color: #fff6f6;
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
    
    .error-message {
        color: #d9534f;
        font-size: 0.9em;
        text-align: center;
        margin: 0;
        font-weight: bold;
    }
</style>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "", 
            hasError: false  
        };
    },
    methods: {
        login() {
            this.errorMessage = "";
            this.hasError = false;

            const userData = {
                email: this.email,
                password: this.password,
            };
            
            this.$store
                .dispatch('AUTH_REQUEST', userData)
                .then(() => {
                    this.$router.push("/");
                })
                .catch(err => {
                    console.error(err); 
                    this.hasError = true;
                    this.errorMessage = "Неверный Email или пароль";
                });
        },
        resetError() {
            if (this.hasError) {
                this.hasError = false;
                this.errorMessage = "";
            }
        }
    },
};
</script>