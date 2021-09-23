const print = console.log

var class_1, class_2

function sort(list, lambda=e=>e) {
    list.sort((a,b)=>lambda(a)-lambda(b))
    return list
}

function setClass(class_element, class_name, link, start_time, end_time) {
    class_element = class_element==1?class_1:class_2
    class_element.setAttribute("href", `https://meet.google.com/${link}`)
    class_element.getElementsByClassName("class-name")[0].innerHTML = class_name
    if(link == "") return
    class_element.getElementsByClassName("meet-link")[0].innerHTML = `https://meet.google.com/${link}`
    let time_string = "", hours, minutes
    if(class_element == class_1) {
        hours = new Date().getHours() - start_time
        minutes = new Date().getMinutes()
        if(hours) time_string = `Started ${hours} hours, ${minutes} minutes ago`
        else time_string = `Started ${minutes} minutes ago`
    }
    else {
        hours = start_time - new Date().getHours() - 1
        minutes = 60 - new Date().getMinutes()
        if(hours) {
            time_string = `Starting in ${hours} hours, ${minutes} minutes`
        }
        else {
            time_string = `Starting in ${minutes} minutes`
        }
    }
    class_element.getElementsByClassName("run-time")[0].innerHTML = time_string
}

function setup() {
    class_1 = document.getElementById("class-1")
    class_2 = document.getElementById("class-2")

    const day_names = "MTuWThFS".split(/(?=[A-Z])/)
    let current_day = day_names[new Date().getDay()-1]
    let current_time = new Date().getHours()
    let classes_today = []
    for(let [class_name, {link, time}] of Object.entries(schedule)) {
        let days = [...time.matchAll(/[A-Z][a-z]?/g)].flat(999)
        if(days.indexOf(current_day) != -1) {
            time = time.match(/(\d+)\-(\d+)/)
            time.splice(0, 1)
            time = time.map(e=>parseInt(e))
            time = time.map(e=>e + (e<=7?12:0))
            classes_today.push([class_name, link, ...time])
        }
    }
    classes_today = sort(classes_today, ele=>ele[2])

    for(let i = 0; i < classes_today.length; ++i) {
        let [class_name, link, start, end] = classes_today[i]
        if(current_time < start) {
            // This is the next class, set it and break
            setClass(2, ...classes_today[i])
            break
        }
        if(current_time < end) {
            // This is the current class
            setClass(1, ...classes_today[i])
            if(i==classes_today.length-1) break
            // Set next class
            setClass(2, ...classes_today[i+1])
        }
    }
}

window.onload = ()=>{
    setup()
    setInterval(setup, 5000)
}

var schedule = {"M3 Tutorial": {"time": "M8-9", "link": "ahi-tdvc-fxb"}, "M3 Lecture": {"time": "MWF9-10", "link": "ktt-qiek-avn"}, "Dev Eco": {"time": "MWF12-1", "link": "ssv-wsoq-xaq"}, "POE - Lecture": {"time": "MWF3-4", "link": "xbd-cvud-qsn"}, "Introductory Philosophy": {"time": "MWF4-5", "link": "qcz-fuog-cow"}, "EEB - Lecture": {"time": "TuThS10-11", "link": "cqu-bojp-uou"}, "MSM - Lecture": {"time": "TuThS11-12", "link": "evp-sfwv-djv"}, "EEB - Tutorial": {"time": "Tu4-5", "link": "cqu-bojp-uou"}, "MSM - Tutorial": {"time": "Th4-5", "link": "rdn-nksz-jcw"}, "FuFA 1": {"time": "Th5-7", "link": "vjb-bbbh-seg"}, "FuFA 2": {"time": "S3-5", "link": "qia-kzhs-xnf"}, "POE - Tutorial": {"time": "F5-6", "link": "ffb-udcv-obh"}}