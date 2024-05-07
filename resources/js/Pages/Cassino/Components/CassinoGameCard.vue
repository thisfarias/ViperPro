<template>
  <div class="item-game-container">
    <div class="item-game text-gray-700 w-full h-auto mr-4 cursor-pointer">
      <RouterLink :to="{ name: 'casinoPlayPage', params: { id: game.id, slug: game.game_code }}" v-if="game.distribution === 'kagaming'">
        <img :src="game.cover" alt="" class="w-full">
      </RouterLink>
      <RouterLink v-else :to="{ name: 'casinoPlayPage', params: { id: game.id, slug: game.game_code }}">
        <img :src="`/storage/`+game.cover" alt="" class="w-full ">
      </RouterLink>
      <div class="flex justify-between w-full text-gray-700 dark:text-gray-400 px-3 py-2">
        <div class="flex flex-col justify-start items-start">
          <span class="truncate text-[10px]">{{ game.game_name }}</span>
          <small class="truncate text-[8px]">{{ game?.provider?.name }}</small>
        </div>
        <button type="button">
          <img :src="`/assets/images/icons/info-game.svg`" alt="" width="29">
        </button>
      </div>
    </div>
    <div class="online-indicator flex items-center" :class="{ 'high-players': currentNumber > 950, 'gold': currentNumber > 950 }">
      <div class="pulse"></div>
      <strong class="text-white text-[12px]">{{ Math.round(currentNumber) }}</strong>&nbsp;
      <span class="text-[12px]" v-html="currentNumber > 950 ? 'Mais jogados &#11088;' : 'Jogando'"></span>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: ['index', 'game'],
  components: { RouterLink },
  data() {
    return {
      isLoading: false,
      modalGame: null,
      currentNumber: this.getRandomNumber(),
      targetNumber: 0
    }
  },
  methods: {
    getRandomNumber() {
      return Math.floor(Math.random() * 1100);
    },
    updateNumber() {
      this.targetNumber = this.getRandomNumber();
      const difference = this.targetNumber - this.currentNumber;
      const changePerInterval = difference / (10000 / 500); // O intervalo do timer abaixo é de 500 milissegundos
      this.changeNumber(changePerInterval);
    },
    changeNumber(changePerInterval) {
      const timer = setInterval(() => {
        if ((changePerInterval > 0 && this.currentNumber < this.targetNumber) ||
            (changePerInterval < 0 && this.currentNumber > this.targetNumber)) {
          this.currentNumber += changePerInterval;
        } else {
          this.currentNumber = this.targetNumber; // Garantindo que o número final seja atingido.
          clearInterval(timer);
        }
      }, 500);
    }
  },
  mounted() {
    this.updateNumber();
    setInterval(() => {
      this.updateNumber();
    }, 20000); // Atualizando a cada 10 segundos
  }
};
</script>

<style scoped>
.item-game-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinhamento à esquerda do contêiner da bolinha */
}

.online-indicator {
  margin-top: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinhamento à esquerda dos itens dentro do indicador */
}

.pulse {
  margin-left: 12px; /* Ajuste conforme necessário para alinhar com o card */
  width: 8px;
  height: 8px;
  background-color: #00ff00;
  border-radius: 50%;
  margin-right: 5px;
  animation: pulse-animation 1s infinite;
  box-shadow: 0 0 5px #00ff00, 0 0 20px #00ff00;
}

/* Estilo quando houver mais de 950 jogadores */
.high-players .pulse, .gold .pulse {
  background-color: gold;
  box-shadow: 0 0 5px gold, 0 0 20px gold;
}

/* Alinhamento do número com o card */
.high-players strong, .gold strong {
  margin-left: 0;
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

