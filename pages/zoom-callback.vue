<script setup>
import { onMounted} from 'vue';
// import axios from "axios";
import { useRoute } from 'vue-router';
onMounted(async () => {
  const { $axios } = useNuxtApp();
  const route = useRoute();
  const {code} = route.query

  if (!code) {
    console.error("Authorization code is missing");
    return;
  }

  try {
    const response = await $axios.post('https://zoom.us/oauth/token', {
      data: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/zoom-callback',
        client_id: 'GbbncuaOQpmYJqAS0hl78g',
        client_secret: 'GC3f41Xw2pTnaMF4n4MTEFfJZz18NrmY'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });

    const { access_token } = response.data;

    if (window?.opener?.onSocialClose) {
      // @ts-ignore
      window.opener.onSocialClose({token: access_token})
    }
    // return { success: true, access_token };
  } catch (error) {
    if (window?.opener?.onSocialClose) {
      window?.opener?.onSocialClose({error: error})
    }
    // return { success: false, message: error.message };
  }
})
</script>

<template>
  <div>
    <p>zoom-callback</p>
  </div>
</template>

<style>

</style>
