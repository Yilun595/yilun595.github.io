---
layout: archive
title: "Life"
permalink: /life/
author_profile: true
---

<style>
.album-container {
    position: relative;
    max-width: 500px; 
    margin: 20px 0;  
    padding: 0;  
    overflow: hidden;
}

.album-carousel {
    display: flex;
    position: relative;
    transition: transform 0.5s ease-in-out;
    height: 300px;
}

.album-slide {
    min-width: 100%;
    display: none;
    justify-content: flex-start; 
    align-items: center;
}

.album-slide.active {
    display: flex;
}

.album-slide img {
    height: 300px;
    width: 496px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 2;
    transition: background-color 0.3s;
}

.scroll-btn:hover {
    background: rgba(255, 255, 255, 0.9);
}

.scroll-btn.left {
    left: 10px; 
}

.scroll-btn.right {
    right: 10px; 
}

.dots-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .album-container {
        max-width: 100%;
    }
    
    .album-slide img {
        width: 100%;
        height: 300px;
    }
    
    .album-carousel {
        height: 300px;
    }
}
</style>

## I'm on my way to see the sunset

<div class="album-container">
    <button class="scroll-btn left" id="prevBtn">←</button>
    <div class="album-carousel" id="imageCarousel">
        <div class="album-slide active">
            <img src="/images/Life/20231112.jpg" alt="Po Pin Chau"/>
        </div>
        <div class="album-slide">
            <img src="/images/Life/20231021.jpg" alt="Lantau"/>
        </div>
        <div class="album-slide">
            <img src="/images/Life/HighWest.jpg" alt="HighWest"/>
        </div>
        <div class="album-slide">
            <img src="/images/Life/YuKwai.jpg" alt="YuKwai"/>
        </div>
    </div>
    <button class="scroll-btn right" id="nextBtn">→</button>
    <div class="dots-container" id="dotsContainer"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Backup initialization in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeCarousel();
}

function initializeCarousel() {
    const slides = document.getElementsByClassName('album-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentIndex = 0;

    // Clear existing dots before creating new ones
    dotsContainer.innerHTML = '';

    // Create dots
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
    }

    function showSlide(index) {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dotsContainer.children[i].classList.remove('active');
        }
        
        // Show selected slide
        slides[index].classList.add('active');
        dotsContainer.children[index].classList.add('active');
        
        // Update button visibility
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === slides.length - 1 ? 'none' : 'flex';
    }

    // Event listeners
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        }
    });

    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            currentIndex = parseInt(e.target.getAttribute('data-index'));
            showSlide(currentIndex);
        }
    });

    // Initial setup
    showSlide(currentIndex);
}
</script>

## I run

<div class="album-container">
    <button class="scroll-btn left" id="prevBtn">←</button>
    <div class="album-carousel" id="imageCarousel">
        <div class="album-slide active">
            <img src="/images/Life/20250209.jpg" alt="Marathon"/>
        </div>
    </div>
    <button class="scroll-btn right" id="nextBtn">→</button>
    <div class="dots-container" id="dotsContainer"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Backup initialization in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeCarousel();
}

function initializeCarousel() {
    const slides = document.getElementsByClassName('album-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentIndex = 0;

    // Clear existing dots before creating new ones
    dotsContainer.innerHTML = '';

    // Create dots
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
    }

    function showSlide(index) {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dotsContainer.children[i].classList.remove('active');
        }
        
        // Show selected slide
        slides[index].classList.add('active');
        dotsContainer.children[index].classList.add('active');
        
        // Update button visibility
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === slides.length - 1 ? 'none' : 'flex';
    }

    // Event listeners
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        }
    });

    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            currentIndex = parseInt(e.target.getAttribute('data-index'));
            showSlide(currentIndex);
        }
    });

    // Initial setup
    showSlide(currentIndex);
}
</script>


## My plant specimen

<div class="album-container">
    <button class="scroll-btn left" id="prevBtn">←</button>
    <div class="album-carousel" id="imageCarousel">
        <div class="album-slide active">
            <img src="/images/Life/Specimen.jpg" alt="specimen"/>
        </div>
    </div>
    <button class="scroll-btn right" id="nextBtn">→</button>
    <div class="dots-container" id="dotsContainer"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Backup initialization in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeCarousel();
}

function initializeCarousel() {
    const slides = document.getElementsByClassName('album-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentIndex = 0;

    // Clear existing dots before creating new ones
    dotsContainer.innerHTML = '';

    // Create dots
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dotsContainer.appendChild(dot);
    }

    function showSlide(index) {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dotsContainer.children[i].classList.remove('active');
        }
        
        // Show selected slide
        slides[index].classList.add('active');
        dotsContainer.children[index].classList.add('active');
        
        // Update button visibility
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === slides.length - 1 ? 'none' : 'flex';
    }

    // Event listeners
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        }
    });

    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            currentIndex = parseInt(e.target.getAttribute('data-index'));
            showSlide(currentIndex);
        }
    });

    // Initial setup
    showSlide(currentIndex);
}
</script>



## I play a little guitar on the side

<iframe 
    src="//player.bilibili.com/player.html?aid=594319669&bvid=BV1Cq4y1x7bz&cid=516951734&p=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    style="width: 496px; height: 279px;">
</iframe>