<template>
  <div>
    <form>
      <formly-form :form="form" :model="model" :fields="fields"></formly-form>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFormly from 'vue-formly';
import VueFormlyQuasarFramework from 'vue-formly-quasar-framework';

Vue.use(VueFormly);
Vue.use(VueFormlyQuasarFramework);

export default {
  name: 'blza',
  // components: {
  //   VueFormly
  // },
  data(){
    return {
      form: {},
      model: {
        fname: '',
        lname: ''
      },
      fields: [
        {
          key: 'fname',
          type: 'input'
        },
        {
          key: 'lname',
          type: 'input'
        }

      ]
    }
  }
}
</script>
