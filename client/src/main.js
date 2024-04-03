const leaderboardButton3 = document.getElementById('leaderboard_button_3');
const leaderboardButton4 = document.getElementById('leaderboard_button_4');
const leaderboardButton5 = document.getElementById('leaderboard_button_5');
const leaderboardButton6 = document.getElementById('leaderboard_button_6');

const highscores_3 = document.getElementById('highscores_3');
const highscores_4 = document.getElementById('highscores_4');
const highscores_5 = document.getElementById('highscores_5');
const highscores_6 = document.getElementById('highscores_6');

leaderboardButton3.addEventListener('click', () => {
  leaderboardButton3.classList.add('active');
  leaderboardButton4.classList.remove('active');
  leaderboardButton5.classList.remove('active');
  leaderboardButton6.classList.remove('active');

  highscores_3.classList.add('active');
  highscores_4.classList.remove('active');
  highscores_5.classList.remove('active');
  highscores_6.classList.remove('active');
});

leaderboardButton4.addEventListener('click', () => {
  leaderboardButton3.classList.remove('active');
  leaderboardButton4.classList.add('active');
  leaderboardButton5.classList.remove('active');
  leaderboardButton6.classList.remove('active');

  highscores_3.classList.remove('active');
  highscores_4.classList.add('active');
  highscores_5.classList.remove('active');
  highscores_6.classList.remove('active');
});

leaderboardButton5.addEventListener('click', () => {
  leaderboardButton3.classList.remove('active');
  leaderboardButton4.classList.remove('active');
  leaderboardButton5.classList.add('active');
  leaderboardButton6.classList.remove('active');

  highscores_3.classList.remove('active');
  highscores_4.classList.remove('active');
  highscores_5.classList.add('active');
  highscores_6.classList.remove('active');
});

leaderboardButton6.addEventListener('click', () => {
  leaderboardButton3.classList.remove('active');
  leaderboardButton4.classList.remove('active');
  leaderboardButton5.classList.remove('active');
  leaderboardButton6.classList.add('active');

  highscores_3.classList.remove('active');
  highscores_4.classList.remove('active');
  highscores_5.classList.remove('active');
  highscores_6.classList.add('active');
});
