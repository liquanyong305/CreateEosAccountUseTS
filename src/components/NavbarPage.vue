<template>
  <container>
      <navbar style="background-color:#5385c1" dark position="top" scrolling>
        <!-- Navbar brand -->
        <mdb-navbar-brand href="https://smartone.io/">
          <img src="https://dapps.smartone.io/marketplace.png" height="30" alt>
        </mdb-navbar-brand>
        <!-- <mdb-navbar-brand href="#">SmartOne</mdb-navbar-brand> -->
        <navbar-collapse>
          <navbar-nav right>
            <navbar-item href="#" waves-fixed>HOME</navbar-item>
            <navbar-item href="#" waves-fixed>FAQ</navbar-item>
            <navbar-item href="#" waves-fixed>ABOUT</navbar-item>
            <!-- Dropdown -->
            <dropdown tag="li" class="nav-item">
              <dropdown-toggle slot="toggle" tag="a" navLink color="#5385c1" waves-fixed>Language</dropdown-toggle>
              <dropdown-menu>
                <dropdown-item :active="this.lang==='en'">
                  <div class="navbar-link" @click="chgLang('en')">English</div>
                </dropdown-item>
                <dropdown-item :active="this.lang==='ja'">
                  <div class="navbar-link" @click="chgLang('ja')">日本語</div>
                </dropdown-item>
                <dropdown-item :active="this.lang==='zh'">
                  <div class="navbar-link" @click="chgLang('zh')">中文</div>
                </dropdown-item>
              </dropdown-menu>
            </dropdown>
          </navbar-nav>
        </navbar-collapse>
      </navbar>
  </container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// import { Navbar, NavbarItem, NavbarNav, NavbarCollapse, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, mdbInput, mdbNavbarBrand, Fa, Row } from 'mdbvue';
import Navbar from "./common/Navbar";
import NavbarItem from "./common/NavbarItem";
import NavbarNav from "./common/NavbarNav";
import NavbarCollapse from "./common/NavbarCollapse";
import Container from "./common/Container";
import Dropdown from "./common/Dropdown";
import DropdownItem from "./common/DropdownItem";
import DropdownMenu from "./common/DropdownMenu";
import DropdownToggle from "./common/DropdownToggle";
import mdbInput from "./common/Input";
import mdbNavbarBrand from "./common/NavbarBrand";
import Fa from "./common/Fa";
import Row from "./common/Row";

export default {
  name: "NavbarPage",
  
  methods: {
    ...mapActions("multiLanguage", ["setLang"]),

    chgLang: function(lng) {
      this.setLang(lng);
    }
  },
  computed: {
    lang: function() {
      return 'en';
    }
  },

  components: {
    Navbar,
    NavbarItem,
    NavbarNav,
    NavbarCollapse,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    mdbInput,
    mdbNavbarBrand,
    Fa,
    Row
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
