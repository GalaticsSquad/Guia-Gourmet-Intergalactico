export default function EventCustom(urlP){
    const event = new CustomEvent("onstatechange", {detail:{url : urlP}})
    //console.log(event)
    return event;
}