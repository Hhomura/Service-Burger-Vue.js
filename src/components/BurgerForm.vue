<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div>
      <form action="" id="burger-form" @submit="createBurger($event)">
        <div class="input-container">
          <label for="nome">Nome do Cliente</label>
          <input
            type="text"
            name="nome"
            id="nome"
            v-model="nome"
            placeholder="digite seu nome Aqui"
          />
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão: </label>
          <select name="pao" id="pao" v-model="pao">
            <option value="">Selecione seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Escolha a carne do seu Burger: </label>
          <select name="carne" id="carne" v-model="carne">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais"
            >Selecione os opcionais:
          </label>

          <div
            class="checkbox-container"
            v-for="opcional in opcionaisdata"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="opcionais"
              id="opcionais"
              :value="opcional.tipo"
              v-model="opcionais"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burger" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import Message from './Message.vue';

let opcionaisdata: Array<{ id: number; tipo: string }>;
let paes: Array<{ id: number; tipo: string }>;
let carnes: Array<{ id: number; tipo: string }>;

export default {
    name: "BurgerForm",
    components:{Message},
    data() {
        return {
            paes,
            carnes,
            opcionaisdata,
            nome: null,
            carne: null,
            pao: null,
            opcionais: [],
            msg: "",
        };
    },
    methods: {
        async getIngredients() {
            const req = await fetch("http://localhost:3000/ingredientes");
            const data = await req.json();
            console.log(data);
            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisdata = data.opcionais;
        },
        async createBurger(e: any) {
            e.preventDefault();
            console.log("Criou burger");
            const data = {
                nome: this.nome,
                carne: this.carne,
                pao: this.pao,
                opcionais: Array.from(this.opcionais),
                status: "Solicitado",
            };
            const dataJson = JSON.stringify(data);
            console.log("Data: " + dataJson);
            const req = await fetch("http://localhost:3000/Burgers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            const res = await req.json();
            console.log(res);
            //mensagem de sistema

            this.msg = `Pedido Realizado: ${res.id}`

            setTimeout(() =>{
              this.msg = ""
            }, 2000);

            //limpar campos
            this.nome = null,
                this.pao = null,
                this.opcionais = [],
                this.carne = null;
        },
    },
    mounted() {
        this.getIngredients();
    },
};
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid yellow;
}

input,
select {
  padding: 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: black;
  color: yellow;
  font-weight: bold;
  border: 2px solid black;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  margin-left: 11px;
  border-radius: 12px;
}

.submit-btn:hover {
  background-color: transparent;
  color: gray;
}
</style>