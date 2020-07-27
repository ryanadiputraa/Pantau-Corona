class ResponsiveHeader extends HTMLElement {
  
  constructor() {
    super();
    this.shadowDom = this.attachShadow({mode:"open"})
  }

  connectedCallback() {
    this.title = this.getAttribute('title') || null;
    this.links = this.getAttribute('links').split(',') || null;
    this.href = this.getAttribute('href').split(',') || null;

    this.render();   
  }

  render() {
    this.shadowDom.innerHTML = `
    <style>

      header {
        transition: .5s;
        display: flex;
        background-color: #222;
        color: #fff;
        border-bottom: 2px solid #de3131;
        height: 54px;
        justify-content: space-between;
        align-items: center;
        padding: 0 6%;
        position: sticky;
        top: 0;
        z-index: 999;
      }  

      h1 {
        display: flex;
        align-items: center;
        margin: 0;
      }

      h1 a{
        font-size: 22px;
        color: #fff;
        text-decoration: none;
      }

      nav {
        margin: 0;
      }
      
      nav ul {
        display: flex;
        justify-content: space-between;
      }
      
      nav a {
        transition: .5s;
        text-decoration: none;
        font-weight: 700;
        color: #fff;  
        padding: 5px 12px;
      }
      
      a:hover {
        transition: .5s;
        color: #318ede;
      }

      .hamburger {
        height: 28px;
        width: 50px;
        position: relative;
        top: -5px;
        display: none;
        padding: 6px;
        border-radius: 20px;
      }
      
      .ham {
        background-color: #fff;
        height: 4px;
        width: 100%;
        border-radius: 30px;
        transition: .2s;
      }
      .ham:nth-child(2) {
        transition: .2s;
        animation: fadeIn .2s ease forwards;
      }

      @media screen and (max-width: 768px) {
        header {
          overflow: hidden;
          position: fixed;
          box-sizing: border-box;
          padding: 6px 5%;
          height: 54px;
          z-index: 999;
          width: 100%;
          top: 0;
          flex-wrap: wrap;
        }
      
        .title {
          width: 60%;
        }
      
        nav {
          flex-basis: 100%;
          margin-top: 10px;
        }
      
        .hamburger {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      
        .active-navbar {
          transition: .6s;
          height: auto;
        }
        
        .active-ham:nth-child(1) {
          transition: .2s;
          transform: rotate(37deg);
          position: relative;
          top: 12px;
        }  
        .active-ham:nth-child(3) {
          transition: .2s;
          transform: rotate(-37deg);
          position: relative;
          top: -12px;
        }  
        .active-ham:nth-child(2) {
          transition: .2s;
          animation: fadeOut .2s ease forwards;
        }
      
        ul {
          flex-direction: column;
          padding: 0;
        }
      
        ul li {
          margin: 0 auto;
          width: 80%;
          text-align: center;
          padding: 5px;
        }
      
        ul li a {
          display: inline-block;
          border-right: none;
          border-radius: 20px;
          width: 100%;
        }
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        } 50% {
          opacity: .5;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        } 50% {
          opacity: .5;
        }
        100% {
          opacity: 1;
        }
      }
    </style>
    
    <header>
      <div class="title">
        <h1><a href="${this.href[0]}">${this.title}</a></h1>
      </div>
      <div class="hamburger">
        <div class="ham"></div>
        <div class="ham"></div>
        <div class="ham"></div>
      </div>
      <nav>
        <ul type="none">
          <li><a href="${this.href[1]}">${this.links[0]}</a></li>
        </ul>
      </nav>
    </header>
    `;
    
    this.shadowDom.querySelector('.hamburger').addEventListener('click', () => {
      this.shadowDom.querySelector('header').classList.toggle('active-navbar');
      this.shadowDom.querySelectorAll('.ham').forEach(ham => ham.classList.toggle('active-ham'));
    });
  }
}

customElements.define("responsive-header", ResponsiveHeader);