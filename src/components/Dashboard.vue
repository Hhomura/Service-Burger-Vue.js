<template>
    <div id="burger-table">
        <Message :msg="msg" v-show="msg"/>
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{burger.id}}</div>
                <div>{{ burger.nome }}</div>
                <div>{{burger.pao}}</div>
                <div>{{burger.carne}}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <select name="status" class="status" @change="updateBurger($event, burger.id)">
                    <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo"> {{ s.tipo }}</option>
                </select>
                <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Message from './Message.vue'

let burgers:Array<{id:number, nome:string, tipo:string, pao:string, carne:string, opcionais:[], status:string}>

let status: Array<{id:number, tipo:string}>

export default {
    name:"Dashboard",
    data(){
        return{
            burgers,
            burger_id: null,
            status,
            msg: "",

        }
    },
    components:{Message},

    methods:{
        async getPedidos(){
            const req = await fetch("http://localhost:3000/burgers");

            const data = await req.json();
            this.burgers = data;


        },

        async getStatus(){
            const req = await fetch("http://localhost:3000/status");

            const data = await req.json();

            this.status = data;
        },
        async deleteBurger(id:number){
            const req = await fetch(`http://localhost:3000/burgers/${id}`,{
                method: "DELETE"
            });

            const res = await req.json();

            this.msg = `Pedido Removido com Sucesso: ${id}`

            setTimeout(() =>{
              this.msg = ""
            }, 2000);

            //msg

            this.getPedidos();
        },
        async updateBurger(event:any, id:number){
            const option = event.target.value;

            const dataJson = JSON.stringify({status:option});

            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json" },
                body: dataJson
            });

            const res = await req.json();

            this.msg = `Pedido Atualizado com Sucesso: ${res.id}`

            setTimeout(() =>{
              this.msg = ""
            }, 2000);
        }
    },
    mounted(){
        this.getPedidos();
        this.getStatus();
    }
}
</script>

<style scoped>

#burger-table{
    max-width: 1200px;
    margin: 0 auto;
}

#burger-table-heading, 
#burger-table-row, 
.burger-table-row{
    display: flex;
    flex-wrap: wrap;
}

#burger-table-heading{
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#burger-table-heading div, 
.burger-table-row div{
width: 19%;
}

.burger-table-row{
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
}

#burger-table-heading .order-id, 
.burger-table-row 
.order-number{
    width: 5%;
}

select{
    padding: 12px 6px;
    margin-right: 12px;
}

.delete-btn{
    background-color: #222;
    color: yellow;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}

.delete-btn:hover{
    background-color: transparent;
    color: #222;
}


</style>