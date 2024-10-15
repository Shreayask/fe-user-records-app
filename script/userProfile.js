$(document).ready(function () {
    const userId= localStorage.getItem('userId')
    const params = { id: userId }
    axios.get('https://be-user-record-app.onrender.com/getUser', { params })
      .then(function (response) {
        console.log('res>>', response.data.data)
        const user = response.data.data
        const userRow = `
                          <p class='user-detail-text'>Name: <span class='mx-1'> ${user.name}</span></p>
                          <p class='user-detail-text'>Email: <span class='mx-1'> ${user.email}</span></p>
                          <p class='user-detail-text'>Address: <span class='mx-1'> ${user.address}</span></p>
                          <p class='user-detail-text'>Phone: <span class='mx-1'> ${user.number}</span></p>
                          <p class='user-detail-text'>Gender : <span class='mx-1'>${user.gender}</span></p>
                  `;
        // Append the new row to the table body
        $('.user-detail').append(userRow);
      })
      .catch(error => {
        console.log(error)
      })
  
});