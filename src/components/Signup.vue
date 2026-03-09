<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    
    <form @submit.prevent="submitRegister" class="register-form">

      <div>
        <label>ФИО:</label>
        <input v-model="form.fio" type="text" placeholder="Иванов Иван Иванович" required />
      </div>

      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" placeholder="example@mail.ru" required />
      </div>

      <div>
        <label>Пароль:</label>
        <input v-model="form.password" type="password" placeholder="Придумайте пароль" required />
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>

      <button type="submit">Создать аккаунт</button>
      <div>
        Есть аккаунт? <router-link to="/login">Войти</router-link>
      </div>
    </form>
  </div>
</template>

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