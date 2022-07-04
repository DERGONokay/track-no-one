// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceId: "DERGON",
  censusHost: "https://census.daybreakgames.com/s:DERGON/get/ps2:v2",
  wssHost: "wss://push.planetside2.com/streaming?environment=ps2&service-id=s:DERGON",
  appVersion: "0.1.1",
  googleAnalyticsId: "G-5CQ03MW07F",
  trackPageviews: false,
  debugGoogleAnalytics: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
