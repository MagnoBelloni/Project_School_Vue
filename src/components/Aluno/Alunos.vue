<template>
  <div class="hello">
    <TituloComponent titulo="Alunos" />
    <input placeholder="Nome do Aluno" v-model="nome" @keyup.enter="addAluno" />
    <button class="btn btnInput" @click="addAluno">Adicionar</button>

    <table style="padding-top:15px">
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td>{{aluno.id}}</td>
          <td>{{aluno.nome}}</td>
          <td>
            <button class="btn" @click="remover(aluno)">Remover</button>
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
      alunos: []
    }
  },
  created(){
    this.$http.get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos => this.alunos = alunos)
  },
  props: {
    
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
        nome: this.nome
      }

      this.$http.post("http://localhost:3000/alunos", aluno)
        .then(res => res.json())
        .then(aluno => {
          this.alunos.push(aluno)
          this.nome = ""
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input{
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    color: #687f7f;
    display: inline;
  }

  .btnInput{
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    display: inline;
    background-color: rgb(116, 116, 116);
  }

  .btnInput:hover{
    padding: 20px;
    margin: 0px;
    border: 0px;
  }
</style>
