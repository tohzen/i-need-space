const searchBtn = document.querySelector('#search')
searchBtn.addEventListener('click', () => {
    const apiInput = document.querySelector('#api-key').value
    const addressInput = document.querySelector('#address').value
    const address = encodeURI(addressInput)
    console.log(address)


    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiInput}`
    fetch(mapBoxUrl)
    .then(raw => raw.json())
    .then(data => {
        console.log(data)
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
        console.log(latitude, longitude)
        const norad = document.querySelector('#norad').value
        const noradUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`
        
        
        fetch(noradUrl)
        .then(rawData => rawData.json())
        .then(data => {
            console.log(data)
            const culminate = data[0].culmination.utc_datetime
            const rise = data[0].rise.utc_datetime
            const set = data[0].set.utc_datetime
            const convert = date => {
                var newDate = new Date(date);
                return newDate;
            }
            
            
            const typewriter = document.querySelector('.typewriter')
            const title = document.createElement('h2')
            title.className = 'retro css-typing'
            const item1 = document.createElement('div')
            item1.className = 'item css-typing'
            item1.innerHTML = `<p>Culminate Date & Time: <br> <br>${convert(culminate)}</p><br>`
            typewriter.append(item1)
            
            const item2 = document.createElement('div')
            item2.className = 'item css-typing'
            item2.innerHTML = `<p>Rise Date & Time: <br> <br>${convert(rise)}</p><br>`
            typewriter.append(item2)
            
            const item3 = document.createElement('div')
            item3.className = 'item css-typing'
            item3.innerHTML = `<p>Set Date & Time: <br> <br>${convert(set)}</p><br>`
            typewriter.append(item3)
            
            const newSearchBtn = document.querySelector('#goodBye')
            newSearchBtn.addEventListener('click', () => {
                let apiInput = document.querySelector('#api-key')
                let addressInput = document.querySelector('#address')
                let norad = document.querySelector('#norad')
                
                
                apiInput.value = ''
                addressInput.value = ''
                norad.value = ''
                item1.innerHTML = ''
                item2.innerHTML = ''
                item3.innerHTML = ''
                
                
                
            }) 
        })
    })
})

const badButton = document.getElementById('blackHole')
badButton.addEventListener('click', () => {
    let html = document.querySelector('html')
    html.style.backgroundImage = 'url(blackhole.gif)'
   
    
    rotate()
    
})


function rotate(){
    let rotate360 = [
        { transform: 'rotate(360deg)'},
    ];
    
    let slowInfinite = {
        duration: 4000,
        iterations: Infinity,
        
    }
    let back = document.querySelector('.back')
    let map = document.querySelector('#map')
    back.animate( rotate360, slowInfinite );
    map.animate( rotate360, slowInfinite );
}