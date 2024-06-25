import { getQuery, defineEventHandler } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);

  if (!code) {
    return { success: false, message: 'Authorization code is missing' };
  }

  try {
    const response = await axios.post(process.env.ZOOM_TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI,
        client_id: process.env.ZOOM_CLIENT_ID,
        client_secret: process.env.ZOOM_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = response.data;

    if (window?.opener?.onSocialClose) {
      // @ts-ignore
      window.opener.onSocialClose({token: access_token})
    }
    // return { success: true, access_token };
  } catch (error) {

    if (window?.opener?.onSocialClose) {
      window?.opener?.onSocialClose({error: error})
    }
    // return { success: false, message: error.message };
  }
});
// import { getQuery, defineEventHandler } from 'h3';
// import axios from 'axios';
//
// export default defineEventHandler(async (event) => {
//   const { code } = getQuery(event);
//
//   if (!code) {
//     return { success: false, message: 'Authorization code is missing' };
//   }
//
//   try {
//     const response = await axios.post(process.env.ZOOM_TOKEN_URL, null, {
//       params: {
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: process.env.ZOOM_REDIRECT_URI,
//         client_id: process.env.ZOOM_CLIENT_ID,
//         client_secret: process.env.ZOOM_CLIENT_SECRET
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
//
//     const { access_token } = response.data;
//
//     // HTML 페이지를 렌더링하여 부모 창으로 액세스 토큰 전달
//     return `
//       <html>
//         <body>
//           <script>
//             window.opener.postMessage({ access_token: "${access_token}" }, "*");
//             window.close();
//           </script>
//         </body>
//       </html>
//     `;
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// });
