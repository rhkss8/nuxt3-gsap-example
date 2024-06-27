<template>
  <div class="container">
    <section>
      <h1>Create Zoom Meeting</h1>
      <button @click="startAuthZoom">Create Meeting</button>
      <div v-if="meeting">
        <h2>Meeting Created</h2>
        <p>Zoom ID: {{ meeting.id }}</p>
        <p>이름: {{ meeting.topic }}</p>
        <p>URL: <a :href="meeting.join_url" target="_blank">{{ meeting.join_url }}</a></p>
      </div>
    </section>
    <section style="margin-top: 10rem">
      <h1>Upload video</h1>
      <input type="file" ref="fileInput" />
      <button @click="startAuthVimeo">Upload</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const meeting = ref(null);
const fileInput = ref(null);

const startAuthZoom = () => {
  const authWindow = window.open('/api/zoom/auth', 'zoom-auth', 'width=600,height=600');
  window.onSocialClose = ({token, error}) => {
    if (token) {
      // TODO 토큰을 저장해서 관리한다. 만료될경우에 대한 체크도 필요
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
};

const createMeeting = async (accessToken) => {
  try {
    const response = await fetch(`/api/zoom/create-meeting?access_token=${accessToken}`, {
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


const startAuthVimeo = () => {
  const file = fileInput.value.files[0];
  if (!file) {
    alert('Please select a video file to upload.');
    return;
  }
  const authWindow = window.open('/api/vimeo/auth', 'vimeo-auth', 'width=600,height=600');
  window.onVimeoAuth = async ({ token, error }) => {
    if (token) {
      await uploadVideo(token);
      authWindow.close();
      setTimeout(() => {
        delete window.onVimeoAuth;
      }, 0);
    }
    if (error) {
      alert('Error: ' + error);
      console.log('Error:', error);
    }
  };
};

const uploadVideo = async (accessToken) => {
  const file = fileInput.value.files[0];
  if (!file) {
    alert('Please select a video file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/vimeo/upload', {
      method: 'POST',
      body: JSON.stringify({ accessToken, video: formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.success) {
      console.log(data)
      alert('Video uploaded successfully');
    } else {
      alert('Failed to upload video: ' + data.message);
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};
</script>
