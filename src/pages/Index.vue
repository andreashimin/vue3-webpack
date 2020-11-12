<template>
  <div class="main">
    Welcome to VIP

    <a class="mt-6" href="https://pro.104.com.tw/vip">Enter Here</a>

    {{ count.num }}
    <button @click="counter">add</button>

    <div ref="lib" class="third-party"></div>

    <div class="author">created by {{ author }}</div>
  </div>
</template>
<script>
import hello from "../libs/helloWorld";
import image from "../libs/image";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";

export default {
  setup() {
    const vm = getCurrentInstance();
    const author = ref("Shimin");
    const count = reactive({ num: 0 });

    const counter = () => {
      count.num++;
    };

    onMounted(() => {
      console.log("mounted!");
      console.log(vm);

      vm.refs.lib.appendChild(hello());
      vm.refs.lib.appendChild(image());
    });

    return {
      author,
      counter,
      count,
    };
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: $gray-300;
}
</style>

<style lang="scss" scoped>
.main {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-family: arial;
  font-weight: bold;
}

.mt-6 {
  margin-top: 24px;
}

.author {
  font-size: 16px;
  color: $gray-600;
  margin-top: 36px;
}

a[href] {
  color: #00afb8;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
}
.third-party {
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
}
</style>
