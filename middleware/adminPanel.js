export default function({ store, redirect }) {
  if (
    !store.state.auth.user ||
    (!store.state.auth.user.loggedIn &&
      !(store.state.auth.user.is_superuser || store.state.auth.user.is_staff))
  ) {
    return redirect("/");
  }
}
