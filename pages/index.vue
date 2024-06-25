<template>
  <div class="container">
    <h1>Create Zoom Meeting</h1>
    <button @click="createMeeting">Create Meeting</button>
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

const createMeeting = async () => {
  try {
    const response = await fetch('/api/create-meeting', {
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
