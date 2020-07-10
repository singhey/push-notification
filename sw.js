self.addEventListener('push', (event) => {
  // console.log(self.serviceWorkerRegistration)
  //self.registration.showNotification('test message', {})
  console.log(event)
  //console.log('Received push');
  let notificationTitle = 'Gaming Stars';
  const notificationOptions = {
    title: "Gaming Stars",
    body: 'New notification from gaming stars',
    icon: './images/logo-192x192.png',
    badge: './images/badge-72x72.png',
    data: {
      url: 'https://gamingstars.in/',
    },
  };

  // if (event.data) {
  //   const dataText = event.data.text();
  //   notificationTitle = 'Received Payload';
  //   notificationOptions.body = `Push data: '${dataText}'`;
  // }

  //console.log(event.data.text())
  let notificationData = event.data.text()
  try{
    console.log(notificationData)
    notificationData = JSON.parse(notificationData)
    notificationOptions = {
      ...notificationOptions,
      title: notificationData.title,
      body: notificationData.body,
      data: {
        url: notificationData.url || "https://www.gamingstars.in"
      }
    }
  }catch(err){
    console.log("Unable to parse data returned. Showing a default notification")
    //return
  }
  console.log(self.registration)
  self.registration.showNotification(
    notificationOptions.title, {
      body: notificationOptions.body,
      data: {
        url: notificationOptions.url
      }
    })

  // event.waitUntil(
  //   Promise.all([
      
  //     //self.analytics.trackEvent('push-received'),
  //   ])
  // );
})

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  console.log("Notification was clicked")
  console.log(event.notification.data)

  let clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url);
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  );
});


self.addEventListener('install', function(event) {
  self.skipWaiting()
})