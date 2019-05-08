<template>
  <div align="center">
    <div class="check-step">
      <ul>
        <li v-bind:class="{'cur':step>=1}">
          <span>Choose Account Name</span>
        </li>
        <li v-bind:class="{'cur':step>=2}">
          <span>Provide Public Key</span>
        </li>
        <li v-bind:class="{'cur':step>=3}">
          <span>Make Payment</span>
        </li>
        <li v-bind:class="{'cur':step>=4}">
          <span>Finish</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["step"],

  data() {
    return {};
  },
};
</script>

<style lang="postcss" scoped>
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

.check-step {
  padding: 30px 0 20px 0;
  width: 90%;
}

.check-step ul {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.check-step ul:after {
  visibility: hidden;
  display: block;
  content: " ";
  clear: both;
}

.check-step li {
  position: relative;
  float: left;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  width: 25%;
  line-height: 1.25em;
  padding: 0 1em 1.25em 1em;
  border-bottom: 2px solid #ccc;
  color: #999;
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
}

.check-step li em {
  color: #999;
  font-size: 0.8em;
  font-weight: normal;
}

.check-step li:after {
  position: absolute;
  bottom: -7px;
  left: 50%;
  margin-left: -7px;
  content: "";
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ccc;
}

.check-step li.cur {
  border-color: #d1434a;
  color: #d1434a;
}

.check-step li.cur:after {
  background: #d1434a;
}
</style>
