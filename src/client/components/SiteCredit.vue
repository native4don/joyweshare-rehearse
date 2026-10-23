<script setup lang="ts">
// The footer: the guides for using the site, and the credits for the work it is built on.
import { t } from "../i18n";
const GUIDES_URL = "https://joyweshare.org/using-the-practice-tracks/";
const CREDITS_URL = "https://joyweshare.org/credits/";
</script>

<template>
  <p class="site-credit">
    <a :href="GUIDES_URL" target="_blank" rel="noopener">{{ t.guides }}</a> ·
    <a :href="CREDITS_URL" target="_blank" rel="noopener">{{ t.credits }}</a>
  </p>
</template>
