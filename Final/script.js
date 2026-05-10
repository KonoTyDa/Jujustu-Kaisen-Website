//Carousel Attempt// 
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
         const offset = button.dataset.carouselButton === "next" ? 1 : -1
         const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        })
    })
    //Carousel Attempt//    

 //Lightbox//

//Subtitles//

const scriptData = {
    "Satoru Gojo": [
        {time: 1000, text: "It will all be alright."},
        {time: 3550, text: "After all..." },
        {time: 5000, text: "You're weak."},
        {time: 6500, text: ""}
    ],
    "Hiromi Higuruma": [
        {time: 400, action: "shake", text: ""},
        {time: 1700, action: "shake", text: ""},
        {time: 3000, action: "shake", text: ""},
        {time: 3800, action: "shake", text: ""},
        {time: 4500, action: "shake", text: ""},
        {time: 5300, action: "shake", text: ""},
        {time: 5500, text: "Everyone come back..."},
        {time: 7500, text: "We are having a retrial!"},
        {time: 9000, text: ""}
    ],
    "Choso Kamo": [
         {time: 500, text: "I never had an example."},
        {time: 2500, text: "I had to make many, many, many mistakes." },
        {time: 4500, text: "Yet I always had to keep walking in front of my brothers."},
        {time: 8100, text: "That's why I'm strong!"},
        {time: 10000, text: ""}
    ]
}

//Subtitles//

   const whoosh = new Audio('Audio/openwhoosh.mp3')
   whoosh.preload ="auto"
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)
const images = document.querySelectorAll('.grid img')
images.forEach(image => {
    image.addEventListener('click', e =>{
      whoosh.currentTime = 0
      whoosh.play()

        const animBox = document.getElementById("animate")
       const rect = image.getBoundingClientRect()
            animBox.style.transition = "none"
            animBox.style.top = rect.top + "px"
            animBox.style.left = rect.left + "px"
            animBox.style.width = rect.width + "px"
            animBox.style.height = rect.height + "px"
    animBox.style.backgroundColor = image.dataset.color
    animBox.style.display = "block"
       
const voiceDelay = parseInt(image.dataset.voicedelay) || 0
const textDelay = parseInt(image.dataset.textdelay) || 0
const soundFile = image.dataset.voice

    setTimeout(() => {
        animBox.style.transition = "all 0.5s cubic-bezier(0.86, 0, 0.07, 1)"
            animBox.style.top = "0px"
            animBox.style.left = "0px"
            animBox.style.width = "100vw"
            animBox.style.height = "100vh"
            }, 15)

    setTimeout(() => {
        if(soundFile) {
            const sfx = new Audio(soundFile)
            sfx.volume = .5; 
            sfx.play()

const charName = image.dataset.name
const subs = scriptData[charName]
            if (subs){
                    subs.forEach(line => {
                        setTimeout(() => {
                            const subBox = document.getElementById('sub-box')
                            if (subBox) {
                                if (line.text === "") {
                                    subBox.style.opacity ="0"
                                } else {    
                                subBox.innerText = line.text
                                subBox.style.opacity = "1"
                                    }
                            }
                            if (line.action ==="shake"){
                                const box = document.querySelector('.lightbox-content')
                            if (box) {
                                box.classList.remove('shake-active')
                                void box.offsetWidth
                                box.classList.add('shake-active')
                                setTimeout(() => box.classList.remove ('shake-active'), 100)
                            }

                               }
                        }, line.time)
                    })
            }
        }
    }, voiceDelay)

    setTimeout(() => {
        animBox.style.display = "none"
        openLightbox(image, textDelay)
        }, 1000)
    })
})


