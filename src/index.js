// Function to fetch user data from GitHub API
async function fetchGitHubUserData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Function to fetch user repositories from GitHub API
async function fetchGitHubUserRepos(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const reposData = await response.json();
    return reposData;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    return null;
  }
}
// location

fetch('https://api.github.com/users/ezzineferdaous')
    .then(response => response.json()) // Parse the response as JSON
    .then(userData => { // Handle the retrieved user data
        const location = userData.location; // Get the location from the user data
        if (location) { // Check if location data is available
            // Fetch country data based on the location
            fetch(`https://restcountries.com/v3.1/name/${location}`)
                .then(response => response.json()) // Parse the response as JSON
                .then(countryData => { // Handle the retrieved country data
                    if (countryData.length > 0 && countryData[0].flags) { // Check if country data and flag are available
                        const flagUrl = countryData[0].flags.png; // Extract the URL of the flag image
                        // Set the src attribute of the flag image element with the flag URL
                        document.getElementById("flagImage").src = flagUrl;
                        document.getElementById("Image").src = flagUrl;
                    }
                })
                .catch(error => console.error('Error fetching country flag:', error)); // Handle errors in fetching country data
        } else {
            console.log('Location not found in the GitHub profile.'); // Log a message if location data is not available
        }
    })
    .catch(error => console.error('Error fetching GitHub profile data:', error)); // Handle errors in 

// fleche_move

let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "block";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Function to update user info in the UI
async function updateUserInfo(username) {
  const defaultUsername = 'ezzineferdaous'; 

  const usernameElement = document.getElementById('username');
  const bioElement = document.getElementById('bio');
  const followerCountElement = document.getElementById('follower-count');
  const followingCountElement = document.getElementById('following-count');
  const repoCountElement = document.getElementById('repo-count');
  const avatar = document.getElementById('avatar');
  const memberYearsElement = document.getElementById('member-years');

  const userData = await fetchGitHubUserData(username); // Use the provided username
  const reposData = await fetchGitHubUserRepos(username); // Use the provided username

  if (userData) {
      usernameElement.textContent = userData.name || 'Full Name not provided';
      bioElement.textContent = userData.bio || 'Bio not provided'; // Update bio content
      followerCountElement.textContent = ` ${userData.followers}`;
      followingCountElement.textContent = ` ${userData.following}`;
      repoCountElement.textContent = ` ${userData.public_repos}`;
      avatar.src = userData.avatar_url;
      // Other code remains the same...
        // memeber_years
      const accountCreationDate = moment(userData.created_at);
      const currentDate = moment();
      const memberYears = currentDate.diff(accountCreationDate, 'years');
      memberYearsElement.textContent =  `Members for 2 ${memberYears} years` ; 
      console.log(moment());

  }


   
}


// Fetch GitHub user data
async function fetchGitHubUserData(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      return userData;
  } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
  }
}

// Fetch user repositories from GitHub
async function fetchGitHubUserRepos(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await response.json();
      return reposData;
  } catch (error) {
      console.error('Error fetching user repositories:', error);
      return null;
  }
}

// Update user info with default username
updateUserInfo('ezzineferdaous');

  // Display user repos if available
displayUserRepos(reposData);


// fetch data users

function displayUserRepos(reposData) {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';

  if (reposData) {
      reposData.forEach((repo, index) => {
          const repoCard = document.createElement('div');
          repoCard.className = 'card p-1 bg-white relative';
          repoCard.innerHTML = 
              `<div class="flex">
                  <span id="repo-name" class="text-sm font-semibold">${repo.name}</span>
                  <h6  class="h6 rounded-md absolute right-0 mr-2">&nbsp; ${repo.private ? 'Private' : 'Public'}&nbsp;</h6>
              </div>
              <p id="repo-description" class="text-black">${repo.description || 'No description available'}</p>
              <p id="repo-language" class="text-gray-500" style="position: absolute; bottom: 0;">
                  <span class="bg-yellow-400 border-spacing-80 circ"></span>${repo.language || 'No language specified'}
              </p>`
          ;
          cardsContainer.appendChild(repoCard);
      });
  }
}


// Event listener for search input
const searchInput = document.querySelector("[data-search]");
searchInput.addEventListener("input", async (e) => {
  const username = e.target.value.trim();
  if (username !== '') {
    await updateUserInfo(username);
  } else {
    await updateUserInfo('ezzineferdaous'); 
  }
});

// Initialize user info with default username
updateUserInfo('ezzineferdaous');
