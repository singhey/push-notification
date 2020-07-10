window.addEventListener('load', function(){
  document.querySelector("#enable").addEventListener('click', function(){
    console.log("Ask for permission")
    askPermission()
  })
})

register()
function register() {
  if('serviceWorker' in navigator) {
    console.log("Hello there")
    window.addEventListener('load',  function() {
      console.log("Isn't page loaded")
      //pages has loaded now call service worker to register
      console.log("Page is loaded")
      navigator.serviceWorker
        .register('sw.js')
        .then(resgister => {
          console.log("Service worker registered")
        })
        .catch(err => {
          console.log("Unable to register service worker")
        })
    })
  }
}

async function askPermission() {
  try{
    //console.log(navigator.serviceWorker)
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "BMafx5AouBAMLpe2knXFHriVYN4yQWcO1oc9OLOWacfUXk7uyKuZMF_VLPUZY4T3j3-WQuyO9GjhdIgIGsgD9fU"
    })
    return JSON.stringify(push)
  }catch(err){
    console.log(err)
    //window.alert(err)
    return null
  }
}