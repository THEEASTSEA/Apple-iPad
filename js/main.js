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
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation()
  hideSearch()
}) // 이벤트 버블링 방지
searchShadowEl.addEventListener('click', hideSearch) // 콜백 함수

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  stopScroll()
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

function playScroll() {
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}


// 헤더 모바일 모드 메뉴 토글! 
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = "" // 모바일 모드에서 텍스트 입력 후 헤더 메뉴 종료 시 입력한 텍스트 초기화
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색~
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile')
})

// 화면의 크기가 바뀔 때 콜백 함수 실행(가로 너비가 740보다 작으면 해당 클래스 제거)
window.addEventListener('resize', function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// 모바일 모드 네비게이션 메뉴 토글
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu()
  } else {
    showNavMenu()
  }
})

navEl.addEventListener('click', function (event) { // 네비게이션을 클릭했을 때는 메뉴가 종료되지 않도록 이벤트 버블링 방지
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
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
      <span class="icon">+</span>
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


const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function () {
    el.classList.toggle('active')
  })
})