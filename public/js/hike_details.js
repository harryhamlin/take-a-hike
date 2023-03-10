// set up public folder. 
// set up sessions and target the textbox in the comments. id specific. api requests, post request.


// Desmonds code. attaching comment to page with on click submit button.
async function newFormHandler(event) {
    event.preventDefault();
    let targetEl=document.querySelector('#commentData');
    const content = targetEl.value;
    let hike_id = targetEl.dataset.hikeid;
    
    // const hike_id = document.querySelector('#commentData').value;
    // Send fetch request to add a new comment
    const response = await fetch(`/api/comment/${hike_id}`, {
      method: 'POST',
      body: JSON.stringify({
      content,
      
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the comment is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace(`/hike/${hike_id}`);
    } else {
      
      alert('Failed to add comment');
    }
  }
  
  document.querySelector('#commentForm').addEventListener('submit', newFormHandler);

//  rating code we are no longer using.
// async function newRatingHandler(event) {
//     event.preventDefault();
//     let targetEl=document.querySelector('#ratingButton');
//     let selectOption= document.querySelector('#selectBox');
//     const rating = selectOption.value;
//     let hike_id = targetEl.dataset.hikeid;
    
    // console.log(rating);S
    // console.log(hike_id);
    
    // const hike_id = document.querySelector('#commentData').value;
    // Send fetch request to add a new rating
  //   const response = await fetch(`/api/hike/${hike_id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //     rating,
      
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
   
  //   if (response.ok) {
  //     document.location.replace(`/api/hike/${hike_id}`);
  //   } else {
  //     alert('Failed to add comment');
  //   }
  // }
  
  // document.querySelector('#ratingButton').addEventListener('click', newRatingHandler);


  async function deleteComment(event) {
    event.preventDefault();
    let comment_id = document.querySelector('#deleteButton').dataset.commentid; 
    
    // const hike_id = document.querySelector('#deleteButton').dataset.hikeid;
    const hike_id = document.location.href.split("/")


    // Send fetch request to add a new comment
    const response = await fetch(`/api/comment/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    //if the comment is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace(`/hike/${hike_id[4]}`);
      console.log(hike_id)
    } else {
      alert('Failed to delete comment');
    }
  }
  console.log(document.querySelector('#deleteButton'))
  document.querySelector('#deleteButton').addEventListener('submit', deleteComment);

  // to delete chosen comment. Make it so it brings you to specific comment page/view and have delete button there and delete that comment.
    
    