<template>
  <div class="hello">
    <TituloComponent titulo="Professores" />
    <table style="padding-top:15px">
      <thead>
        <th>Cód</th>
        <th>Nome</th>
        <th>Alunos</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="professores.length">
        <tr v-for="(professor, index) in professores" :key="index">
          <td>{{professor.id}}</td>
          <router-link 
            :to="`/alunos/${professor.id}`"
            tag="td"
            style="cursor:pointer"
          >
            {{professor.nome}}
          </router-link>
          <td>{{professor.qtdAlunos}}</td>
          <td>
            <button class="btn btn_Danger" @click="remover(professor)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>Nenhum professor encontrado</tfoot>
    </table>
  </div>
</template>

<script>

import TituloComponent from '../_share/Titulo.vue'

export default {
  name: 'ProfessoresComponent',
  components: {
    TituloComponent
  },
  data() {
    return{
      professores: [],
      alunos: []
    }
  },
  created(){
    this.$http.get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos => {
        this.alunos = alunos
        this.carregarProfessores()
      })
  },
  props: { },
  methods: {
    remover(professor){
      this.$http.delete(`http://localhost:3000/professores/${professor.id}`, professor)
      .then(() => {
        let indice = this.professores.indexOf(professor)
        this.professores.splice(indice, 1)
      })
    },
    addProfessor() {
      if(this.nome == "")
        return

      var professor = {
        nome: this.nome
      }

      this.$http.post("http://localhost:3000/professores", professor)
        .then(res => res.json())
        .then(professor => {
          this.professores.push(professor)
          this.nome = ""
        })
    },
    carregarProfessores(){
      this.$http.get("http://localhost:3000/professores")
      .then(res => res.json())
      .then(professores => {
        this.professores = professores
        this.pegarQuantidadeAlunosPorProfessor()
      })
    },
    pegarQuantidadeAlunosPorProfessor(){
      this.professores.forEach((professor, index) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.alunos.filter(aluno => aluno.professor.id == professor.id).length
        }

        this.professores[index] = professor
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .colPequeno {
  text-align: center;
  width: 15%;
}
</style>
