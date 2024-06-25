<template>
  <div class="container">
    <h1>Create Zoom Meeting</h1>
    <button @click="startAuth">Create Meeting</button>
    <div v-if="meeting">
      <h2>Meeting Created</h2>
      <p>ID: {{ meeting.id }}</p>
      <p>Topic: {{ meeting.topic }}</p>
      <p>Join URL: <a :href="meeting.join_url" target="_blank">{{ meeting.join_url }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const meeting = ref(null);

const startAuth = () => {
  const authWindow = window.open('/api/auth', 'zoom-auth', 'width=600,height=600');
  window.onSocialClose = ({token, error}) => {
    if (token) {
      createMeeting(token)
      authWindow.close()
      setTimeout(() => {
        // @ts-ignore
        delete window.onSocialClose
      })
    }
    if (error) {
      alert('error')
      console.log('error >>', error.message)
    }
  }
  // window.addEventListener('message', async (event) => {
  //   if (event.origin === window.location.origin) {
  //     if (event.data.access_token) {
  //       const accessToken = event.data.access_token;
  //       await createMeeting(accessToken);
  //     }
  //   }
  // }, { once: true });
};

const createMeeting = async (accessToken) => {
  try {
    const response = await fetch(`/api/create-meeting?access_token=${accessToken}`, {
      method: 'POST'
    });
    const data = await response.json();
    if (data.success) {
      meeting.value = data.meeting;
    } else {
      alert('Failed to create meeting: ' + data.message);
    }
  } catch (error) {
    console.error('Error creating meeting:', error);
  }
};
</script>
