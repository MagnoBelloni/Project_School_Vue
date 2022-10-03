import Vue from "vue";
import Router from "vue-router";
import AlunosComponent from "./components/Aluno/Alunos.vue";
import AlunosDetalheComponent from "./components/Aluno/AlunosDetalhe.vue";
import ProfessoresComponent from "./components/Professores/Professores.vue";
import SobreComponent from "./components/Sobre/Sobre.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      nome: "Professores",
      component: ProfessoresComponent,
    },
    {
      path: "/professores",
      nome: "Professores",
      component: ProfessoresComponent,
    },
    {
      path: "/alunos",
      nome: "Alunos",
      component: AlunosComponent,
    },
    {
      path: "/alunos/:professor_id",
      nome: "Alunos",
      component: AlunosComponent,
    },
    {
      path: "/aluno/:id",
      nome: "AlunoDetalhe",
      component: AlunosDetalheComponent,
    },
    {
      path: "/sobre",
      nome: "Sobre",
      component: SobreComponent,
    },
  ],
});
