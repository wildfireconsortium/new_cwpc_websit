let generateHeader = (headerContainerElementId) => {
  let headerContainer = document.getElementById(headerContainerElementId);
  let markup = `
  <header>
    <div id="header-nav">
      <button id="hamburger" aria-expanded="false" onclick="toggleHamburger()" title="main menu">
          <i class="fa-solid fa-bars" aria-hidden="true"></i>
      </button>
      <div class="images-column">
        <a href="/">  <img src="assets/images/new_logo/newlogo1.svg" alt="arise" class="centered-image"> </a>
      </div>
        <nav class="global-navbar">
          <div class="header-content1" style="text-align: center;">>
            <ul>
            <li><a href="/" id="home">Home</a></li>
            <li><a href="/assets/content/showcase_flyer_2024_long_v6.pdf" target="_blank" id="Flyer">Showcase</a></li>
            <li><a href="/about_us" id="about">About</a></li>
            <li><a href="/getinvolved" id="involved">Get involved</a></li>
            <li><a href="/subscribe" id="subscribe">Subscribe</a></li>
          </div>
      </div>
          <li style="display:none;">
            <div class="search-box">
              <input type="text" placeholder="Search">
              <button type="button">Search</button>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    </header>
  `;
  headerContainer.innerHTML = markup;
};
