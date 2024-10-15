$(document).ready(function () {


    $('.signup-button').on('click', function () {
        // Get values from input fields
        const name = $('#name').val();
        const email = $('#email').val();
        const number = $('#phonenumber').val();
        const address = $('#address').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const gender = $('input[name="gender"]:checked').val();

        //validation for user form
        if (!name || !email || !number || !address || !username || !password || !gender) {
           $('#error-msg').text('All fields are required.')
            return; 
        }

        if (password.length < 8) {
            $('#error-msg').text('Password must be at least 8 characters long.')
            return; 
        }
        const userData = {
            name,
            number,
            email,
            address,
            username,
            password,
            gender
        };


        // Making the API request using axios
        axios.post('https://be-user-record-app.onrender.com/signup', userData)
            .then(function (response) {
                console.log('Success:', response.data, $('#signupSuccessModal'));
                $('#error-msg').text('')

                const modal = $('#signupSuccessModal');

                // Set modal attributes and display popup
                modal.addClass('modal fade show');
                modal.css('display', 'block');
                modal.attr('aria-modal', 'true');
            })
            .catch(function (error) {
                $('#error-msg').text(error.response.data.message)
                console.error('Error:', error);
                
            });
    });

    $('#login-button').click(function () {
        window.location.href = './login.html'
    })
   
    //close modal
    $('#close-modal').click(function () {
        const modal = $('#signupSuccessModal');

        // Set modal attributes
        modal.addClass('modal fade ');
        modal.css('display', 'none');
        modal.removeAttr('aria-modal');
    })
}


);