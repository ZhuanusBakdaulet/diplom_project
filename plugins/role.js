export default ({ app, store }, inject) => {
  inject("isProvider", () => {
    let auth = store.$auth.$state;
    return (
      auth.loggedIn &&
      (auth.user.user_type === "P" || auth.user.user_type === "S")
    );
  });
  inject("isAdmin", () => {
    let auth = store.$auth.$state;
    return auth.loggedIn && auth.user.is_superuser;
  });
  inject("isClient", () => {
    let auth = store.$auth.$state;
    if (!auth.loggedIn) return true;
    else if (
      auth.user.user_type == "E" ||
      (auth.user.user_type == "I" &&
        (!auth.user.is_superuser || !auth.user.is_staff))
    )
      return true;
    return false;
  });
  inject("isCallCenter", () => {
    let auth = store.$auth.$state;
    let user = auth.user;
    if (user?.user_type == "M") return true;
    return false;
  });
  inject("isCourier", () => {
    let auth = store.$auth.$state;
    let user = auth.user;
    if (user?.user_type == "C") return true;
    return false;
  });
};
