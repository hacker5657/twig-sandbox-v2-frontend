<template>
  <div class="wrapper">
    <Header :isAuthUser="true"/>
    <div class="main">
      <Card v-for="template in templates" style="width: 200px; height: max-content;position: relative;">
        <template #title>
          {{ template.name }}
        </template>
        <template #footer>
          <Button @click="loadTemplate(template)" style="width: 100%;" label="Load"/>
          <Button @click="deleteTemplate(template.id)" class="btn" severity="danger" outlined>
            <i class="pi pi-trash"></i>
          </Button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Card from 'primevue/card'
import Button from 'primevue/button'
import { api } from '../axios-instance';

export default {
  components: {
    Header,
    Card,
    Button
  },
  data() {
    return {
      templates: []
    }
  },
  methods: {
    loadTemplate(template) {
      this.$store.commit('setJsonValue', template.jsonValue)
      this.$store.commit('setTemplateValue', template.templateValue)
      this.$router.replace('/')
    },
    async deleteTemplate(id) {
      const { data } = await api.post('/templates/delete', {
        id: id
      })

      if (data.success) {
        this.templates = this.templates.filter((item) => item.id != id)
      }
    }
  },
  async beforeMount(){ 
    const { data } = await api.get('/auth/check')

    if (!data.success) {
      this.$router.replace('/')
    }

    const { data:templates } = await api.get('/templates')

    if (templates.success) {
      this.templates = templates.data
    }

  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main{
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  flex-wrap: wrap;
}
.btn{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
