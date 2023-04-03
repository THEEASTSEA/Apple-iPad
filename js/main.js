import navigations from '../data/navigations.js'
import ipads from '../data/ipads.js'

// 드롭다운 메뉴 스크립트(토글) - 장바구니
const basketStarterEL = document.querySelector('header .basket-starter')
const basketEl = basketStarterEL.querySelector('.basket')

basketStarterEL.addEventListener('click', function (event) {
  event.stopPropagation() // window 객체로 이벤트 전파 중지
  if (basketEl.classList.contains('show')) {
    hideBasket()// hide
  } else { // false & true
    showBasket() // block
  }
})
// 장바구니 드롭다운 메뉴 영역 클릭 시 
basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})
// 윈도우 영역 클릭 시
window.addEventListener('click', function () {
  hideBasket()
})
// 복잡한 로직을 함수로 추상화
function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}


// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch) // 콜백 함수
searchCloserEl.addEventListener('click', hideSearch) // 콜백 함수
searchShadowEl.addEventListener('click', hideSearch) // 콜백 함수

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' // li 태그의 수
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * 0.4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')

  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.trasitionDelay = index * .4 / headerMenuEls.length + 's' // li 태그의 수
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.trasitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ""
}



// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) { // 각각의 요소들을 Io 객체의 observe
  io.observe(el)
})


// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})


// JS 데이터 기반 내비게이션 표시
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /* html */ `<li>
    <a href="${map.url}">${map.name}</a>
  </li> `
  })
  mapEl.innerHTML = /* html */ `
    <h3>
    <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  navigationsEl.append(mapEl)
})


// 현재 연도 구하기
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
