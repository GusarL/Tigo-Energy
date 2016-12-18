'use strict';

(function () {
    var elemInputs,
        submit,
        gender,
        email,
        check,
        form;
   

	form = document.forms[0];
    elemInputs = form.elements;
    submit = form.querySelector('input[type="submit"]');
    email = elemInputs.email;
    gender = elemInputs.gender;
    check = false;

    function checkFill (inputValue, input){
        if(!inputValue){
            input.classList.add('error');
        } else {
        	input.classList.remove('error');
            
            return check= true;
        }   
    };

    function checkFillReg (inputValue, input, re){
        if(!inputValue){
            input.classList.add('error');
        }else if(!re.test(inputValue)){
            input.classList.add('error');
        }else {
            input.classList.remove('error');

            return check= true;
        };
    };
    
    [].forEach.call(elemInputs, function(field, i) {
        if (field !== email && field !== gender && field !== submit) {
			field.onblur = function(){
			    checkFill(this.value, this);
			};
        } else if (field === email) {
            field.onblur = function(){
			    checkFillReg(this.value, this, /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i);
			};
        }
    });

    form.onsubmit = function(){
        event.preventDefault();

        if(check){
            form.submit();
        }    	
    }
})();