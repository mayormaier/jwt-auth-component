import { html, css, LitElement } from 'lit';

export default class JwtAuthComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        color: var(--jwt-auth-component-text-color, #000);
      }

      #hidden {
        visibility: hidden;
        height: 0px;
        width: 0px;
        padding: 0px;
        margin: 0px;
      }
    `;
  }

  static get properties() {
    return {
      authenticated: { type: Boolean },
      authEndpoint: {type: String, Reflect: true}
    };
  }

  constructor() {
    super();
    // if there is a token in local storage, authenticated = true
    if (window.localStorage.getItem('comment-jwt')){
      this.authenticated = true;
      // if there is not authenticated = false
    } else {
      this.authenticated = false
    }
    if (!this.authEndpoint){
      this.authEndpoint = "http://localhost:3000/api/auth/"
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'authenticated' && this[propName]) {
        this.dispatchEvent(new CustomEvent('auth-success', {
          bubbles: true,
          composed: true,
          detail: {
            token: window.localStorage.getItem('comment-jwt'),
          },
        }));
      }
    });
  }

  sendAuthRequest(){
    const authAPIEndpoint = this.authEndpoint;
    const authBody = {
      username: this.shadowRoot.querySelector('#username').value
    };
    fetch(authAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authBody)
    })
    .then(response => response.json())
    .then(data => {
      if (data.accessToken){
        window.localStorage.setItem('comment-jwt', data.accessToken);
        this.authenticated = true;
      }
    })
    .catch(err => {
      console.log("Login error:", err)
    })
  }

  render() {
    if (this.authenticated) {
      return html`
      <span id="hidden"></span>
    `;
    } 
    return html`
    <h2>Please Log In</h2>
    <input type="text" id="username" title="username"></input>
    <button @click=${this.sendAuthRequest}>Log In</button>
    `
  }
}

window.customElements.define('jwt-auth', JwtAuthComponent);