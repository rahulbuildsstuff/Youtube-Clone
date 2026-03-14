export const Logo_Img = "https://www.svgrepo.com/show/506792/burger-menu-left.svg"
export const youtube_Logo = "https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
export const User_Icon = "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
export const Google_Api_Key = "AIzaSyDDyEsjZrzwUVarH37s4Zbz0_B9UFj2SDU"
export const Youtube_Api_Key = " https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + Google_Api_Key;
// YouTube Data API v3 search - works in browser (CORS allowed). Use for autocomplete suggestions.
export const YouTube_Suggest_Api = (query) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=${Google_Api_Key}&q=${encodeURIComponent(query)}`;

