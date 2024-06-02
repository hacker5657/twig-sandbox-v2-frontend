<template>
  <div class="wrapper">
    <Header :isAuthUser="isAuthUser"/>
    <main class="main">
      <div class="form">
        <div class="input-wrapper">
          <TextArea v-model="json" placeholder="Enter json" class="input"/>
          <Button @click="formatJson()" class="btn" v-tooltip="'format'" severity="secondary">
            <i class="pi pi-pencil"></i>
          </Button>
        </div>
        <TextArea v-model="template" placeholder="Enter twig template" class="textarea"/>
      </div>
      <div class="btns">
        <Button @click="setResultUrl()">Применить</Button>
        <Button v-if="isAuthUser" @click="visible = true">Сохранить</Button>
      </div>
      <iframe class="preview" :src="url" frameborder="0"></iframe>
    </main>
    <Dialog v-model:visible="visible" modal header="Сохранить" style="width: 360px;">
      <div class="modal-form">
        <InputText v-model="name" placeholder="Введите название"/>
        <Button @click="saveTemplate()" label="Сохранить" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button'
import TextArea from 'primevue/textarea'
import Header from '../components/Header.vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { api } from '../axios-instance'

export default {
  components: {
    Button,
    TextArea,
    Header,
    Dialog,
    InputText
  },
  data() {
    return {
      json: this.$store.state.json,
      template: this.$store.state.template,
      url: '',
      visible: false,
      name: '',
      isAuthUser: false
    }
  },
  methods: {
    formatJson() {
      this.json = JSON.stringify(JSON.parse(this.json), null, 4)
    },
    setResultUrl() {
      let newUrl = "http://localhost:8000/result?"

      this.$store.commit('setJsonValue', this.json)
      this.$store.commit('setTemplateValue', this.template)

      if (this.json != '' && this.template != '') {
        newUrl += `json=${this.json}&template=${this.template}`
      } else {
        newUrl += 'json={}&template='
      }

      this.url = newUrl
    },
    async saveTemplate() {
      if (this.name != '') {
        const { data } = await api.post('/templates/save', {
          name: this.name,
          json: this.json,
          template: this.template,
        })

        if (data.success) {
          this.visible = false
        }
      }
    }
  },
  async beforeMount() {
    const { data } = await api.get('/auth/check')

    if (data.success) {
      this.isAuthUser = true
    } else {
      this.isAuthUser = false
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main{
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 16px;
  flex: 1;
}
.form{
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.input-wrapper{
  flex: 1;
  height: 100%;
  position: relative;
}
.input{
  width: 100%;
  height: 100%;
  resize: none;
}
.textarea{
  flex: 1;
  height: 100%;
  resize: none;
}
.btns{
  display: flex;
  align-items: center;
  gap: 16px;
}
.btn{
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  right: 12px;
}
.preview {
  width: 100%;
  flex: 1;
  border: 1px solid var(--surface-300);
  border-radius: 8px;
}
.modal-form{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>