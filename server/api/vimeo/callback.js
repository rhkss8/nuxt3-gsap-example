import { getQuery, defineEventHandler } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
	const { code } = getQuery(event);
	
	if (!code) {
		return { success: false, message: 'Authorization code is missing' };
	}
	
	try {
		const response = await axios.post('https://api.vimeo.com/oauth/access_token', null, {
			params: {
				grant_type: 'authorization_code',
				code,
				redirect_uri: process.env.VIMEO_REDIRECT_URI,
				client_id: process.env.VIMEO_CLIENT_ID,
				client_secret: process.env.VIMEO_CLIENT_SECRET
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		
		const { access_token } = response.data;
		
		return `
      <html>
        <body>
          <script>
            if (window.opener && window.opener.onVimeoAuth) {
              window.opener.onVimeoAuth({ token: '${access_token}' });
              window.close();
            }
          </script>
        </body>
      </html>
    `;
	} catch (error) {
		return { success: false, message: error.message };
	}
});
