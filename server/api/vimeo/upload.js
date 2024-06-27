import { defineEventHandler } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
	const { accessToken, video } = await useBody(event);
	
	if (!accessToken || !video) {
		return { success: false, message: 'Access token or video is missing' };
	}
	
	try {
		const response = await axios.post('https://api.vimeo.com/me/videos', video, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
				'Tus-Resumable': '1.0.0',
			},
		});
		
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.message };
	}
});
