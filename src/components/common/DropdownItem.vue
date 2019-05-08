<template>
  <component :is="tag" :href="href" :class="className">
    <slot></slot>
  </component>
</template>

<script>
import classNames from "classnames";

const DropdownItem = {
  props: {
    tag: {
      type: String,
      default: "a"
    },
    href: {
      type: String,
      default: "#"
    },
    navbarLink: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return classNames(
        this.navbarLink ? "navbar-link" : "",
        "dropdown-item",
        this.disabled ? "disabled" : "",
        this.active ? "active" : ""
      );
    }
  }
};

export default DropdownItem;
export { DropdownItem as mdbDropdownItem };
</script>

<style scoped>
.active {
    background-color: #5385c1
}
</style>
