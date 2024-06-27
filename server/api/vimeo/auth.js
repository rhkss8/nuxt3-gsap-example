import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
	const vimeoAuthorizationUrl = `https://api.vimeo.com/oauth/authorize?response_type=code&client_id=${process.env.VIMEO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.VIMEO_REDIRECT_URI)}&scope=upload`;
	event.res.writeHead(302, { Location: vimeoAuthorizationUrl });
	event.res.end();
});
