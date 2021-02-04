<script>
import api from '@/api'; 

export default {
  name: 'ContactForm',
  props: {
    data: Object
  },
  data() {
    return {
      isSending: false,
      showSendSuccess: false,
      showSendError: false,
      formData: {}
    }
  },
  mounted() {
    this.$refs.form.addEventListener('submit', this.onFormSubmit);
  },
  beforeDestroy() {
    this.$refs.form.removeEventListener('submit', this.onFormSubmit);
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      this.isSending = true;

      let data = {
        post_id: this.data.email_to.post_id,
        parent: this.data.email_to.parent,
        key: this.data.email_to.key,
        fields: { ...this.formData }
      };

      api.postContactForm(data, (response) => {
        this.isSending = false;
        if (response.status === 200) {
          this.showSendSuccess = true;
        } else {
          this.showSendError = true;
        }
      });
      
    }
  },
  computed: {
    fields() {
      return this.data && this.data.fields ? this.data.fields : [];
    }
  }
}
</script>

<template>
  <div class="contact-form">
    <h2 class="contact-form__title" v-if="data.title">{{ data.title }}</h2>
    <form ref="form" class="contact-form__form" action="#" v-if="!showSendSuccess && !showSendError">
      <div class="contact-form__header"></div>
      <div class="contact-form__body">
        <div
          class="contact-form__element"
          v-for="field in fields"
          v-bind:key="field.label"
        >
          <label class="contact-form__control">
            <!-- label -->
            <span class="contact-form__label"
              >{{ field.label }}<span v-if="field.mandatory">*</span></span
            >
            <!-- input -->
            <input
              v-bind:name="field.label"
              v-bind:type="field.type"
              v-if="field.type !== 'textarea'"
              v-bind:required="field.mandatory"
              v-model="formData[field.label]"
            />
            <!-- textarea -->
            <textarea
              v-bind:name="field.label"
              v-else
              v-bind:required="field.mandatory"
            ></textarea>
          </label>
        </div>
      </div>
      <div class="contact-form__actions">
        <button class="contact-form__button">
          <span class="contact-form__button-label" v-if="!isSending">{{ data.button_label }}</span>
          <span class="contact-form__button-spinner" v-else>Senden...</span>
        </button>
      </div>
    </form>
    <div class="contact-form__messages" v-else>
      <p class="contact-form__message-success" v-if="showSendSuccess">
        {{ data.confirm_message }}
      </p>
      <p class="contact-form__message-success" v-if="showSendError">
        Beim Senden ist ein unerwarteter Fehler aufgetreten. Laden Sie die Seite neu und versuchen Sie es noch einmal.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.contact-form {
  margin-top: 6.4rem;
}

.contact-form__control {
  margin-top: 2rem;
}

.contact-form__actions {
  margin-top: 4rem;
}
</style>