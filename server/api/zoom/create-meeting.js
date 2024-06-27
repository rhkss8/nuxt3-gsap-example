import { getQuery, defineEventHandler } from 'h3';
import { createZoomMeeting }            from '~/utils/zoom.js';

export default defineEventHandler(async (event) => {
	const { access_token } = getQuery(event);
	if (!access_token) {
		throw new Error('Access token is required');
	}

	try {
		const meeting = await createZoomMeeting(access_token);
		return { success: true, meeting };
	} catch (error) {
		return { success: false, message: error.message };
	}
});
