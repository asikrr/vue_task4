<template>
  <div class="register-container">
    <router-link to="/">&lt; Назад в каталог</router-link>
    <form @submit.prevent="submitRegister" class="register-form">
      <h1>Регистрация</h1>
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="form-field">
        <label>ФИО</label>
        <input 
            v-model="form.fio" 
            type="text" 
            placeholder="Иванов Иван Иванович" 
            :class="{ 'input-error': fieldErrors.fio }"
            @input="fieldErrors.fio = false"
        />
      </div>
      <div class="form-field">
        <label>Email</label>
        <input 
            v-model="form.email" 
            type="email" 
            placeholder="example@gmail.com" 
            :class="{ 'input-error': fieldErrors.email }"
            @input="fieldErrors.email = false"
        />
      </div>
      <div class="form-field">
        <label>Пароль</label>
        <input 
            v-model="form.password" 
            type="password" 
            placeholder="Минимум 6 символов" 
            :class="{ 'input-error': fieldErrors.password }"
            @input="fieldErrors.password = false"
        />
      </div>
      <hr />
      <button type="submit">Создать аккаунт</button>
    </form>
    <div>
      Уже есть аккаунт? <router-link to="/login">Войти</router-link>
    </div>
  </div>
</template>

<style scoped>
    .register-container {
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
        transition: 0.3s;
    }

    button:hover {
        transform: scale(1.05);
        background-color: #9cc54f;
    }

    .register-form {
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

    .register-form input {
        border-radius: 10px;
        padding: 10px 15px;
        border: 1px solid #b5ce87;
        background-color: #f5f7f3;
        outline: none;
    }

    .register-form input:focus {
        border: 1px solid #9cc54f;
        background-color: #fff;
    }

    .register-form input.input-error {
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
      text-align: center;
    }
</style>

<script>
export default {
  name: 'SignupComponent',
  data() {
    return {
      form: {
        fio: '',
        email: '',
        password: ''
      },
      fieldErrors: {
        fio: false,
        email: false,
        password: false
      },
      error: ''
    };
  },
  methods: {
    async submitRegister() {
        this.error = '';
        this.fieldErrors = { fio: false, email: false, password: false };
        
        const errorsList = [];

        if (!this.form.fio.trim()) {
            this.fieldErrors.fio = true;
            errorsList.push('Введите ФИО');
        }

        if (!this.form.password || this.form.password.length < 6) {
            this.fieldErrors.password = true;
            errorsList.push('Пароль должен быть не менее 6 символов');
        }

        if (errorsList.length > 0) {
            this.error = errorsList.join(', ');
            return;
        }

        try {
            await this.$store.dispatch('REGISTER', this.form);
            this.$router.push('/login');
        } 
        catch (err) {
            console.error(err);
            this.fieldErrors.email = true; 
            this.error = 'Пользователь с таким Email уже существует';
        }
    }
  }
};
</script>