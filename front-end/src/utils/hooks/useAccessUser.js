import React from "react";
import Cookies from "js-cookie";

const handleLogIn = async (user) => {
  var inThirtySeconds = new Date(new Date().getTime() + 3000 * 1000);
  await Cookies.set("user", JSON.stringify(user), {
    expires: inThirtySeconds,
  });
  window.location.href = "/";
};

const handleLogOut = async () => {
  if (Cookies.get("user")) {
    await Cookies.remove("user");
    window.location.href = "/";
  }
};

const isLogined = Cookies.get("user");

const loginedUser = isLogined && JSON.parse(Cookies.get("user"));

export { handleLogIn, handleLogOut, isLogined, loginedUser };
