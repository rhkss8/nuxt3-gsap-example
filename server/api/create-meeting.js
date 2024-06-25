import { createZoomMeeting } from '@/utils/zoom';

export default defineEventHandler(async (event) => {
	try {
		const meeting = await createZoomMeeting();
		return { success: true, meeting };
	} catch (error) {
		return { success: false, message: error.message };
	}
});
