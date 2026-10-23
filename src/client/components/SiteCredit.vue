<script setup lang="ts">
// The footer: the guide for using the site, and the credits for the work it is built on,
// each on joyweshare.org in the page's language.
import { computed } from "vue";
import { lang, t } from "../i18n";

const PAGES = {
  en: { guides: "https://joyweshare.org/guides/", credits: "https://joyweshare.org/credits/" },
  fi: { guides: "https://joyweshare.org/oppaat/", credits: "https://joyweshare.org/tekijat/" },
} as const;

const pages = computed(() => PAGES[lang.value]);
</script>

<template>
  <p class="site-credit">
    <a :href="pages.guides" target="_blank" rel="noopener">{{ t.guides }}</a> ·
    <a :href="pages.credits" target="_blank" rel="noopener">{{ t.credits }}</a>
  </p>
</template>
