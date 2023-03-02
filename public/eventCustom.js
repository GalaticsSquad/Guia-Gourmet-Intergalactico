
// @author {Eduardo}
// @coauthor {Carolina}
function EventCustom(urlP, dataPlanet, dataRecipe){
    const event = new CustomEvent("onstatechange", {
        detail:{url : urlP, dataPlanet:dataPlanet, dataRecipe:dataRecipe}
    })
    return event;
}


export {EventCustom}