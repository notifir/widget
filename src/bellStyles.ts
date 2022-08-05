import { css } from 'lit'

export const bellStyles = css`
  .bell {
    cursor: pointer;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  .bell-counter {
    position: absolute;
    top: 0%;
    left: 55%;
    font-size: 0.55rem;
    border-radius: 45%;
    height: 0.8rem;
    min-width: 0.7rem;
    padding-left: 1.5px;
    padding-right: 1.5px;
    background-color: red;
    color: #FFFFFF;
    text-align: center;
    line-height: 0.8rem;
  }

  .bell-counter:empty {
    display: none;
  }

  .popup {
    position: absolute;
    z-index: 1000;
  }

  .container {
    width: 400px;
    height: 400px;
    font-size: 1rem;
    position: absolute;
    padding-bottom: 20px;
    border-radius: 1%;
    border: 1px solid rgb(0,0,0,0.1);
    background-color: #F6FAFD;
    font-size: 14px;
    line-height: 17px;
    font-weight: 300;
    font-family: Verdana, geneva, sans-serif;
    right: 0;
    text-align: initial;
    margin-right: -12px;
    margin-top: 5px;
  }

  .close {
    display: none;
  }

  .open {
    display: block;
  }

  .header {
    padding: 17px 17px 13px;
    border-bottom: 1px solid #bbb;
    margin: 0px 10px;
  }

  .header-title {
    color: #444C60;
    font-weight: bold;
  }

  .header-link {
    color: rgb(1, 73, 149);
    float: right;
    cursor: pointer;
  }

  .items-list {
    height: 370px;
    position: absolute;
    overflow-y: scroll;
    width: 100%;
  }

  .items-list .item:not(:first-child):before {
    border-top: 1px solid #bbb;
    content: '';
    display: block;
    position: relative;
  }

  .item {
    padding: 0px 18px 12px 18px;
    position: relative;
    cursor: pointer;
  }

  .item:hover {
    background: #f1f4f6;
  }

  .item-text-primary {
    font-size: 14px;
    line-height: 1.2em;
    color: #444C60;
    vertical-align: top;
    padding: 12px 20px 0px 8px;
    min-height: 20px;
  }

  .item-text-secondary {
    padding: 5px 10px 0px 8px;
    color: #757C85;
    font-size: 13px;
  }

  @keyframes pulsing {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 152, 214, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 7px rgba(0, 152, 214, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 152, 214, 0);
    }
  }

  .item-unread {
    position: absolute;
    right: 20px;
    top: 50%;
    width: 5px;
    height: 5px;
    border: 1px solid #0098D6;
    border-radius: 50%;
    transform: scale(1);
    animation: pulsing 2s infinite;
    background: rgba(0, 152, 214, 1);
  }

  .status {
    padding: 30px 10px 10px 10px;
    text-align: center;
    color: #444C60;
  }

  .error {
    padding: 30px 10px 10px 10px;
    text-align: center;
    color: red;
  }

  .loader-container {
    justify-content: center;
    display: flex;
    padding: 2rem 5%;
  }

  .loader {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #0098D6;
    color: #0098D6;
    box-shadow: 9999px 0 0 -5px #0098D6;
    animation: loading 1.5s infinite linear;
    animation-delay: .25s;
  }

  .loader::before, .loader::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #0098D6;
    color: #0098D6;
  }

  .loader::before {
    box-shadow: 9984px 0 0 -5px #0098D6;
    animation: loadingBefore 1.5s infinite linear;
    animation-delay: 0s;
  }

  .loader::after {
    box-shadow: 10014px 0 0 -5px #0098D6;
    animation: loadingAfter 1.5s infinite linear;
    animation-delay: .5s;
  }

  @keyframes loadingBefore {
    0% {
      box-shadow: 9984px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 9984px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 9984px 0 0 -5px #0098D6;
    }
  }

  @keyframes loading {
    0% {
      box-shadow: 9999px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 9999px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 9999px 0 0 -5px #0098D6;
    }
  }

  @keyframes loadingAfter {
    0% {
      box-shadow: 10014px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 10014px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 10014px 0 0 -5px #0098D6;
    }
  }
`
