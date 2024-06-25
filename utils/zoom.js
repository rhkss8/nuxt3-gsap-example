import axios from 'axios';
import jwt from 'jsonwebtoken';

const apiKey = 'qW09Fy6BS0momkUJUTxqfg';
const apiSecret = 'FbuID4n3NdpTWIaPAiVl0wIdSVL74VjI';

const generateZoomToken = () => {
	const payload = {
		iss: apiKey,
		exp: ((new Date()).getTime() + 5000)
	};
	return jwt.sign(payload, apiSecret);
};

const createZoomMeeting = async () => {
	const token = generateZoomToken();
	console.log('token >>', token)
	
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
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
		const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', body, config);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to create Zoom meeting');
	}
};

export { createZoomMeeting };
