$(document).ready(function () {
    const userId= localStorage.getItem('userId')
    const params = { id: userId }
    axios.get('http://localhost:3000/getUser', { params })
      .then(function (response) {
        console.log('res>>', response.data.data)
        const user = response.data.data
        const userRow = `
                          <p class='user-detail-text'>Name:  ${user.name}</p>
                          <p class='user-detail-text'>Email:  ${user.email}</p>
                          <p class='user-detail-text'>Address:  ${user.address}</p>
                          <p class='user-detail-text'>Phone:  ${user.number}</p>
                          <p class='user-detail-text'>Gender :${user.gender}</p>
                  `;
        // Append the new row to the table body
        $('.user-detail').append(userRow);
      })
      .catch(error => {
        console.log(error)
      })
  
});