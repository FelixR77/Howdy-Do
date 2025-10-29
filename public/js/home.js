const signupButton = document.querySelector('.sign-up-button')

signupButton.addEventListener('click', () => {
    window.location.href = '/signup';
});
// before learning about window.location.href, I used (res.render). I have now
// learned that res.render is a 'server side' function. while 
// window.location.href is a 'client side function. 
// the code that was running in server.js is running throug node .ejs

// I had to make a new directory and a new home.js file to run clien side code
