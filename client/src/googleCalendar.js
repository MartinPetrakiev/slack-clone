const gapi = window.gapi;
/* 
  Update with your own Client Id and Api key 
*/
const CLIENT_ID = "768350244457-dbordv9etgqm6j5u83ima50v584qeutg.apps.googleusercontent.com";
const API_KEY = "AIzaSyA7bH4gzkd9Hpq9jt8FPe0dZibpK2yaWJ8";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const loadCalendar = (event) => {
  gapi.load('client:auth2', () => {
    console.log('google auth client loaded');

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).catch((err) => console.log(err));

    gapi.client.load('calendar', 'v3', () => console.log('calendar load'));

    gapi.auth2.getAuthInstance().signIn()
      .then(() => {


        const request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        });

        try {
          request.execute(event => {
            console.log(event);
            window.open(event.htmlLink);
          });
        } catch (err) {
          console.log(err);
        }

        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items;
          console.log('EVENTS: ', events);
        }).catch(err => console.log(err));

      });
  });
};