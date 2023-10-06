/*!
 * Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        console.log(123);
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
  const userInfo = document.getElementById("user-info");
  const editButton = document.getElementById("edit-button");
  const editForm = document.getElementById("edit-form");

  editButton.addEventListener("click", () => {
    if (userInfo.style.display === "none") {
      // Switch to view mode
      userInfo.style.display = "block";
      editForm.style.display = "none";
      editButton.innerText = "Edit";
    } else {
      // Switch to edit mode
      userInfo.style.display = "none";
      editForm.style.display = "block";
      editButton.innerText = "Cancel Edit";
    }
  });
});