function openLightbox(image, textDelay) {
        lightbox.classList.add('active')
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
    
    const lightboxContent = document.createElement('div')
    lightboxContent.classList.add('lightbox-content')

    const charName = image.dataset.name
        const charGrade = image.dataset.grade
        const charBio = image.dataset.bio
        const fullImage = image.dataset.fullimg
        const home = image.dataset.return
        const backgroundColor = image.dataset.color
        const isSpin = image.dataset.spin === "true"; 
        if (isSpin) {
            lightboxContent.classList.add('spin-effect')
        }
        const imgJudge = image.dataset.imgjudge
        let judgeHTML = ""
        if (imgJudge) {
            judgeHTML = `<img src="${imgJudge}" class="judge-img" alt="Judgeman">`
        }
    lightboxContent.style.backgroundColor = backgroundColor

    const alignRight = image.dataset.align ==="right"
        if (alignRight) {
            lightboxContent.classList.add('align-right')
        }
    const charTitle = image.dataset.title
        let titleHTML = ""
        if (charTitle) {
            titleHTML = `<h1>${charTitle}</h1>`
        }
    const hasBloodLines = image.dataset.bloodlines ==="true"
    let bloodLinesHTML = ""
    if (hasBloodLines) {
        bloodLinesHTML = `
        <div class="blood-line line-1"></div>
        <div class="blood-line line-2"></div>
        <div class="blood-line line-3"></div>
        <div class="blood-line line-4"></div>
        <div class="blood-line line-5"></div>
        <div class="blood-line line-6"></div>
        <div class="blood-line line-7"></div>
        <div class="blood-line line-8"></div>
        <div class="blood-line line-9"></div>
        <div class="blood-line line-10"></div>
        `
    }
    lightboxContent.innerHTML =` 
        ${bloodLinesHTML}
        <div id="sub-box" class="subtitles"></div>
        <div class="lightbox-left">
            <img src="${fullImage}" alt="character portrait">
                ${judgeHTML}
 </div>
    <div class="lightbox-right">
                 ${titleHTML}
        <h2>${charName}</h2>
        <h3>${charGrade}</h3>
        <p>${charBio}</p>
        <a href="" class="close-btn">${home}</a>
    </div>
        `; 
    lightbox.appendChild(lightboxContent)

    const imageDelay = parseInt(image.dataset.imagedelay) || 15

    setTimeout(() => {
        lightboxContent.classList.add('show-image')
    }, imageDelay)

const textSoundFile = image.dataset.textsound
if (textSoundFile) {
    const soundTimer = Math.max(0, textDelay - 400)

    setTimeout(() => {
        const textSfx = new Audio(textSoundFile)
        textSfx.volume = 0.4;
        textSfx.play()
    }, soundTimer)
}

    setTimeout(() => {
        lightboxContent.classList.add('show-text')
    }, textDelay)
const finalColor = image.dataset.finalcolor
const clapSound = image.dataset.clap
const clapDelay = parseInt(image.dataset.clapdelay)
    if (clapSound && clapDelay) {
        setTimeout(() =>{
            const clapSfx = new Audio(clapSound)
            clapSfx.volume = 0.7
            clapSfx.play()
    if (finalColor) {
        lightboxContent.style.backgroundColor = finalColor
    }
        }, clapDelay)
    }

const closeBtn = lightboxContent.querySelector('.close-btn')
closeBtn.addEventListener('click', e => {
    e.preventDefault()
    lightbox.classList.remove('active')
    })
}
//Lightbox//
//Accordion//
const visualBoxes = document.querySelectorAll('#domain-visuals .accordion-item')
const infoBoxes = document.querySelectorAll('#domain-info .accordion-item')
    visualBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
const domainId = box.dataset.domain
            infoBoxes.forEach(infoBox => {
                if(infoBox.dataset.domain === domainId) {
                    infoBox.classList.add('sync-active')
                }
            })
        })
    box.addEventListener('mouseleave', () => {
        infoBoxes.forEach(infoBox => {
            infoBox.classList.remove('sync-active')
        })
    })
})
infoBoxes.forEach(infoBox => {
    infoBox.addEventListener('mouseenter', () => {
const domainId = infoBox.dataset.domain
        visualBoxes.forEach(box => {
            if (box.dataset.domain === domainId) {
                box.classList.add('sync-active')
            }
        })
    })
    infoBox.addEventListener('mouseleave', () => {
        visualBoxes.forEach(box => {
            box.classList.remove('sync-active')
        })
    })
})

//Soundtrack//
const revealBtn = document.getElementById('reveal-btn')
const trackSelection = document.getElementById('tracks')
    revealBtn.addEventListener('click', () => {
        trackSelection.classList.add('revealed')
            setTimeout(() =>  { 
                trackSelection.style.opacity='1'
                trackSelection.scrollIntoView({behavior: 'smooth' })
            }, 50)
            revealBtn.style.opacity = '0'
            revealBtn.style.pointerEvents = 'none'
        })
const closeBtn = document.getElementById('close-tracks')
    closeBtn.addEventListener('click', () => {
        trackSelection.style.opacity = '0'
            setTimeout(() =>  { 
                trackSelection.classList.remove('revealed')
            revealBtn.style.opacity = '1'
            revealBtn.style.pointerEvents = 'auto'
        }, 1000)
    })

    //music player//
const audioPlayer = new Audio()
const playButtons = document.querySelectorAll('.playpause-song')
const allSliders = document.querySelectorAll('.slider-song')

let activeSlider = null
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
const songSrc = this.getAttribute('data-song')
    activeSlider = this.closest('.music-player').querySelector('.slider-song')
            if (audioPlayer.src.includes(songSrc)) {
                if (audioPlayer.paused) {
                audioPlayer.play()
                    this.classList.remove('fa-circle-play')
                    this.classList.add('fa-circle-pause')
            } else { 
                    audioPlayer.pause()
                    this.classList.remove('fa-circle-pause')
                    this.classList.add('fa-circle-play')
                }          
             }
else {
    playButtons.forEach(btn => {
        btn.classList.remove('fa-circle-pause')
        btn.classList.add('fa-circle-play')
    })

    allSliders.forEach(slider => slider.value = 0)
        audioPlayer.src = songSrc
        audioPlayer.play()

        this.classList.remove('fa-circle-play')
        this.classList.add('fa-circle-pause')
            }
        })
    })

 let isDragging = false
 audioPlayer.addEventListener('timeupdate', () => {
           if (activeSlider && !isNaN(audioPlayer.duration)  && !isDragging) {
        activeSlider.max = audioPlayer.duration
        activeSlider.value = audioPlayer.currentTime
    }
})
allSliders.forEach(slider => {
    slider.addEventListener('mousedown', () => {
        isDragging = true
    })
    slider.addEventListener('input', function() {
        if (this === activeSlider) {
            audioPlayer.currentTime = this.value
        }
    })
    slider.addEventListener('mouseup', () => {
        isDragging = false
    })
})
//Soundtrack//