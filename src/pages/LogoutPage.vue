<script>
import { api } from '../axios-instance';

export default {
  async beforeMount() {
    const { data } = await api.get('/auth/logout')

    this.$router.replace('/')
  }
}
</script>