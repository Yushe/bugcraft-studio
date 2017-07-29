'use strict';

const navData = () => {
  return {
    brand: 'Bugcraft Studio',
    section: 'general'
  }
};

Vue.component('navigation', {
  data: navData,
  template: `
  <div class="appContainer">
    <nav class="nav has-shadow">
      <div class="container is-fluid">
        <div class="nav-left menu-tabs">
          <span class="nav-item" style="-webkit-app-region: drag;font-size: 1.2rem;">
            {{ brand }}
          </span>
          <a class="nav-item is-tab is-hidden-mobile is-active" data-id="general" v-on:click="setActiveItem">General</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="spectate" v-on:click="setActiveItem">Spectate</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="environment" v-on:click="setActiveItem">Environment</a>
          <a class="nav-item is-tab is-hidden-mobile" data-id="faq" v-on:click="setActiveItem">F.A.Q</a>
        </div>
        <span class="nav-toggle" v-on:click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right menu-tabs nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active" data-id="general" v-on:click="setActiveItem">General</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="spectate" v-on:click="setActiveItem">Spectate</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="environment" v-on:click="setActiveItem">Environment</a>
          <a class="nav-item is-tab is-hidden-tablet" data-id="faq" v-on:click="setActiveItem">F.A.Q</a>
          <a class="nav-item is-tab" v-on:click="openLink" href="https://github.com/noggaholic/bugcraft-studio">
            <figure class="image is-16x16">
              <i class="fa fa-github"></i>
            </figure>
          </a>
          <a class="nav-item is-tab" v-on:click="openLink" href="http://www.twitter.com/k4rliky">
            <figure class="image is-16x16">
              <i class="fa fa-twitter"></i>
            </figure>
          </a>
        </div>
      </div>
    </nav>
    <general v-if="section === 'general'"></general>
    <spectate v-if="section === 'spectate'"></spectate>
    <environment v-if="section === 'environment'"></environment>
    <faq v-if="section === 'faq'"></faq>
  </div>
  `,
  methods: {
    openLink: function(event) {
      event.preventDefault();
      shell.openExternal(event.currentTarget.href);
    },
    setActiveItem: function(element) {
      const domElement    = element.currentTarget;
      const section       = domElement.getAttribute('data-id');
      const activeSection = this.section;
      this.section = section;
      if (activeSection !== this.section) {
        this.disableCurr(activeSection);
      }
      domElement.classList.toggle('is-active');
      AppEvent.$emit('setSection', this.section);
    },
    disableCurr: function(section) {
      document.querySelector('a[data-id="' + section + '"]').classList.toggle('is-active');
    },
    toggleMenu: () => {
      var burger = document.querySelector('.nav-toggle');
      var menu = document.querySelector('.nav-menu');
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    },
    sendMessage: (element) => {
      const domElement = element.currentTarget;
      const messageId  = domElement.getAttribute('data-id');
      manager.sendMessage(messageId);
    }
  }
})