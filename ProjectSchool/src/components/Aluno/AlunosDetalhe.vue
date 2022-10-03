<template>
  <div v-if="!loading">
    <TituloComponent :titulo="`Aluno: ${aluno.nome}`" :btnVoltar="!visualizando" >
      <button v-show="visualizando" class="btn btnEditar" @click="editar()">Editar</button>
    </TituloComponent>

    <table>
      <tbody>
        <tr>
          <td class="colPequeno">Matrícula:</td>
          <td>
            <label>{{aluno.id}}</label>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Nome:</td>
          <td>
            <label v-if="visualizando">{{aluno.nome}}</label>
            <input v-else v-model="aluno.nome" type="text">
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Data Nascimento:</td>
          <td>
            <label v-if="visualizando">{{aluno.dataNasc}}</label>
            <input v-else v-model="aluno.dataNasc" type="date">
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Professor:</td>
          <td>
            <label v-if="visualizando">{{aluno.professor.nome}}</label>
            <select v-else v-model="aluno.professor.id">
              <option
                v-for="(professor, index) in professores"
                :key="index"
                v-bind:value="professor.id"
              >{{professor.nome}}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

     <div style="margin-top: 10px">
      <div v-if="!visualizando">
        <button class="btn btnSalvar" @click="salvar(aluno)">Salvar</button>
        <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>
      </div>
    </div>

  </div>
</template>

<script>
import TituloComponent from '../_share/Titulo.vue'

export default {
  name: 'AlunoDetalheComponent',
  components: {
    TituloComponent
  },
  data() {
    return{
      aluno: {},
      professores: [],
      idAluno: this.$route.params.id,
      visualizando: true,
      loading: true
    }
  },
  created(){
      this.carregarProfessor()
  },
  methods: {
    carregarProfessor() {
      this.$http
        .get("http://localhost:3000/professores")
        .then(res => res.json())
        .then(professor => {
          this.professores = professor;
          this.carregarAluno();
        });
    },
    carregarAluno() {
      this.$http
        .get(`http://localhost:3000/alunos/${this.idAluno}`)
        .then(res => res.json())
        .then(aluno => {
          this.aluno = aluno;
          this.loading = false;
        });
    },
     editar() {
      this.visualizando = !this.visualizando;
    },
    salvar(_aluno) {
      console.log(_aluno)
      console.log(this.aluno)
      let _alunoEditar = {
        id: _aluno.id,
        nome: _aluno.nome,
        dataNasc: _aluno.dataNasc,
        //professorid: _aluno.professor.id
        professor: _aluno.professor
      };
      this.$http
        .put(`http://localhost:3000/alunos/${_alunoEditar.id}`, _alunoEditar)
        .then(res => res.json())
        .then(aluno => this.aluno = aluno)
        .then(() => this.visualizando = true);
      this.visualizando = !this.visualizando;
    },
    cancelar() {
      this.visualizando = !this.visualizando;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnEditar {
  float: right;
  background-color: rgb(76, 186, 249);
}
.btnSalvar {
  float: right;
  background-color: rgb(79, 196, 68);
}
.btnCancelar {
  float: left;
  background-color: rgb(249, 186, 92);
}
.colPequeno {
  width: 20%;
}
input,
select {
  margin: 0px;
  padding: 5px 10px;
  font-size: 0.9em;
  font-family: Montserrat;
  border-radius: 5px;
  border: 1px solid silver;
  background-color: rgb(245, 245, 245);
  width: 95%;
}
select {
  height: 38px;
  width: 100%;
}
</style>
