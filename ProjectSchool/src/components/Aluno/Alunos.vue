<template>
  <div class="hello">
    <TituloComponent :titulo="professorid != undefined ? `Professor: ${professor.nome}` : 'Alunos'" />
    <div v-if="professorid != undefined">
      <input placeholder="Nome do Aluno" v-model="nome" @keyup.enter="addAluno" />
      <button class="btn btnInput" @click="addAluno">Adicionar</button>
    </div>

    <table style="padding-top:15px">
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td>{{aluno.id}}</td>
          <router-link :to="`aluno/${aluno.id}`" tag="td"  style="cursor:pointer">
            {{aluno.nome}}
          </router-link>
          <td>
            <button class="btn btn_Danger" @click="remover(aluno)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>Nenhum aluno encontrado</tfoot>
    </table>
  </div>
</template>

<script>

import TituloComponent from '../_share/Titulo.vue'

export default {
  name: 'AlunosComponent',
  components: {
    TituloComponent
  },
  data() {
    return{
      nome: '',
      alunos: [],
      professor: {},
      professorid: this.$route.params.professor_id
    }
  },
  created(){
    if(this.professorid){
      this.carregarProfessor()

       this.$http.get("http://localhost:3000/alunos?professor.id=" + this.professorid)
      .then(res => res.json())
      .then(alunos => this.alunos = alunos)
    }else{
      this.$http.get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos => this.alunos = alunos)
    }
  },
  methods: {
    remover(aluno){
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`, aluno)
      .then(() => {
        let indice = this.alunos.indexOf(aluno)
        this.alunos.splice(indice, 1)
      })
    },
    addAluno() {
      if(this.nome == "")
        return

      var aluno = {
        nome: this.nome,
        professor: {
          id: this.professor.id,
          nome: this.professor.nome
        }
      }

      this.$http.post("http://localhost:3000/alunos", aluno)
        .then(res => res.json())
        .then(aluno => {
          this.alunos.push(aluno)
          this.nome = ""
        })
    },
    carregarProfessor(){
      this.$http.get("http://localhost:3000/professores/" + this.professorid)
      .then(res => res.json())
      .then(professor => {
        this.professor = professor
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 input {
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}
.btnInput {
  width: 150px;
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116, 115, 115);
}
.btnInput:hover {
  padding: 20x;
  margin: 0px;
  border: 0px;
}
</style>
