function makeFriendsList(friends) {
  let friendsNames = friends.map(names => `<li>${names.firstName + ' ' + names.lastName}</li>`).join('\n');
  let friendList = document.createElement('ul');
  friendList.innerHTML = friendsNames;
  return friendList;
 
}
