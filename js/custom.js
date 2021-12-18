"use strict";

function showModal(modalId){
    const modal = document.getElementById(modalId); 
    
    const contentWrapper = modal.querySelector('.content-wrapper');
    
    modal.addEventListener('click', () => modal.classList.remove('open'));
    contentWrapper.addEventListener('click', (e) => e.stopPropagation());
    
    modal.classList.toggle('open');
}

function hideModal(modalId){
    const modal = document.getElementById(modalId); 
    modal.classList.remove('open');
}
