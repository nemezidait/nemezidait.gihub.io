"use strict";

function showModal(modalId){
    const modal = document.getElementById(modalId); 
    
    const contentWrapper = modal.querySelector('.content-wrapper');
    const close = modal.querySelector('.close');

    close.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', () => modal.classList.remove('open'));
    contentWrapper.addEventListener('click', (e) => e.stopPropagation());
    
    modal.classList.toggle('open');
}
