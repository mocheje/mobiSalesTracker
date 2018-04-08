/*
* Browser Policies
* Browser policy customizations.
* Documentation: https://atmospherejs.com/meteor/browser-policy
*/

customBrowserPolicies = function(){
  // Font Awesome
  BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
  BrowserPolicy.content.allowOriginForAll('*.cloudflare.com');

  if (process.env.NODE_ENV === "development") {
    BrowserPolicy.content.allowOriginForAll("localhost:*");
    BrowserPolicy.content.allowConnectOrigin("ws://localhost:*");
    BrowserPolicy.content.allowOriginForAll("*.example.com:*");
    BrowserPolicy.content.allowConnectOrigin("ws://*.example.com:*");
    BrowserPolicy.content.allowConnectOrigin("http://localhost:*");
    BrowserPolicy.content.allowConnectOrigin("https://localhost:*");
    BrowserPolicy.framing.allowAll();
  }

  BrowserPolicy.content.allowFontDataUrl();

  BrowserPolicy.content.allowEval(__meteor_runtime_config__.ROOT_URL);
};
