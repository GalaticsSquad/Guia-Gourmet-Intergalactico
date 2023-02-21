function EventCustom(urlP, dataPlanet, dataRecipe){
    const event = new CustomEvent("onstatechange", {detail:{url : urlP, dataPlanet:dataPlanet, dataRecipe:dataRecipe}})
    //console.log(event)
    return event;
}

function dispache(url){
    console.log('ok')
    console.log('dispache:', url)
    const root = document.getElementById('root')
    const event = EventCustom(url)
    root.dispatchEvent(event)
}

export {EventCustom, dispache}