import axios from 'axios';

const createZoomMeeting = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  const body = {
    topic: "Sample Meeting",
    type: 1,
    settings: {
      host_video: true,
      participant_video: true
    }
  };

  try {
    const response = await axios.post(process.env.ZOOM_MEETING_URL, body, config);
    return response.data;
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.response?.data || error.message);
    throw new Error('Failed to create Zoom meeting');
  }
};

export { createZoomMeeting };
