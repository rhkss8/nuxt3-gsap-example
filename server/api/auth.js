import { sendRedirect, defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  if (!code) {
    const authorizationUrl = `${process.env.ZOOM_AUTHORIZATION_URL}?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`;
    return sendRedirect(event, authorizationUrl);
  } else {
    const tokenResponse = await $fetch(process.env.ZOOM_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI,
        client_id: process.env.ZOOM_CLIENT_ID,
        client_secret: process.env.ZOOM_CLIENT_SECRET
      })
    });

    const { access_token } = tokenResponse;
    // Access token 저장 로직 추가 (예: 데이터베이스 또는 세션에 저장)

    return {
      access_token
    };
  }
});
//
// import { sendRedirect, defineEventHandler } from 'h3';
//
// export default defineEventHandler((event) => {
//   const authorizationUrl = `${process.env.ZOOM_AUTHORIZATION_URL}?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}&scope=meeting:write:admin user:read:admin`;
//   return sendRedirect(event, authorizationUrl);
// });
