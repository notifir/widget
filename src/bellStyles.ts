import { css } from 'lit'

export const bellStyles = css`
  .bell {
    cursor: pointer;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  .bell svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .bell-counter { 
    position: absolute;
    top: 0%;
    left: 60%;
    font-size: 0.55rem;
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    color: #FFFFFF;
    text-align: center;
    line-height: 0.8rem;
  }

  .bell-counter:empty {
    display: none;
  }
  
  .popup {
    position: fixed;
    z-index: 1000;
  }

  .container {
    width: 400px;
    height: 400px;
    font-size: 1rem;
    position: absolute;     
    padding: 10px;
    border-radius: 1%;
    border: 1px solid rgb(0,0,0,0.1);        
    background-color: #F6FAFD;
    font-size: 14px;
    line-height: 17px;
    font-weight: 300;
    font-family: Verdana, geneva, sans-serif;
    right: 0;
    margin-right: -10px;
  }

  .close { 
    display: none; 
  }

  .open { 
    display: block; 
  }

  .header {
    color: #444C60;
    font-weight: bold;
    padding: 7px 17px 13px;
    border-bottom: 1px solid #bbb;
  }
 
  .items-list {
    height: 370px;
    position: absolute;
    overflow-y: scroll;
  }

  .item {
    padding: 0px 18px 12px 8px;
    position: relative;
  }

  .item-text-primary {
    font-size: 14px;
    line-height: 1.2em;
    color: #444C60;
    vertical-align: top;
    padding: 12px 20px 0px 8px;
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
  
  .divider {
    border-top: 1px solid #bbb;
  }`
