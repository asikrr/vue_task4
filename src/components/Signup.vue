<template>
  <div class="register-container">
    <router-link to="/">&lt Назад</router-link>
    <form @submit.prevent="submitRegister" class="register-form">
      <h1>Регистрация</h1>
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="form-field">
        <label>ФИО</label>
        <input v-model="form.fio" type="text" placeholder="Иванов Иван Иванович" required />
      </div>
      <div class="form-field">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="example@gmail.com" required />
      </div>
      <div class="form-field">
        <label>Пароль</label>
        <input v-model="form.password" type="password" placeholder="Минимум 6 символов" required />
      </div>
      <hr />
      <button type="submit">Создать аккаунт</button>
    </form>
    <div>
      Есть аккаунт? <router-link to="/login">Войти</router-link>
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
    }

    button:hover {
        transform: scale(1.05);
        transition: 0.3s;
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
      color: #b63c3c;
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
      isLoading: false,
      error: ''
    };
  },
  methods: {
    async submitRegister() {
      this.isLoading = true;
      this.error = '';

      try {
        await this.$store.dispatch('REGISTER', this.form);
        this.$router.push('/'); 
      } catch (err) {
        console.error(err);
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>